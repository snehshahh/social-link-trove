import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { sendMessage } from "@/store/slices/messageSlice";
import { AppDispatch, RootState } from "@/store";
import { Plane } from "lucide-react";

export function MessageInput() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const currentChat = useSelector((state: RootState) => state.messages.currentChat);
  const currentUserId = "user123"; // This would come from authentication in a real app

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !currentChat) return;

    dispatch(
      sendMessage({
        sender_id: currentUserId,
        receiver_id: currentChat,
        content: message,
        shared_link_id: null,
        shared_collection_id: null,
      })
    );

    setMessage("");
  };

  return (
    <Card className="border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm mt-4 shadow-md hover:shadow-zinc-800/20 transition-shadow">
      <CardContent className="p-3 sm:p-4">
        <form onSubmit={handleSendMessage} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Input
              className="flex-1 w-full bg-zinc-900 border-zinc-700 text-white focus-visible:ring-zinc-600 placeholder:text-zinc-500 pr-10 py-6 sm:py-5"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!currentChat}
            />
            <button 
              type="button" 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              onClick={() => {
                // This would open a link selector in a real app
                alert('Link selector would open here');
              }}
              disabled={!currentChat}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
          </div>
          <Button 
            type="submit" 
            variant="default"
            className="bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 text-white group transition-all duration-200 sm:w-auto w-full"
            disabled={!message.trim() || !currentChat}
          >
            <Plane className="h-4 w-4 mr-2 group-hover:text-blue-400 transition-colors" />
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}