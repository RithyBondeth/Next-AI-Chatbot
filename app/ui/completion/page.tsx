"use client";

import AIResponseMessage from "@/components/ai-response-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideSendHorizonal } from "lucide-react";
import React, { useState } from "react";

export default function CompletionPage() {
  const [prompt, setPrompt] = useState<string>("");
  const [completion, setCompletion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setPrompt("");

    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setCompletion(data.text);
    } catch (error) {
      console.error("Handle Completion Error: ", error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-y-hidden w-1/2 mx-auto flex flex-col">
      {/* Display Completion Text */}
      <div className="min-h-[90%] w-full py-10 overflow-y-scroll no-scrollbar">
        {isLoading ? (
          <AIResponseMessage type="loading" />
        ) : completion ? (
          <AIResponseMessage type="ok" response={completion} />
        ) : error ? (
          <AIResponseMessage type="error" response={error} />
        ) : (
          <AIResponseMessage type="null" />
        )}
      </div>

      {/* Input Text - Prompt */}
      <form
        onSubmit={handleComplete}
        className="h-[10%] w-full flex items-center justify-center"
      >
        <div className="w-full flex items-center justify-between gap-3 px-1">
          <Input
            placeholder="Enter your message here..."
            className="h-12"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button className="text-xs h-12" type="submit" disabled={isLoading}>
            Send
            <LucideSendHorizonal />
          </Button>
        </div>
      </form>
    </div>
  );
}
