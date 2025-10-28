"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { LucideSendHorizonal } from "lucide-react";
import React, { useRef, useState } from "react";

interface TTranscriptResult {
  text: string;
  segments?: Array<{ start: number; end: number; text: string }>;
  language?: string;
  durationInSeconds: number;
}

export default function GenerateImagePage() {
  const [transcript, setTranscript] = useState<TTranscriptResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select an audio file");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("audio", selectedFile);

      const response = await fetch("/api/transcribe-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to transcribe audio");

      const data = await response.json();

      setTranscript(data);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error transcribing audio: ", error);
      setError(
        error instanceof Error ? error.message : "Failed to transcribing audio"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
        setSelectedFile(file);
        setTranscript(null);
        setError(null);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setTranscript(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="h-screen overflow-y-hidden w-1/2 mx-auto flex flex-col">
      {/* Display Completion Text */}
      <div className="min-h-[90%] w-full py-10 overflow-y-scroll no-scrollbar">
        {error && <div className="text-red-500">{error}</div>}
        {isLoading && (
          <div className="flex items-center gap-1">
            <Spinner />
            Loading...
          </div>
        )}
        {transcript && !isLoading && (
          <div>
            <h3>Transcript:</h3>
            <p>{transcript.text}</p>
            {transcript.language && <p>{transcript.language}</p>}
            {transcript.durationInSeconds && (
              <p>Duration: {transcript.durationInSeconds.toFixed(1)} seconds</p>
            )}
          </div>
        )}
      </div>

      {/* Input Text - Prompt */}
      <form
        onSubmit={handleSubmit}
        className="h-[10%] w-full flex items-center justify-center"
      >
        <div className="w-full flex items-center justify-between gap-3 px-1">
          <Input hidden accept="audio/*" type="file" id="audio-upload" />
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
            <Button
              className="text-xs h-12"
              type="submit"
              disabled={isLoading || !selectedFile}
            >
              Transcript
              <LucideSendHorizonal />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
