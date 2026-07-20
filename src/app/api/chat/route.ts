import { NextResponse } from "next/server";
import { generateChatResponse, type ChatMessage } from "@/lib/chat-agent";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Get API key from environment (optional)
    const apiKey = process.env.ANTHROPIC_API_KEY;

    // Generate response (will use fallback if no API key)
    const response = await generateChatResponse(messages, apiKey);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
