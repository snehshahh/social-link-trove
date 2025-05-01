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
      shared_link_id: message.shared_link_id,
      shared_collection_id: message.shared_collection_id,
    };
  });

  if (loading) {
    return <div className="text-center text-zinc-400">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400">Error loading messages: {error}</div>;
  }

  return (
    <Card className="border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm shadow-md hover:shadow-zinc-800/20 transition-shadow">
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-350px)] min-h-[400px] w-full">
          <div className="flex flex-col gap-4 p-4">
            {transformedMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 animate-in fade-in slide-in-from-${message.sender === 'You' ? 'right' : 'left'} duration-300`}
              >
                <Avatar className="h-10 w-10 border border-zinc-700 shadow-sm">
                  <AvatarImage src={message.avatar} />
                  <AvatarFallback className="bg-zinc-800 text-zinc-300">
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
                  <div className={`mt-1 p-3 rounded-lg ${message.sender === 'You' ? 'bg-zinc-800/70 ml-auto mr-0 rounded-tr-none' : 'bg-zinc-900/70 rounded-tl-none'} max-w-[85%] shadow-sm`}>
                    <p className="text-sm text-zinc-300 leading-relaxed break-words">
                      {message.content}
                    </p>
                    {message.shared_link_id && (
                      <div className="mt-2 pt-2 border-t border-zinc-700/50">
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          <span className="text-xs text-blue-400 hover:underline cursor-pointer">View shared link</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}