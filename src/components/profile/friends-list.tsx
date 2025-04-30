import React, { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share, Mail, UserPlus } from "lucide-react";
import { SharePopup } from "@/components/ui/share-popup";

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  collections: number;
  links: number;
}

export function FriendsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "1",
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg",
      collections: 45,
      links: 320
    },
    {
      id: "2",
      name: "Sam Parker",
      username: "samdesign",
      avatar: "/placeholder.svg",
      collections: 28,
      links: 212
    },
    {
      id: "3",
      name: "Taylor Morgan",
      username: "taymorgan",
      avatar: "/placeholder.svg",
      collections: 19,
      links: 156
    },
    {
      id: "4",
      name: "Jordan Smith",
      username: "jsmith",
      avatar: "/placeholder.svg",
      collections: 35,
      links: 278
    }
  ]);

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShare = (friend: Friend) => {
    setSelectedFriend(friend);
    setIsSharePopupOpen(true);
  };

  return (
    <CardContent className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">My Friends</h2>
          <Button
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Friend
          </Button>
        </div>
        
        <Input
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-zinc-950 border-white/10 text-white"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFriends.length > 0 ? (
            filteredFriends.map(friend => (
              <div 
                key={friend.id} 
                className="flex flex-col p-4 border border-white/10 rounded-md bg-zinc-950 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback className="bg-black text-white">{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-white">{friend.name}</h3>
                    <p className="text-sm text-white/70">@{friend.username}</p>
                  </div>
                </div>
                
                <div className="flex justify-between mb-4 text-sm">
                  <div>
                    <p className="text-white font-medium">{friend.collections}</p>
                    <p className="text-white/60">Collections</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">{friend.links}</p>
                    <p className="text-white/60">Links</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <Button 
                    variant="outline" 
                    className="text-white border-white/20 hover:bg-white/10 flex-1"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-white border-white/20 hover:bg-white/10"
                    size="icon"
                    onClick={() => handleShare(friend)}
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-white/60 col-span-full">
              No friends found. Try adjusting your search.
            </div>
          )}
        </div>
      </div>

      {selectedFriend && (
        <SharePopup
          isOpen={isSharePopupOpen}
          onClose={() => setIsSharePopupOpen(false)}
          title={selectedFriend.name}
          shareUrl={`https://linkersdb.com/friends/${selectedFriend.username}`}
          type="friend"
        />
      )}
    </CardContent>
  );
}
