import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';
import { User } from '@/types/user';
import { Message } from '@/types/message';

interface MessageDisplayProps {
  messages: Message[];
  users: User[];
}

export function MessageDisplay({ messages, users }: MessageDisplayProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'links' | 'collections'>('all');

  useEffect(() => {
    if (selectedUser) {
      const userMessages = messages.filter(msg => 
        (msg.sender_id === selectedUser.id || msg.receiver_id === selectedUser.id)
      );
      setChatMessages(userMessages);
    }
  }, [selectedUser, messages]);

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.username || 'Unknown User';
  };

  const getUserAvatar = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.profile_picture || 'avatar.png';
  };

  const formatMessageTime = (timestamp: Date) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const getLatestMessage = (userId: string) => {
    const userMessages = messages.filter(msg => 
      (msg.sender_id === userId || msg.receiver_id === userId)
    );
    return userMessages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
  };

  const getUnreadCount = (userId: string) => {
    return messages.filter(msg => 
      (msg.sender_id === userId || msg.receiver_id === userId) && 
      msg.status === 'unread'
    ).length;
  };

  return (
    <div className="flex h-full">
      {/* Chat List */}
      <div className="w-[300px] border-r border-white/10">
        <Card className="h-full overflow-y-auto">
          <CardHeader>
            <CardTitle>Chats</CardTitle>
          </CardHeader>
          <CardContent>
            {users.map(user => (
              <div
                key={user.id}
                className={(
                  `flex items-center p-3 hover:bg-white/5 cursor-pointer transition-colors
                  ${selectedUser?.id === user.id && "bg-white/5"}`
                )}
                onClick={() => setSelectedUser(user)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={getUserAvatar(user.id)} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-white">{user.name}</h3>
                    {getUnreadCount(user.id) > 0 && (
                      <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs">
                        {getUnreadCount(user.id)}
                      </span>
                    )}
                  </div>
                  <p className="text-white/70 text-sm">
                    {getLatestMessage(user.id)?.content || 'No messages yet'}
                  </p>
                  <p className="text-white/50 text-xs mt-1">
                    {formatMessageTime(getLatestMessage(user.id)?.timestamp || new Date())}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Chat History */}
      <div className="flex-1">
        {selectedUser ? (
          <div className="h-full flex flex-col">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'links' | 'collections')} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="links">Shared Links</TabsTrigger>
                <TabsTrigger value="collections">Collections</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="flex-1 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={`p-4 border-b border-white/10 ${
                      index === chatMessages.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={getUserAvatar(msg.sender_id)} />
                        <AvatarFallback>{getUserName(msg.sender_id)[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-white font-medium">{getUserName(msg.sender_id)}</h4>
                          <span className="text-white/50 text-sm">
                            {formatMessageTime(msg.timestamp)}
                          </span>
                        </div>
                        <p className="text-white/70 mt-1">{msg.content}</p>
                        
                        {msg.shared_link_id && (
                          <div className="mt-2 p-3 bg-zinc-950 rounded-lg border border-white/10">
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-400">🔗</span>
                              <span className="text-white/90">Shared Link</span>
                            </div>
                          </div>
                        )}
                        
                        {msg.shared_collection_id && (
                          <div className="mt-2 p-3 bg-zinc-950 rounded-lg border border-white/10">
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-400">📚</span>
                              <span className="text-white/90">Shared Collection</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="links" className="flex-1 overflow-y-auto">
                {chatMessages
                  .filter(msg => msg.shared_link_id)
                  .map((msg, index) => (
                    <div
                      key={msg.id}
                      className={`p-4 border-b border-white/10 ${
                        index === chatMessages.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={getUserAvatar(msg.sender_id)} />
                          <AvatarFallback>{getUserName(msg.sender_id)[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-white font-medium">{getUserName(msg.sender_id)}</h4>
                            <span className="text-white/50 text-sm">
                              {formatMessageTime(msg.timestamp)}
                            </span>
                          </div>
                          <div className="mt-2 p-3 bg-zinc-950 rounded-lg border border-white/10">
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-400">🔗</span>
                              <span className="text-white/90">Shared Link</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="collections" className="flex-1 overflow-y-auto">
                {chatMessages
                  .filter(msg => msg.shared_collection_id)
                  .map((msg, index) => (
                    <div
                      key={msg.id}
                      className={`p-4 border-b border-white/10 ${
                        index === chatMessages.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={getUserAvatar(msg.sender_id)} />
                          <AvatarFallback>{getUserName(msg.sender_id)[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-white font-medium">{getUserName(msg.sender_id)}</h4>
                            <span className="text-white/50 text-sm">
                              {formatMessageTime(msg.timestamp)}
                            </span>
                          </div>
                          <div className="mt-2 p-3 bg-zinc-950 rounded-lg border border-white/10">
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-400">📚</span>
                              <span className="text-white/90">Shared Collection</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/70">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}