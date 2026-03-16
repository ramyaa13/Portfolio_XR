import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

// We only initialize the client if the URL and KEY are provided
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export interface VectorDocument {
  id: string;
  source: string;
  chunkIndex: number;
  text: string;
  embedding?: number[];
}

function getLocalStorePath() {
  return path.join(process.cwd(), 'data', 'embeddings', 'store.json');
}

function readLocalStore(): VectorDocument[] {
  const file = getLocalStorePath();
  if (fs.existsSync(file)) {
    try {
      return JSON.parse(fs.readFileSync(file, 'utf-8'));
    } catch {
      return [];
    }
  }
  return [];
}

function writeLocalStore(data: VectorDocument[]) {
  const file = getLocalStorePath();
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export async function upsertChunks(chunks: (VectorDocument & { embedding: number[] })[]) {
  if (supabase) {
    const { error } = await supabase.from('documents').upsert(chunks);
    if (error) throw new Error(`Failed to upsert chunks: ${error.message}`);
    return;
  }

  // Fallback to local store
  console.log('Using local JSON store for embeddings since Supabase is not configured.');
  const store = readLocalStore();
  
  // Upsert logic for local store
  for (const chunk of chunks) {
    const existingIndex = store.findIndex(d => d.id === chunk.id);
    if (existingIndex >= 0) {
      store[existingIndex] = chunk;
    } else {
      store.push(chunk);
    }
  }
  
  writeLocalStore(store);
}

// Simple cosine similarity for local search
function cosineSimilarity(a: number[], b: number[]) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function queryStore(embedding: number[], limit: number = 5): Promise<VectorDocument[]> {
  if (supabase) {
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: limit,
    });
    if (error) throw new Error(`Failed to query vector store: ${error.message}`);
    return data || [];
  }

  // Fallback to local store
  const store = readLocalStore();
  
  // Calculate similarities
  const scoredData = store
    .filter(d => d.embedding && d.embedding.length > 0)
    .map(d => ({
      ...d,
      similarity: cosineSimilarity(embedding, d.embedding!)
    }));

  // Sort and return top results
  scoredData.sort((a, b) => b.similarity - a.similarity);
  return scoredData.slice(0, limit);
}
