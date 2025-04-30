import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchMessages } from "@/store/slices/messageSlice";

// This is the component that will render the message history
export function MessageHistory() {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, loading, error } = useSelector((state: RootState) => state.messages);
  const currentUserId = "user123"; // This would come from authentication in a real app

  useEffect(() => {
    // Fetch messages for the current user
    dispatch(fetchMessages(currentUserId));
  }, [dispatch, currentUserId]);

  // Transform the messages from your Redux store into the format your component expects
  const transformedMessages = messages.map(message => {
    // Determine if the message is from the current user or someone else
    const isSender = message.sender_id === currentUserId;
    
    return {
      id: message.id,
      content: message.content,
      sender: isSender ? "You" : `User ${message.sender_id.replace('user', '')}`,
      timestamp: new Date(message.timestamp),
      avatar: isSender ? "/avatars/user123.png" : `/avatars/${message.sender_id}.png`,
    };
  });

  if (loading) {
    return <div className="text-center text-zinc-400">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400">Error loading messages: {error}</div>;
  }

  return (
    <Card className="border border-zinc-800 bg-zinc-950">
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] w-full">
          <div className="flex flex-col gap-4 p-4">
            {transformedMessages.map((message) => (
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