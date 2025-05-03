
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchMessages } from "@/store/slices/messageSlice";
import { useTheme } from "@/hooks/use-theme";

// This component will show top contacts instead of message history
export function MessageHistory() {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, loading, error } = useSelector((state: RootState) => state.messages);
  const currentUserId = "user123"; // This would come from authentication in a real app
  const { isDark } = useTheme();

  useEffect(() => {
    // Fetch messages for the current user
    dispatch(fetchMessages(currentUserId));
  }, [dispatch, currentUserId]);

  // Get unique contacts from messages
  const contacts = messages.reduce((acc: any[], message: any) => {
    const contactId = message.sender_id === currentUserId 
      ? message.receiver_id 
      : message.sender_id;
    
    if (contactId === currentUserId) return acc;

    const existingContact = acc.find(c => c.id === contactId);
    if (existingContact) {
      // Update last message if this one is newer
      if (new Date(message.timestamp) > new Date(existingContact.lastMessageTime)) {
        existingContact.lastMessage = message.content;
        existingContact.lastMessageTime = message.timestamp;
        existingContact.unread = message.status === 'unread' ? existingContact.unread + 1 : existingContact.unread;
      }
      return acc;
    }
    
    // Add new contact
    acc.push({
      id: contactId,
      name: `User ${contactId.replace('user', '')}`,
      avatar: `/avatars/${contactId}.png`,
      lastMessage: message.content,
      lastMessageTime: message.timestamp,
      unread: message.status === 'unread' ? 1 : 0
    });
    return acc;
  }, []);
  
  // Sort by most recent message and take top 5
  const topContacts = contacts
    .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())
    .slice(0, 5);

  if (loading) {
    return <div className={`text-center ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Loading contacts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400">Error loading contacts: {error}</div>;
  }

  return (
    <Card className={`border ${isDark ? 'border-zinc-800 bg-zinc-950/80' : 'border-zinc-200 bg-white'} backdrop-blur-sm shadow-md transition-shadow`}>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] w-full">
          <div className="flex flex-col">
            {topContacts.length > 0 ? (
              topContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`flex items-center gap-3 p-4 border-b ${isDark ? 'border-zinc-800 hover:bg-zinc-900/50' : 'border-zinc-100 hover:bg-zinc-50'} transition-colors cursor-pointer`}
                >
                  <Avatar className={`h-10 w-10 border ${isDark ? 'border-zinc-700' : 'border-zinc-200'} shadow-sm`}>
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback className={`${isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'}`}>
                      {contact.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className={`font-medium truncate ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                        {contact.name}
                      </span>
                      {contact.unread > 0 && (
                        <Badge variant="default" className={`${isDark ? 'bg-yellow-500' : 'bg-purple-500'} text-white ml-2 text-xs`}>
                          {contact.unread}
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm truncate mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {contact.lastMessage}
                    </p>
                    <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      {formatDistanceToNow(new Date(contact.lastMessageTime), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className={`p-4 text-center ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                No recent contacts
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
