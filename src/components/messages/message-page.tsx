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
    avatar: "https://i.pravatar.cc/150?img=5",
    lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
  },
  {
    id: "user789",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=8",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "user101",
    name: "Sam Wilson",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "user202",
    name: "Emily Chen",
    avatar: "https://i.pravatar.cc/150?img=9",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  }
];

// Dummy shared links for development
interface SharedLink {
  id: string;
  title: string;
  url: string;
  sharedBy: string;
  sharedAt: Date;
  favicon?: string;
}

const dummySharedLinks: SharedLink[] = [
  {
    id: "link1",
    title: "React Hooks Complete Guide",
    url: "https://reactjs.org/docs/hooks-intro.html",
    sharedBy: "user456",
    sharedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    favicon: "https://reactjs.org/favicon.ico"
  },
  {
    id: "link2",
    title: "Tailwind CSS Documentation",
    url: "https://tailwindcss.com/docs",
    sharedBy: "user789",
    sharedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    favicon: "https://tailwindcss.com/favicon.ico"
  },
  {
    id: "link3",
    title: "TypeScript Handbook",
    url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    sharedBy: "user101",
    sharedAt: new Date(Date.now() - 1000 * 60 * 60 * 36),
    favicon: "https://www.typescriptlang.org/favicon.ico"
  },
  {
    id: "link4",
    title: "Next.js Getting Started",
    url: "https://nextjs.org/docs/getting-started",
    sharedBy: "user456",
    sharedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    favicon: "https://nextjs.org/favicon.ico"
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
    <div className="container mx-auto p-3 sm:p-4 max-w-6xl">
      <h1 className="text-2xl font-bold text-zinc-100 mb-4 sm:mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {/* Contacts List */}
        <Card className="border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm md:col-span-1 shadow-md hover:shadow-zinc-800/20 transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-zinc-200 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 max-h-[calc(100vh-250px)] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
            <div className="flex flex-col">
              {dummyContacts.map((contact) => (
                <button
                  key={contact.id}
                  className={`flex items-center gap-3 p-4 hover:bg-zinc-900 text-left ${
                    currentChat === contact.id ? "bg-zinc-800" : ""
                  }`}
                  onClick={() => handleContactSelect(contact.id)}
                >
                  <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-700">
                    {contact.avatar ? (
                      <img src={contact.avatar} alt={contact.name} className="h-full w-full object-cover" />
                    ) : (
                      contact.name[0].toUpperCase()
                    )}
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
            <TabsList className="w-full bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 rounded-t-lg">
              <TabsTrigger value="chat" className="flex-1 text-zinc-400 data-[state=active]:text-zinc-100 data-[state=active]:bg-zinc-800/50 rounded-t-md transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Chat
              </TabsTrigger>
              <TabsTrigger value="shared" className="flex-1 text-zinc-400 data-[state=active]:text-zinc-100 data-[state=active]:bg-zinc-800/50 rounded-t-md transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Shared Links
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="mt-4">
              <MessageHistory />
              <MessageInput />
            </TabsContent>
            <TabsContent value="shared" className="mt-4">
              <Card className="border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm shadow-md hover:shadow-zinc-800/20 transition-shadow">
                <CardContent className="p-4">
                  {dummySharedLinks.length > 0 ? (
                    <div className="space-y-4">
                      {dummySharedLinks.map((link) => {
                        const contact = dummyContacts.find(c => c.id === link.sharedBy);
                        return (
                          <div key={link.id} className="flex items-start gap-3 p-3 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors bg-zinc-900/50">
                            <div className="flex-shrink-0 w-10 h-10 rounded bg-zinc-800 flex items-center justify-center overflow-hidden">
                              {link.favicon ? (
                                <img src={link.favicon} alt="" className="w-6 h-6" />
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <a 
                                  href={link.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-zinc-200 font-medium hover:text-blue-400 transition-colors truncate"
                                >
                                  {link.title}
                                </a>
                              </div>
                              <p className="text-xs text-zinc-500 truncate mb-2">{link.url}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="h-6 w-6 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-700">
                                    {contact?.avatar ? (
                                      <img src={contact.avatar} alt={contact.name} className="h-full w-full object-cover" />
                                    ) : (
                                      <span className="text-xs text-zinc-300">{contact?.name[0].toUpperCase()}</span>
                                    )}
                                  </div>
                                  <span className="text-xs text-zinc-400">Shared by {contact?.name}</span>
                                </div>
                                <span className="text-xs text-zinc-500">{formatTimeAgo(link.sharedAt)}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-zinc-400">No shared links yet.</p>
                  )}
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