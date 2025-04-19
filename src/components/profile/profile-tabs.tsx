
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { PersonalLinks } from "@/components/profile/personal-links";
import { FriendsList } from "@/components/profile/friends-list";
import { PublicCollections } from "@/components/profile/public-collections";

export function ProfileTabs() {
  return (
    <Tabs defaultValue="links" className="w-full">
      <TabsList className="bg-zinc-950 border border-white/10 mb-4">
        <TabsTrigger value="links" className="data-[state=active]:bg-black data-[state=active]:text-white">
          My Links
        </TabsTrigger>
        <TabsTrigger value="collections" className="data-[state=active]:bg-black data-[state=active]:text-white">
          Public Collections
        </TabsTrigger>
        <TabsTrigger value="friends" className="data-[state=active]:bg-black data-[state=active]:text-white">
          Friends
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="links">
        <Card className="bg-black border border-white/10">
          <PersonalLinks />
        </Card>
      </TabsContent>
      
      <TabsContent value="collections">
        <Card className="bg-black border border-white/10">
          <PublicCollections />
        </Card>
      </TabsContent>
      
      <TabsContent value="friends">
        <Card className="bg-black border border-white/10">
          <FriendsList />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
