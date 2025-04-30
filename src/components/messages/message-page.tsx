import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchMessages, setCurrentChat } from "@/store/slices/messageSlice";
import { AppDispatch, RootState } from "@/store";
import { MessageHistory } from "./message-history";
import { MessageInput } from "./message-input";

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastActive?: Date;
}

// Dummy contacts for development
const dummyContacts: Contact[] = [
  {
    id: "user456",
    name: "Jane Smith",
    lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
  },
  {
    id: "user789",
    name: "Alex Johnson",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "user101",
    name: "Sam Wilson",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  }
];

export function MessagePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentChat } = useSelector((state: RootState) => state.messages);
  const currentUserId = "user123"; // This would come from authentication

  useEffect(() => {
    dispatch(fetchMessages(currentUserId));
  }, [dispatch, currentUserId]);

  const handleContactSelect = (contactId: string) => {
    dispatch(setCurrentChat(contactId));
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold text-zinc-100 mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Contacts List */}
        <Card className="border border-zinc-800 bg-zinc-950 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-zinc-200">Contacts</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col">
              {dummyContacts.map((contact) => (
                <button
                  key={contact.id}
                  className={`flex items-center gap-3 p-4 hover:bg-zinc-900 text-left ${
                    currentChat === contact.id ? "bg-zinc-800" : ""
                  }`}
                  onClick={() => handleContactSelect(contact.id)}
                >
                  <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300">
                    {contact.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-zinc-300">{contact.name}</p>
                    {contact.lastActive && (
                      <p className="text-xs text-zinc-500">
                        Active {formatTimeAgo(contact.lastActive)}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Message Area */}
        <div className="md:col-span-3">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="w-full bg-zinc-900 border-b border-zinc-800">
              <TabsTrigger value="chat" className="flex-1 text-zinc-400 data-[state=active]:text-zinc-100">Chat</TabsTrigger>
              <TabsTrigger value="shared" className="flex-1 text-zinc-400 data-[state=active]:text-zinc-100">Shared Links</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="mt-4">
              <MessageHistory />
              <MessageInput />
            </TabsContent>
            <TabsContent value="shared" className="mt-4">
              <Card className="border border-zinc-800 bg-zinc-950">
                <CardContent className="p-4">
                  <p className="text-zinc-400">Shared links and collections will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Helper function to format time in a human-readable way
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / (1000 * 60));
  
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs} hr ago`;
  
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays} day ago`;
}