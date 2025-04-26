
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  avatar?: string;
}

interface MessageHistoryProps {
  messages: Message[];
}

export function MessageHistory({ messages }: MessageHistoryProps) {
  return (
    <Card className="border border-zinc-800 bg-zinc-950">
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] w-full">
          <div className="flex flex-col gap-4 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="flex items-start gap-3 animate-fade-in"
              >
                <Avatar className="h-8 w-8 border border-zinc-800">
                  <AvatarImage src={message.avatar} />
                  <AvatarFallback className="bg-zinc-900 text-zinc-400">
                    {message.sender[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-200">
                      {message.sender}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
