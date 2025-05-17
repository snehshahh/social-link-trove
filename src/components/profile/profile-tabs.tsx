
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { PersonalLinks } from "@/components/profile/personal-links";
import { FriendsList } from "@/components/profile/friends-list";
import { PublicCollections } from "@/components/profile/public-collections";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { LinkIcon, Users, FolderKanban } from "lucide-react";

export function ProfileTabs() {
  const { isDark } = useTheme();
  const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);
  
  return (
    <Tabs defaultValue="links" className="w-full">
      <div className={`p-1 ${isDark ? 'bg-zinc-900/20' : 'bg-white/80'} backdrop-blur-md rounded-xl border ${isDark ? 'border-zinc-800/50' : 'border-zinc-200/70'} mb-6`}>
        <TabsList className="w-full h-auto p-1 bg-transparent flex items-center gap-1">
          <TabsTrigger 
            value="links" 
            className={`relative flex-1 py-3 px-6 rounded-lg transition-all duration-300 ${
              hoveredTab === "links" && hoveredTab !== "links"
                ? isDark
                  ? "bg-zinc-800/30"
                  : "bg-zinc-100/80"
                : ""
            } data-[state=active]:scale-100 data-[state=active]:translate-y-0 data-[state=inactive]:translate-y-0`}
            onMouseEnter={() => setHoveredTab("links")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <div className="flex items-center justify-center gap-2">
              <LinkIcon className={`h-4 w-4 ${
                isDark 
                  ? "data-[state=active]:text-yellow-400" 
                  : "data-[state=active]:text-blue-500"
              }`} />
              <span className="font-medium">My Links</span>
            </div>
            {/* Animated highlight for active tab */}
            <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full ${
              isDark ? 'data-[state=active]:bg-yellow-400/70' : 'data-[state=active]:bg-blue-500/70'
            }`}></div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="collections" 
            className={`relative flex-1 py-3 px-6 rounded-lg transition-all duration-300 ${
              hoveredTab === "collections" && hoveredTab !== "collections"
                ? isDark
                  ? "bg-zinc-800/30"
                  : "bg-zinc-100/80"
                : ""
            } data-[state=active]:scale-100 data-[state=active]:translate-y-0 data-[state=inactive]:translate-y-0`}
            onMouseEnter={() => setHoveredTab("collections")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <div className="flex items-center justify-center gap-2">
              <FolderKanban className={`h-4 w-4 ${
                isDark 
                  ? "data-[state=active]:text-yellow-400" 
                  : "data-[state=active]:text-blue-500"
              }`} />
              <span className="font-medium">Public Collections</span>
            </div>
            {/* Animated highlight for active tab */}
            <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full ${
              isDark ? 'data-[state=active]:bg-yellow-400/70' : 'data-[state=active]:bg-blue-500/70'
            }`}></div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="friends" 
            className={`relative flex-1 py-3 px-6 rounded-lg transition-all duration-300 ${
              hoveredTab === "friends" && hoveredTab !== "friends"
                ? isDark
                  ? "bg-zinc-800/30"
                  : "bg-zinc-100/80"
                : ""
            } data-[state=active]:scale-100 data-[state=active]:translate-y-0 data-[state=inactive]:translate-y-0`}
            onMouseEnter={() => setHoveredTab("friends")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className={`h-4 w-4 ${
                isDark 
                  ? "data-[state=active]:text-yellow-400" 
                  : "data-[state=active]:text-blue-500"
              }`} />
              <span className="font-medium">Friends</span>
            </div>
            {/* Animated highlight for active tab */}
            <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full ${
              isDark ? 'data-[state=active]:bg-yellow-400/70' : 'data-[state=active]:bg-blue-500/70'
            }`}></div>
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="links">
        <Card className={cn(
          "border",
          isDark 
            ? "bg-black border-white/10" 
            : "bg-white border-zinc-200"
        )}>
          <PersonalLinks />
        </Card>
      </TabsContent>
      
      <TabsContent value="collections">
        <Card className={cn(
          "border",
          isDark 
            ? "bg-black border-white/10" 
            : "bg-white border-zinc-200"
        )}>
          <PublicCollections />
        </Card>
      </TabsContent>
      
      <TabsContent value="friends">
        <Card className={cn(
          "border",
          isDark 
            ? "bg-black border-white/10" 
            : "bg-white border-zinc-200"
        )}>
          <FriendsList />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
