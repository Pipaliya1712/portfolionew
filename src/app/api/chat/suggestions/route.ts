import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ suggestions: [] });
    }

    const lastBotMessage = messages[messages.length - 1]?.content || "";
    
    // If the bot declined the question due to being out-of-scope or cracked the QA tester joke,
    // fall back to default context-relevant questions instead of continuing the irrelevant topic.
    if (
        lastBotMessage.includes("This is not relevant to Parth") || 
        lastBotMessage.includes("specifically designed to answer questions about Parth") ||
        lastBotMessage.includes("QA tester")
    ) {
        return NextResponse.json({ 
            suggestions: [
                "Show AI projects", 
                "What's his tech stack?", 
                "Book a consultation"
            ] 
        });
    }

    const systemPrompt = `You are an AI assistant generating follow-up questions for a portfolio chatbot.
Based on the conversation history, generate 3 short, punchy follow-up questions the user might ask next.
Keep each question under 6 words.
CRITICAL RULES:
- Focus ONLY on Parth's professional experience, skills, and specific projects (e.g., ResumeAI, ADTS, etc.).
- NEVER generate general tech or AI questions (e.g., "Explain LLM", "What are AI frameworks?", "How does RAG work?").
- If the conversation steers towards general theory, bring the suggestions back to Parth's portfolio.
Respond ONLY with a valid JSON object containing a "suggestions" key mapping to an array of strings.
Example: {"suggestions": ["Tell me about RAG projects", "Show me your Github", "How to contact?"]}`;

    const chatCompletion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.slice(-5) // Send only the last 5 messages for context
      ],
      response_format: { type: "json_object" },
      max_tokens: 150,
      temperature: 0.6,
    });

    const responseText = chatCompletion.choices[0]?.message?.content || '{"suggestions": []}';
    const json = JSON.parse(responseText);

    return NextResponse.json(json);
  } catch (err) {
    console.error('[POST /api/chat/suggestions]', err);
    return NextResponse.json(
        { suggestions: ["Show AI projects", "What's his tech stack?", "Book a consultation"] },
        { status: 500 }
    );
  }
}
