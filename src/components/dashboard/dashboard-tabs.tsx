
import { Inbox, Star, LinkIcon, Folder, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LinkCard } from "./link-card";
import { CollectionCard } from "./collection-card";
import { EmptyState } from "./empty-state";
import { Button } from "@/components/ui/button";
import { Link } from "@/types/link";

interface Collection {
  id: string;
  name: string;
  linkCount: number;
  dateCreated: string;
}

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  filteredLinks: Link[];
  importantLinks: Link[];
  collections: Collection[];
  searchQuery?: string; // Added this prop
  onDeleteLink: (id: string) => void;
  onToggleImportant: (id: string, important: boolean) => void;
  onTogglePublic: (id: string, isPublic: boolean) => void;
  onShareLink: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onSaveToCollection: (id: string) => void;
}

export function DashboardTabs({
  activeTab,
  onTabChange,
  filteredLinks,
  importantLinks,
  collections,
  searchQuery = "", // Default value to prevent undefined
  onDeleteLink,
  onToggleImportant,
  onTogglePublic,
  onShareLink,
  onUpdateNotes,
  onSaveToCollection,
}: DashboardTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="text-white">
      <TabsList className="bg-zinc-950 border border-white/10">
        <TabsTrigger 
          value="recents" 
          className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm text-white/70"
        >
          <Inbox className="h-4 w-4 mr-1" />
          Recents
        </TabsTrigger>
        <TabsTrigger 
          value="important" 
          className="data-[state=active]:bg-black data-[state=active]:text-yellow-400 data-[state=active]:shadow-sm text-white/70"
        >
          <Star className="h-4 w-4 mr-1" />
          Important
        </TabsTrigger>
        <TabsTrigger 
          value="all" 
          className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm text-white/70"
        >
          <LinkIcon className="h-4 w-4 mr-1" />
          All
        </TabsTrigger>
        <TabsTrigger 
          value="collections" 
          className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm text-white/70"
        >
          <Folder className="h-4 w-4 mr-1" />
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
                    {...link}
                    onDelete={onDeleteLink}
                    onToggleImportant={onToggleImportant}
                    onTogglePublic={onTogglePublic}
                    onShare={onShareLink}
                    onUpdateNotes={onUpdateNotes}
                    onSaveToCollection={onSaveToCollection}
                  />
                ))
              ) : (
                <EmptyState
                  icon={<Inbox className="h-8 w-8 text-white/50" />}
                  title="No links yet"
                  description="Add your first link to get started"
                  action={
                    <Button className="bg-white border border-white/20 text-black hover:bg-black hover:text-white">
                      <LinkIcon className="h-4 w-4 mr-1" />
                      Add Link
                    </Button>
                  }
                  className="bg-zinc-950 border-white/10"
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
                    {...link}
                    onDelete={onDeleteLink}
                    onToggleImportant={onToggleImportant}
                    onTogglePublic={onTogglePublic}
                    onShare={onShareLink}
                    onUpdateNotes={onUpdateNotes}
                    onSaveToCollection={onSaveToCollection}
                  />
                ))
              ) : (
                <EmptyState
                  icon={<Star className="h-8 w-8 text-white/50" />}
                  title="No important links"
                  description="Mark links as important to see them here"
                  className="bg-zinc-950 border-white/10"
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
                    {...link}
                    onDelete={onDeleteLink}
                    onToggleImportant={onToggleImportant}
                    onTogglePublic={onTogglePublic}
                    onShare={onShareLink}
                    onUpdateNotes={onUpdateNotes}
                    onSaveToCollection={onSaveToCollection}
                  />
                ))
              ) : (
                <EmptyState
                  icon={<LinkIcon className="h-8 w-8 text-white/50" />}
                  title="No links found"
                  description={searchQuery ? "Try a different search term" : "Add your first link to get started"}
                  action={
                    <Button className="bg-white border border-white/20 text-black hover:bg-black hover:text-white">
                      <LinkIcon className="h-4 w-4 mr-1" />
                      Add Link
                    </Button>
                  }
                  className="bg-zinc-950 border-white/10"
                />
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="collections">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-white">Your Collections</h2>
            <Button className="bg-white border border-white/20 text-black hover:bg-black hover:text-white">
              <Plus className="h-4 w-4 mr-1" />
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
