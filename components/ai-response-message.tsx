import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import BondethAvatar from "@/assets/avatar/bondeth-avatar.webp";

export default function AIResponseMessage(props: { response: string }) {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="size-12 bg-primary">
        <AvatarFallback className="text-xs font-medium">BON</AvatarFallback>
        <AvatarImage src={BondethAvatar.src}></AvatarImage>
      </Avatar>
      <div className="flex flex-col items-start">
        <p className="text-xs">Bondeth</p>
        <p className="whitespace-pre-wrap">{props.response}</p>
      </div>
    </div>
  );
}
