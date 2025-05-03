
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { sendMessage } from "@/store/slices/messageSlice";
import { AppDispatch, RootState } from "@/store";
import { Plane, Link2 } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function MessageInput() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const currentChat = useSelector((state: RootState) => state.messages.currentChat);
  const currentUserId = "user123"; // This would come from authentication in a real app
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
    <Card className={`border ${isDark ? 'border-zinc-800 bg-zinc-950/80' : 'border-zinc-200 bg-white/80'} backdrop-blur-sm mt-4 shadow-md hover:shadow-zinc-800/20 transition-shadow`}>
      <CardContent className="p-3 sm:p-4">
        <form onSubmit={handleSendMessage} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Input
              className={`flex-1 w-full ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-700 text-white focus-visible:ring-zinc-600 placeholder:text-zinc-500' 
                  : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus-visible:ring-zinc-300 placeholder:text-zinc-400'
              } pr-10 py-6 sm:py-5`}
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!currentChat}
            />
            <button 
              type="button" 
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                isDark 
                  ? 'text-zinc-500 hover:text-zinc-300' 
                  : 'text-zinc-400 hover:text-zinc-600'
              } transition-colors`}
              onClick={() => {
                // This would open a link selector in a real app
                alert('Link selector would open here');
              }}
              disabled={!currentChat}
            >
              <Link2 className="h-5 w-5" />
            </button>
          </div>
          <Button 
            type="submit" 
            variant="default"
            className={`${
              isDark 
                ? 'bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 text-white' 
                : 'bg-zinc-200 border border-zinc-300 hover:bg-zinc-300 hover:border-zinc-400 text-zinc-900'
            } group transition-all duration-200 sm:w-auto w-full`}
            disabled={!message.trim() || !currentChat}
          >
            <Plane className={`h-4 w-4 mr-2 group-hover:text-blue-400 transition-colors`} />
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
