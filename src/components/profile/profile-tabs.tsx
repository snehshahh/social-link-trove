
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { PersonalLinks } from "@/components/profile/personal-links";
import { FriendsList } from "@/components/profile/friends-list";
import { PublicCollections } from "@/components/profile/public-collections";
import { useTheme } from "@/hooks/use-theme";

export function ProfileTabs() {
  const { isDark } = useTheme();
  
  return (
    <Tabs defaultValue="links" className="w-full">
      <TabsList className={`${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'} mb-4`}>
        <TabsTrigger 
          value="links" 
          className={`${isDark 
            ? 'data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-zinc-400 data-[state=active]:border-yellow-600' 
            : 'data-[state=active]:bg-purple-500 data-[state=active]:text-white text-zinc-600 data-[state=active]:border-purple-600'}`}
        >
          My Links
        </TabsTrigger>
        <TabsTrigger 
          value="collections" 
          className={`${isDark 
            ? 'data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-zinc-400 data-[state=active]:border-yellow-600' 
            : 'data-[state=active]:bg-purple-500 data-[state=active]:text-white text-zinc-600 data-[state=active]:border-purple-600'}`}
        >
          Public Collections
        </TabsTrigger>
        <TabsTrigger 
          value="friends" 
          className={`${isDark 
            ? 'data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-zinc-400 data-[state=active]:border-yellow-600' 
            : 'data-[state=active]:bg-purple-500 data-[state=active]:text-white text-zinc-600 data-[state=active]:border-purple-600'}`}
        >
          Friends
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="links">
        <Card className={`${isDark ? 'bg-zinc-950 border border-zinc-800' : 'bg-white border border-zinc-200'}`}>
          <PersonalLinks />
        </Card>
      </TabsContent>
      
      <TabsContent value="collections">
        <Card className={`${isDark ? 'bg-zinc-950 border border-zinc-800' : 'bg-white border border-zinc-200'}`}>
          <PublicCollections />
        </Card>
      </TabsContent>
      
      <TabsContent value="friends">
        <Card className={`${isDark ? 'bg-zinc-950 border border-zinc-800' : 'bg-white border border-zinc-200'}`}>
          <FriendsList />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
