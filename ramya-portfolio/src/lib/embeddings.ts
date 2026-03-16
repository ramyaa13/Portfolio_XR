import OpenAI from 'openai';

let openai: OpenAI | null = null;

export async function generateEmbedding(text: string): Promise<number[]> {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  const model = process.env.EMBEDDINGS_MODEL || 'text-embedding-3-small';
  
  const response = await openai.embeddings.create({
    model,
    input: text.replace(/\n/g, ' '),
  });

  return response.data[0].embedding;
}
