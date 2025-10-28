"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucidePaperclip, LucideSendHorizonal } from "lucide-react";
import React, { useState, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { Spinner } from "@/components/ui/spinner";
import { DefaultChatTransport } from "ai";
import { file } from "zod";
import Image from "next/image";

type TUIMessage = {
  id: string;
  role: "user" | "assistant";
  parts: TTextUIPart[];
};

type TTextUIPart = {
  type: "text";
  text: string;
};

export default function MultiModalChatPage() {
  const [input, setInput] = useState<string>("");
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/multi-modal-chat",
    }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input, files: files });
    setInput("");
    setFiles(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="h-screen overflow-y-hidden w-1/2 mx-auto flex flex-col">
      {/* Display Messages */}
      <div className="min-h-[90%] w-full py-10 overflow-y-scroll no-scrollbar">
        {error && <div className="text-red-500">{error.message}</div>}
        {messages.map((message) => (
          <div key={message.id} className="my-3">
            <div>{message.role === "user" ? "You:" : "Assistant:"}</div>
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
                case "file":
                  if (part.mediaType?.startsWith("image/")) {
                    return (
                      <Image
                        key={`${message.id}-${index}`}
                        src={part.url}
                        alt={part.filename ?? `attachment-${index}`}
                        width={500}
                        height={500}
                      />
                    );
                  }
                  if (part.mediaType.startsWith("application/pdf")) {
                    return (
                      <iframe
                        key={`${message.id}-${index}`}
                        src={part.url}
                        width={500}
                        height={500}
                        title={part.filename ?? `attachment-${index}`}
                      />
                    );
                  }
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
      <div className=" p-2">
        <p className="text-sm">
          {files && files.length > 0 && `${file.length} file(s) attached`}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="h-[10%] w-full flex items-center justify-center"
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
            <div className="flex items-center gap-1">
              <Button
                className="text-xs h-12"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <LucidePaperclip />
                <input
                  type="file"
                  id="file-upload"
                  hidden
                  multiple
                  ref={fileInputRef}
                  onChange={(event) => {
                    if (event.target.files) {
                      setFiles(event.target.files);
                    }
                  }}
                />
              </Button>
              <Button
                className="text-xs h-12"
                type="submit"
                disabled={status !== "ready" || input === ""}
              >
                Send
                <LucideSendHorizonal />
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
