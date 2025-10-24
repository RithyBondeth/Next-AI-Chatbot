"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideSendHorizonal } from "lucide-react";
import React, { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { recipeSchema } from "@/app/api/structure-data/schema";

export default function StructureDataPage() {
  const [dishName, setDishName] = useState<string>("");

  const { submit, object, isLoading, error, stop } = useObject({
    api: "/api/structure-data",
    schema: recipeSchema,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit({ dish: dishName });
    setDishName("");
  };

  return (
    <div className="h-screen overflow-y-hidden w-1/2 mx-auto flex flex-col">
      {/* Display Completion Text */}
      {error && <div className="text-red-500">{error.message}</div>}

      <div className="min-h-[90%] w-full py-10 overflow-y-scroll no-scrollbar">
        {object?.recipe && (
          <div>
            <h2>{object.recipe.name}</h2>
            {object.recipe.ingredients && (
              <div>
                <h3>Ingredients</h3>
                <div>
                  {object.recipe.ingredients.map((ingredient, index) => (
                    <div key={index}>
                      <p>{ingredient?.name}</p>
                      <p>{ingredient?.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {object?.recipe.steps && (
              <div>
                <h3>Steps</h3>
                <ol>
                  {object.recipe.steps.map((step, index) => (
                    <li key={index}>
                      <span>{index + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
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
          <Input
            placeholder="Enter dish name..."
            className="h-12"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
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
              disabled={isLoading || !dishName}
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
