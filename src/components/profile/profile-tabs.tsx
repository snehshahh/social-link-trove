
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { PersonalLinks } from "@/components/profile/personal-links";
import { FriendsList } from "@/components/profile/friends-list";
import { PublicCollections } from "@/components/profile/public-collections";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function ProfileTabs() {
  const { isDark } = useTheme();
  
  return (
    <Tabs defaultValue="links" className="w-full">
      <TabsList className={cn(
        "mb-4 p-1",
        isDark 
          ? "bg-zinc-950 border border-white/10" 
          : "bg-zinc-100 border border-zinc-200"
      )}>
        <TabsTrigger 
          value="links" 
          className={cn(
            "transition-all",
            isDark 
              ? "data-[state=active]:bg-black data-[state=active]:text-white" 
              : "data-[state=active]:bg-white data-[state=active]:text-zinc-900"
          )}
        >
          My Links
        </TabsTrigger>
        <TabsTrigger 
          value="collections" 
          className={cn(
            "transition-all",
            isDark 
              ? "data-[state=active]:bg-black data-[state=active]:text-white" 
              : "data-[state=active]:bg-white data-[state=active]:text-zinc-900"
          )}
        >
          Public Collections
        </TabsTrigger>
        <TabsTrigger 
          value="friends" 
          className={cn(
            "transition-all",
            isDark 
              ? "data-[state=active]:bg-black data-[state=active]:text-white" 
              : "data-[state=active]:bg-white data-[state=active]:text-zinc-900"
          )}
        >
          Friends
        </TabsTrigger>
      </TabsList>
      
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
