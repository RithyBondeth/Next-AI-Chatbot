import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  console.log("Streaming...");
  try {
    const { prompt } = await req.json();

    const result = streamText({
      model: openai("gpt-4.1-nano"),
      prompt: prompt,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error generating stream text:", error);
    return Response.json(
      { error: "Failed to generate stream text" },
      { status: 500 }
    );
  }
}
