import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
const pdfParse = require('pdf-parse');
import { generateEmbedding } from '../src/lib/embeddings';
import { upsertChunks } from '../src/lib/vectorStore';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env') });
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const DATA_DIR = path.join(process.cwd(), 'data');
const DOCS_DIR = path.join(DATA_DIR, 'documents');
const CHUNK_SIZE = parseInt(process.env.CHUNK_SIZE || '500');
const CHUNK_OVERLAP = parseInt(process.env.CHUNK_OVERLAP || '50');

// Simple chunker: approximate tokens as 4 characters each
function chunkText(text: string, size: number, overlap: number): string[] {
  const charSize = size * 4;
  const charOverlap = overlap * 4;
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + charSize));
    i += charSize - charOverlap;
  }
  return chunks;
}

async function processFile(filePath: string, filename: string) {
  const ext = path.extname(filename).toLowerCase();
  let text = '';

  if (ext === '.pdf') {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    text = data.text;
  } else if (ext === '.txt' || ext === '.md') {
    text = fs.readFileSync(filePath, 'utf-8');
  } else {
    console.warn(`Skipping unsupported file type: ${filename}`);
    return 0;
  }

  // Clean empty spaces
  text = text.replace(/\s+/g, ' ').trim();
  if (!text) return 0;

  const chunks = chunkText(text, CHUNK_SIZE, CHUNK_OVERLAP);
  
  for (let i = 0; i < chunks.length; i++) {
    const chunkText = chunks[i];
    console.log(`Generating embedding for ${filename} chunk ${i + 1}/${chunks.length}...`);
    
    // Check if openAI key exists to avoid throws locally if unset during tests
    if(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-REPLACE_WITH_YOUR_KEY') {
        const embedding = await generateEmbedding(chunkText);
        
        await upsertChunks([{
        id: `${filename}-${i}`,
        source: filename,
        chunkIndex: i,
        text: chunkText,
        embedding
        }]);
    } else {
        console.warn('OPENAI_API_KEY missing or invalid - skipping embedding generation for chunk.');
    }
  }

  return chunks.length;
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function main() {
  console.log('Starting ingestion process...');
  
  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
    console.log(`Created documents directory at ${DOCS_DIR}`);
    console.log('Please add some .txt, .md, or .pdf files and run again.');
    return;
  }

  const allFiles = getAllFiles(DOCS_DIR);
  let totalChunks = 0;
  let processedFiles = 0;

  for (const filePath of allFiles) {
    const filename = path.basename(filePath);

    console.log(`Processing ${filename}...`);
    try {
      const chunksIngested = await processFile(filePath, filename);
      if (chunksIngested > 0) {
        totalChunks += chunksIngested;
        processedFiles++;
      }
    } catch (err: any) {
      console.error(`Error processing ${filename}:`, err.message);
    }
  }

  console.log(`Ingested ${totalChunks} chunks from ${processedFiles} files.`);
}

main().catch((err) => {
  console.error('Fatal error during ingestion:', err);
  process.exit(1);
});
