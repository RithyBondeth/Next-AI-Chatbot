"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CompletionPage() {
  return (
    <div className="h-screen w-1/2 mx-auto flex flex-col">
      {/* Display Completion Text */}
      <div className="h-[90%] w-full"></div>

      {/* Input Text */}
      <form
        action=""
        className="h-[10%] w-full flex items-center justify-center"
      >
        <div className="w-full flex items-center justify-between gap-3">
          <Input placeholder="Enter your message here..." />
          <Button>Send</Button>
        </div>
      </form>
    </div>
  );
}
