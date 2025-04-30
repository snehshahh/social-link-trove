import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
            <Card className="flex-1 overflow-y-auto">
              <CardHeader>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={getUserAvatar(selectedUser.id)} />
                    <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h3 className="font-medium text-white">{selectedUser.name}</h3>
                    <p className="text-white/70 text-sm">Active now</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={message.id}
                    className={(
                      `flex items-end mb-4
                      ${message.sender_id === selectedUser.id ? 'justify-end' : 'justify-start'}`
                    )}
                  >
                    <div
                      className={(
                        `max-w-[70%] rounded-lg p-3
                        ${message.sender_id === selectedUser.id ? 
                          'bg-white/10 text-white' : 
                          'bg-white/5 text-white'
                        }`
                      )}
                    >
                      <p>{message.content}</p>
                      <p className="text-white/50 text-xs mt-1">
                        {formatMessageTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Message Input (to be implemented) */}
            <div className="border-t border-white/10 p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-white/5 text-white rounded-lg px-4 py-2"
                />
                <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                  Send
                </button>
              </div>
            </div>
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