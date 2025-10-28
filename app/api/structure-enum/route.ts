import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const result = generateObject({
      model: openai("gpt-4.1-mini"), // Best for enum response
      output: "enum",
      enum: ["positive", "negative", "neutral"],
      prompt: `Classify the sentiment in this text ${text}.`,
    });

    return (await result).toJsonResponse();
  } catch (error) {
    console.error("Error generating sentiment: ", error);
    return new Response("Failed to generate sentiment", { status: 500 });
  }
}