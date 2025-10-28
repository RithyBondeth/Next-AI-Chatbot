"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideSendHorizonal } from "lucide-react";
import { useCompletion } from "@ai-sdk/react";
import AIResponseMessage from "@/components/ai-response-message";

export default function StreamPage() {
  const {
    input,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
    error,
    setInput,
    stop,
  } = useCompletion({
    api: "/api/stream",
  });

  return (
    <div className="h-screen overflow-y-hidden w-1/2 mx-auto flex flex-col">
      {/* Display Completion Text */}
      <div className="min-h-[90%] w-full py-10 overflow-y-scroll no-scrollbar">
        {error && <AIResponseMessage type="error" response={error.message} />}
        {isLoading && !completion && <AIResponseMessage type="loading" />}
        {completion && <AIResponseMessage type="ok" response={completion} />}
        {!isLoading && !completion && <AIResponseMessage type="null" />}
      </div>

      {/* Input Text - Prompt */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setInput("");
          handleSubmit(e);
        }}
        className="h-[10%] w-full flex items-center justify-center"
      >
        <div className="w-full flex items-center justify-between gap-3 px-1">
          <Input
            placeholder="Ask me anything..."
            className="h-12"
            value={input}
            onChange={handleInputChange}
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
              Send
              <LucideSendHorizonal />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
