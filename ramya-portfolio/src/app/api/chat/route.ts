import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { generateEmbedding } from '../../../lib/embeddings';
import { queryStore } from '../../../lib/vectorStore';

// Node.js runtime required to handle local file system fallback

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;
    
    // Parse and sanitize messages for streamText
    const sanitizedMessages = messages.map((m: any) => {
      let textContent = '';
      if (typeof m.content === 'string') {
        textContent = m.content;
      } else if (typeof m.text === 'string') {
        textContent = m.text;
      } else if (Array.isArray(m.content)) {
        // Just in case content is already an array of parts
        textContent = m.content.map((p: any) => p.text || '').join('');
      } else if (Array.isArray(m.parts)) {
        textContent = m.parts.map((p: any) => p.text || '').join('');
      }

      return {
        role: m.role === 'user' || m.role === 'assistant' || m.role === 'system' ? m.role : 'user',
        content: textContent,
      };
    });

    // 1. Extract last user message
    const lastMessage = sanitizedMessages[sanitizedMessages.length - 1];
    if (lastMessage.role !== 'user') {
      return new Response('Last message must be from user', { status: 400 });
    }

    // 2. Embed it
    let embedding: number[] = [];
    try {
      embedding = await generateEmbedding(lastMessage.content);
    } catch (err: any) {
      console.warn('Embedding generation failed, possibly missing API keys:', err.message);
      // fallback empty embedding just to let it pass through if keys are broken locally
      embedding = new Array(1536).fill(0);
    }
    
    // 3. Query vector store -> top 5 chunks
    let chunks: { text: string }[] = [];
    try {
      chunks = await queryStore(embedding, 5);
    } catch (err: any) {
      console.warn('Vector store query failed:', err.message);
    }
    
    const contextText = chunks.length > 0 
      ? chunks.map((c) => c.text).join('\n\n') 
      : 'No relevant context found in vector store.';

    // 4. Build system prompt
    const systemPrompt = `You are a helpful AI assistant. Answer ONLY using the context provided. If the answer is not in the context, say you don't have that information.
    
Context:
${contextText}`;

    // 5. Stream response using Vercel AI SDK
    const result = streamText({
      model: openai(process.env.CHAT_MODEL || 'gpt-4o'),
      system: systemPrompt,
      messages: sanitizedMessages,
    });

    return result.toTextStreamResponse();
  } catch (err: any) {
    console.error('Chat API Error:', err.message, err.stack);
    return new Response(JSON.stringify({ error: err.message, stack: err.stack }), { status: 500 });
  }
}
