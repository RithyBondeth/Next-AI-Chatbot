"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideSendHorizonal } from "lucide-react";
import React, { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Spinner } from "@/components/ui/spinner";

type TUIMessage = {
  id: string;
  role: "user" | "assistant";
  parts: TTextUIPart[];
};

type TTextUIPart = {
  type: "text";
  text: string;
};

export default function ChatPage() {
  const [input, setInput] = useState<string>("");

  const { messages, sendMessage, status, error, stop } = useChat();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="h-screen overflow-y-hidden w-1/2 mx-auto flex flex-col">
      {/* Display Messages */}
      <div className="min-h-[90%] w-full py-10 overflow-y-scroll no-scrollbar">
        {error && <div className="text-red-500">{error.message}</div>}
        {messages.map((message) => (
          <div key={message.id} className="my-3">
            <div>
              {message.role === "user" ? "You:" : "Assistant:"}
            </div>
            {message.parts.map((part, index) => {
              switch (part.type) {
                case "text":
                  return (
                    <div
                      key={`${message.id}-${index}`}
                      className="whitespace-pre-wrap leading-relaxed w-fit py-3 px-5 bg-muted rounded-xl"
                    >
                      {part.text}
                    </div>
                  );
                default:
                  null;
              }
            })}
          </div>
        ))}
        {(status === "submitted" || status === "streaming") && (
          <div className="flex items-center gap-1 text-xs">
            <Spinner />
            <p>Loading...</p>
          </div>
        )}
      </div>

      {/* Input Text - Prompt */}
      <form
        onSubmit={handleSubmit}
        className="h-[10%] w-full flex items-center justify-center py-3"
      >
        <div className="w-full flex items-center justify-between gap-3 px-1">
          <Input
            placeholder="How can i help you?"
            className="h-12"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {status === "submitted" || status === "streaming" ? (
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
              disabled={status !== "ready"}
            >
              Send
              <LucideSendHorizonal />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
