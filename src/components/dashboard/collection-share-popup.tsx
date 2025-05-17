
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Copy, Share2, Users, Lock, Globe } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

interface Friend {
  id: string;
  name: string;
  avatar?: string;
}

interface CollectionSharePopupProps {
  isOpen: boolean;
  onClose: () => void;
  collectionId: string;
  collectionName: string;
  isPublic: boolean;
  onTogglePublic: (isPublic: boolean) => void;
  onShareWithFriends: (friendIds: string[]) => void;
}

// Sample friends data (in a real app, this would come from the user's friend list)
const sampleFriends: Friend[] = [
  { id: "1", name: "John Doe", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
  { id: "2", name: "Jane Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" },
  { id: "3", name: "Mike Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
  { id: "4", name: "Sarah Williams", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { id: "5", name: "Alex Brown", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
];

export function CollectionSharePopup({
  isOpen,
  onClose,
  collectionId,
  collectionName,
  isPublic,
  onTogglePublic,
  onShareWithFriends,
}: CollectionSharePopupProps) {
  const { isDark } = useTheme();
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const filteredFriends = sampleFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleToggleFriend = (friendId: string) => {
    setSelectedFriends(prev => 
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };
  
  const handleShareWithFriends = () => {
    onShareWithFriends(selectedFriends);
    toast.success(`Collection shared with ${selectedFriends.length} friend${selectedFriends.length !== 1 ? 's' : ''}`);
    setSelectedFriends([]);
    onClose();
  };
  
  const handleCopyLink = () => {
    // Get the hosting URL from env or fallback to current origin
    const hostingUrl = process.env.HOSTING_URL || window.location.origin;
    const shareUrl = `${hostingUrl}/shared-collection/${collectionId}`;
    
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    toast.success("Collection link copied to clipboard");
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "max-w-md border",
        isDark 
          ? "bg-black border-white/10" 
          : "bg-white border-zinc-200"
      )}>
        <DialogHeader>
          <DialogTitle className={cn(
            "text-xl",
            isDark ? "text-white" : "text-zinc-900"
          )}>
            Share Collection: {collectionName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Public/Private toggle */}
          <div className={cn(
            "flex items-center justify-between p-4 rounded-lg",
            isDark 
              ? "bg-zinc-900 border border-white/10" 
              : "bg-zinc-50 border border-zinc-200"
          )}>
            <div className="flex items-center gap-3">
              {isPublic ? (
                <Globe className={cn(
                  "h-5 w-5",
                  isDark ? "text-yellow-400" : "text-blue-500"
                )} />
              ) : (
                <Lock className={cn(
                  "h-5 w-5",
                  isDark ? "text-white/70" : "text-zinc-600"
                )} />
              )}
              <div>
                <h3 className={cn(
                  "font-medium",
                  isDark ? "text-white" : "text-zinc-900"
                )}>
                  {isPublic ? "Public Collection" : "Private Collection"}
                </h3>
                <p className={cn(
                  "text-sm",
                  isDark ? "text-white/60" : "text-zinc-500"
                )}>
                  {isPublic 
                    ? "Anyone with the link can view this collection" 
                    : "Only you and people you share with can view this collection"}
                </p>
              </div>
            </div>
            <Switch 
              checked={isPublic} 
              onCheckedChange={onTogglePublic} 
              className={cn(
                isDark 
                  ? "data-[state=checked]:bg-yellow-400" 
                  : "data-[state=checked]:bg-blue-500"
              )}
            />
          </div>
          
          {/* Copy link section */}
          <div className={cn(
            "p-4 rounded-lg",
            isDark 
              ? "bg-zinc-900 border border-white/10" 
              : "bg-zinc-50 border border-zinc-200"
          )}>
            <h3 className={cn(
              "mb-3 font-medium",
              isDark ? "text-white" : "text-zinc-900"
            )}>
              Share Link
            </h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className={cn(
                  "flex-1",
                  isDark 
                    ? "bg-black border-white/10 text-white hover:bg-zinc-900" 
                    : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                )}
                onClick={handleCopyLink}
              >
                <Copy className="mr-2 h-4 w-4" />
                {isCopied ? "Copied!" : "Copy Link"}
              </Button>
            </div>
          </div>
          
          {/* Share with friends section */}
          <div className={cn(
            "p-4 rounded-lg",
            isDark 
              ? "bg-zinc-900 border border-white/10" 
              : "bg-zinc-50 border border-zinc-200"
          )}>
            <div className="flex items-center gap-2 mb-3">
              <Users className={cn(
                "h-5 w-5",
                isDark ? "text-yellow-400" : "text-blue-500"
              )} />
              <h3 className={cn(
                "font-medium",
                isDark ? "text-white" : "text-zinc-900"
              )}>
                Share with Friends
              </h3>
            </div>
            
            <Input
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "mb-3",
                isDark 
                  ? "bg-black border-white/10 text-white" 
                  : "bg-white border-zinc-200 text-zinc-800"
              )}
            />
            
            <div className={cn(
              "max-h-48 overflow-y-auto p-1 rounded-md mb-3",
              isDark 
                ? "scrollbar-thumb-zinc-700 scrollbar-track-zinc-900" 
                : "scrollbar-thumb-zinc-300 scrollbar-track-zinc-100"
            )}>
              {filteredFriends.length > 0 ? (
                filteredFriends.map(friend => (
                  <div 
                    key={friend.id}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-md cursor-pointer",
                      selectedFriends.includes(friend.id) 
                        ? isDark 
                          ? "bg-yellow-400/20 hover:bg-yellow-400/30" 
                          : "bg-blue-50 hover:bg-blue-100"
                        : isDark 
                          ? "hover:bg-zinc-800" 
                          : "hover:bg-zinc-100"
                    )}
                    onClick={() => handleToggleFriend(friend.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback className={cn(
                          isDark ? "bg-zinc-800 text-white" : "bg-zinc-200 text-zinc-800"
                        )}>
                          {friend.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className={cn(
                        isDark ? "text-white" : "text-zinc-900"
                      )}>
                        {friend.name}
                      </span>
                    </div>
                    <div className={cn(
                      "size-5 rounded-full border flex items-center justify-center",
                      selectedFriends.includes(friend.id)
                        ? isDark 
                          ? "bg-yellow-400 border-yellow-400" 
                          : "bg-blue-500 border-blue-500"
                        : isDark 
                          ? "border-white/20" 
                          : "border-zinc-300"
                    )}>
                      {selectedFriends.includes(friend.id) && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                          className={cn(
                            "size-3", 
                            isDark ? "stroke-black" : "stroke-white"
                          )}
                          strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className={cn(
                  "text-center py-4",
                  isDark ? "text-white/50" : "text-zinc-500"
                )}>
                  No friends found matching your search
                </p>
              )}
            </div>
            
            <div className="flex justify-between">
              <p className={cn(
                "text-sm",
                isDark ? "text-white/60" : "text-zinc-500"
              )}>
                {selectedFriends.length} friend{selectedFriends.length !== 1 ? 's' : ''} selected
              </p>
              <Button 
                variant="default" 
                size="sm"
                disabled={selectedFriends.length === 0}
                className={cn(
                  selectedFriends.length === 0 ? "opacity-50" : "",
                  isDark 
                    ? "bg-yellow-400 text-black hover:bg-yellow-500" 
                    : "bg-blue-500 text-white hover:bg-blue-600"
                )}
                onClick={handleShareWithFriends}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
