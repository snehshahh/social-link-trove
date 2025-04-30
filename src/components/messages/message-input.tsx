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
    <Card className="border border-white/10 bg-black mt-4">
      <CardContent className="p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            className="flex-1 bg-black border-white/10 text-white focus-visible:ring-white/20 placeholder:text-white/60"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!currentChat}
          />
          <Button 
            type="submit" 
            variant="default"
            className="bg-black border border-white/10 hover:bg-black hover:border-white/20 text-white group"
            disabled={!message.trim() || !currentChat}
          >
            <Plane className="h-4 w-4 mr-2 group-hover:text-yellow-500" />
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}