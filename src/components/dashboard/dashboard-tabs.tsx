import { Inbox, Star, LinkIcon, Folder, Plus, BookOpen, FolderPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { LinkCard } from "./link-card";
import { EmptyState } from "./empty-state";
import { Link } from "@/types/link";
import { Collection } from "@/types/collection";
import { useDispatch, useSelector } from 'react-redux';
import { toggleImportant, togglePublic, deleteLink } from '@/store/slices/linksSlice';
import { setShowSharePopup, setShowPublicConfirmation } from '@/store/slices/uiSlice';
import CollectionCard from "./collection-card";

interface CollectionInterface {
  id: string;
  name: string;
  linkCount: number;
  dateCreated: string;
}

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  links: Link[];
  collections: CollectionInterface[];
  searchQuery?: string;
}

export function DashboardTabs({
  activeTab,
  onTabChange,
  links = [],
  collections = [],
  searchQuery = "",
}: DashboardTabsProps) {

  // Add safety check to ensure links is an array before filtering
  const linksArray = Array.isArray(links) ? links : [];
  console.log('DashboardTabs received links:', linksArray);

  // If no links are provided, use some fallback data for development
  if (linksArray.length === 0) {
    console.log('No links provided, using fallback data');
  }

  const filteredLinks = linksArray.filter(link =>
    link?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const importantLinks = filteredLinks.filter(link => link.bool_imp);
 
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="bg-zinc-900/50 border border-zinc-800 w-full justify-start">
        <TabsTrigger
          value="recents"
          className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
        >
          <Inbox className="h-4 w-4 mr-2" />
          Recents
        </TabsTrigger>
        <TabsTrigger
          value="important"
          className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
        >
          <Star className="h-4 w-4 mr-2" />
          Important
        </TabsTrigger>
        <TabsTrigger
          value="all"
          className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
        >
          <LinkIcon className="h-4 w-4 mr-2" />
          All
        </TabsTrigger>
        <TabsTrigger
          value="collections"
          className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
        >
          <Folder className="h-4 w-4 mr-2" />
          Collections
        </TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="recents">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-4">
              {filteredLinks.length > 0 ? (
                filteredLinks.map(link => (
                  <LinkCard
                    key={link.id}
                    link={link}
                  />
                ))
              ) : (
                <EmptyState
                  icon={<Inbox className="h-8 w-8 text-zinc-500" />}
                  title="No links yet"
                  description="Add your first link to get started"
                  action={
                    <Button className="bg-zinc-200 text-zinc-900 hover:bg-zinc-300">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Add Link
                    </Button>
                  }
                />
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="important">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-4">
              {importantLinks.length > 0 ? (
                importantLinks.map(link => (
                  <LinkCard
                    key={link.id}
                    link={link}
                  />
                ))
              ) : (
                <EmptyState
                  icon={<Star className="h-8 w-8 text-zinc-500" />}
                  title="No important links"
                  description="Mark links as important to see them here"
                  className="bg-zinc-900/50 border border-zinc-800"
                />
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="all">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-4">
              {filteredLinks.length > 0 ? (
                filteredLinks.map(link => (
                  <LinkCard
                    key={link.id}
                    link={link}
                  />
                ))
              ) : (
                <EmptyState
                  icon={<LinkIcon className="h-8 w-8 text-zinc-500" />}
                  title="No links found"
                  description={searchQuery ? "Try a different search term" : "Add your first link to get started"}
                  action={
                    <Button className="bg-zinc-200 text-zinc-900 hover:bg-zinc-300">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Add Link
                    </Button>
                  }
                  className="bg-zinc-900/50 border border-zinc-800"
                />
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="collections">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-zinc-200">Your Collections</h2>
            <Button className="bg-zinc-200 text-zinc-900 hover:bg-zinc-300">
              <Plus className="h-4 w-4 mr-2" />
              New Collection
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collections.map(collection => (
              <CollectionCard
                key={collection.id}
                {...collection}
              />
            ))}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}