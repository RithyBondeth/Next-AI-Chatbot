import { convertToModelMessages, streamText, UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    // const result = streamText({
    //   model: openai("gpt-4.1-nano-2025-04-14"),
    //   messages: convertToModelMessages(messages),
    // });

    const result = streamText({
      model: openai("gpt-4.1-nano-2025-04-14"),
      messages: [
        {
          role: "system",
          content:
            "You are a helpful coding assistant. Keep response under 3 sentences and focus on practical examples.",
            //"You are an expert science communicator with a deep understanding of Biomedical Sciences. Your role is to explain complex scientific topics in a clear, engaging, and easy-to-understand way, suitable for students or the general public.",
        },
        ...convertToModelMessages(messages),
      ],
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return Response.json(
      { error: "Failed to streaming chat completion" },
      { status: 500 }
    );
  }
}
