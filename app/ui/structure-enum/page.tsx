"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideSendHorizonal } from "lucide-react";
import React, { useState } from "react";

export default function StructureEnumPage() {
  const [text, setText] = useState<string>("");
  const [sentiment, setSentiment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeSentiment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);
    setText("");

    try {
      const response = await fetch("/api/structure-enum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong!");

      setSentiment(data);
    } catch (error) {
      console.log("Error", error);
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
      {error && <div className="text-red-500">{error}</div>}

      <div className="min-h-[90%] w-full py-10 overflow-y-scroll no-scrollbar">
        {isLoading ? (
          <div>
            {sentiment === "positive" && "Positive"}
            {sentiment === "negative" && "Negative"}
            {sentiment === "neutral" && "Neutral"}
          </div>
        ) : null}
      </div>

      {/* Input Text - Prompt */}
      <form
        onSubmit={analyzeSentiment}
        className="h-[10%] w-full flex items-center justify-center"
      >
        <div className="w-full flex items-center justify-between gap-3 px-1">
          <Input
            placeholder="Enter Pokemon Type..."
            className="h-12"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {isLoading ? (
            <Button
              className="text-xs h-12"
              variant="destructive"
              type="button"
              onClick={stop}
            >
              Stop
            </Button>
          ) : (
            <Button
              className="text-xs h-12"
              type="submit"
              disabled={isLoading || !text}
            >
              {isLoading ? "Analyzing..." : "Analyze"}
              <LucideSendHorizonal />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
