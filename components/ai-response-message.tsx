import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Spinner } from "./ui/spinner";
import { LucideBot, LucideFrown } from "lucide-react";

export default function AIResponseMessage(props: {
  response?: string;
  type: "loading" | "error" | "null" | "ok";
}) {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="size-12 bg-primary">
        <AvatarFallback>
          <LucideBot strokeWidth="1.5px" className="text-muted-foreground" />
        </AvatarFallback>
        <AvatarImage src={""}></AvatarImage>
      </Avatar>
      <div className="flex flex-col items-start">
        <p className="text-xs">Bondeth</p>
        {props.response && props.type === "ok" && (
          <p className="whitespace-pre-wrap leading-loose mt-1">
            {props.response}
          </p>
        )}
        {props.type === "loading" && (
          <div className="flex items-center text-sm gap-1 mt-1">
            <Spinner fontSize={"16px"} />
            <p>Loading...</p>
          </div>
        )}
        {props.response && props.type === "error" && (
          <div className="flex items-center text-sm gap-1 mt-1">
            <LucideFrown size={16} className="text-red-500" />
            <p className="text-red-500">{props.response}</p>
          </div>
        )}
        {props.type === "null" && (
          <p className="whitespace-pre-wrap mt-1">
            Is there anything I can help you?
          </p>
        )}
      </div>
    </div>
  );
}
