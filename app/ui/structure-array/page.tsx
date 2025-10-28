"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideSendHorizonal } from "lucide-react";
import React, { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { pokemonUISchema } from "@/app/api/structure-array/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StructureArrayPage() {
  const [type, setType] = useState<string>("");

  const { submit, object, isLoading, error, stop } = useObject({
    api: "/api/structure-array",
    schema: pokemonUISchema,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit({ type: type });
    setType("");
  };

  return (
    <div className="h-screen overflow-y-hidden w-1/2 mx-auto flex flex-col">
      {/* Display Completion Text */}
      {error && <div className="text-red-500">{error.message}</div>}

      <div className="min-h-[90%] w-full py-10 overflow-y-scroll no-scrollbar">
        {object &&
          object.map((pokemon, index) => (
            <Card key={index} className="mb-3">
              <CardHeader>
                <CardTitle>Pokemon's name - {pokemon?.name}</CardTitle>
                <CardDescription>Pokemon's Abilities</CardDescription>
              </CardHeader>
              <CardContent>
                {pokemon?.abilities?.map((ability, index) => (
                  <div key={index} className="text-sm">
                    {ability}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Input Text - Prompt */}
      <form
        onSubmit={handleSubmit}
        className="h-[10%] w-full flex items-center justify-center"
      >
        <div className="w-full flex items-center justify-between gap-3 px-1">
          <Input
            placeholder="Enter Pokemon Type..."
            className="h-12"
            value={type}
            onChange={(e) => setType(e.target.value)}
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
              disabled={isLoading || !type}
            >
              {isLoading ? "Generating..." : "Generate"}
              <LucideSendHorizonal />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
