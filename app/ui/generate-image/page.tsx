"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { LucideSendHorizonal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function GenerateImagePage() {
  const [prompt, setPrompt] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setImageSrc(null);
    setPrompt("");
    setError(null);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong!");

      setImageSrc(`data:image/png;base64,${data}`);
    } catch (error) {
      console.error("Error generating image: ", error);
      setError(
        error instanceof Error ? error.message : "Failed to generating image"
      );
    }
  };

  return (
    <div className="h-screen overflow-y-hidden w-1/2 mx-auto flex flex-col">
      {/* Display Completion Text */}
      <div className="min-h-[90%] w-full py-10 overflow-y-scroll no-scrollbar">
        {error && <div className="text-red-500">{error}</div>}
        {isLoading ? (
          <div className="flex items-center gap-1">
            <Spinner />
            <p>Loading...</p>
          </div>
        ) : (
          imageSrc && (
            <Image
              src={imageSrc}
              alt="Generated Image"
              width={1024}
              height={1024}
            />
          )
        )}
      </div>

      {/* Input Text - Prompt */}
      <form
        onSubmit={handleSubmit}
        className="h-[10%] w-full flex items-center justify-center"
      >
        <div className="w-full flex items-center justify-between gap-3 px-1">
          <Input
            placeholder="Ask me anything..."
            className="h-12"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          {isLoading ? (
            <Button
              className="text-xs h-12"
              type="button"
              variant={"destructive"}
              onClick={stop}
            >
              Stop
              <LucideSendHorizonal />
            </Button>
          ) : (
            <Button className="text-xs h-12" type="submit" disabled={isLoading}>
              Generate
              <LucideSendHorizonal />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
