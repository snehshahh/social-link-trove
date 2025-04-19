
import { useState } from "react";
import { Link as LinkIcon, BookmarkPlus, Inbox, Star, Folder, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LinkCard } from "@/components/dashboard/link-card";
import { CollectionCard } from "@/components/dashboard/collection-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { CollectionDialog } from "@/components/dashboard/collection-dialog";

// Temporary mock data
const mockLinks = [
  {
    id: "1",
    url: "https://example.com/article",
    title: "Interesting Article About Web Development",
    description: "A comprehensive guide to modern web development practices and techniques. Learn about the latest trends in frontend and backend development.",
    notes: "Great resource for learning about modern web dev practices. Should review the section about React hooks.",
    favicon: "https://example.com/favicon.ico",
    isImportant: true,
    isPublic: true,
    dateAdded: "2024-02-15T10:30:00Z",
  },
  {
    id: "2",
    url: "https://example.com/tutorial",
    title: "Step by Step Tutorial: Building a Full Stack App",
    description: "Learn how to build a complete web application from scratch using React, Node.js, and MongoDB.",
    favicon: "https://example.com/favicon.ico",
    isPublic: false,
    dateAdded: "2024-02-14T15:45:00Z",
  },
  // Add more mock links as needed
];

const mockCollections = [
  {
    id: "1",
    name: "Web Development",
    linkCount: 5,
    dateCreated: "2024-02-01T09:00:00Z",
  },
  {
    id: "2",
    name: "Design Inspiration",
    linkCount: 3,
    dateCreated: "2024-02-10T14:20:00Z",
  },
  // Add more mock collections as needed
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("recents");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCollectionDialog, setShowCollectionDialog] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [links, setLinks] = useState(mockLinks);

  // Mock handlers - Replace with actual implementations
  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
    console.log("Delete link:", id);
  };

  const handleToggleImportant = (id: string, important: boolean) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, isImportant: important } : link
    ));
    console.log("Toggle important:", id, important);
  };

  const handleTogglePublic = (id: string, isPublic: boolean) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, isPublic } : link
    ));
    console.log("Toggle public:", id, isPublic);
  };

  const handleShareLink = (id: string) => {
    const link = links.find(link => link.id === id);
    if (link && link.isPublic) {
      console.log("Share link:", id);
    }
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, notes } : link
    ));
    console.log("Update notes:", id, notes);
  };

  const handleSaveToCollection = (id: string) => {
    setSelectedLinkId(id);
    setShowCollectionDialog(true);
  };

  const handleAddToCollection = (linkId: string, collectionId: string) => {
    console.log("Add to collection:", { linkId, collectionId });
  };

  const handleCreateCollection = async (name: string) => {
    console.log("Create collection:", name);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "new-collection-id";
  };

  // Filter links based on search query
  const filteredLinks = links.filter(link => 
    link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.notes?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter important links
  const importantLinks = filteredLinks.filter(link => link.isImportant);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center">
          <p className="text-2xl font-bold mx-3 font-poppins">linker'sdb</p>
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                placeholder="Search links..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 bg-zinc-950 border-white/10 text-white/90 focus:border-white/20"
              />
            </div>
            <Button className="bg-white border border-white/20 text-black hover:bg-black hover:text-white">
              <LinkIcon className="h-4 w-4 mr-1" />
              Add Link
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-6 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="text-white">
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
                        onDelete={handleDeleteLink}
                        onToggleImportant={handleToggleImportant}
                        onTogglePublic={handleTogglePublic}
                        onShare={handleShareLink}
                        onUpdateNotes={handleUpdateNotes}
                        onSaveToCollection={handleSaveToCollection}
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
                        onDelete={handleDeleteLink}
                        onToggleImportant={handleToggleImportant}
                        onTogglePublic={handleTogglePublic}
                        onShare={handleShareLink}
                        onUpdateNotes={handleUpdateNotes}
                        onSaveToCollection={handleSaveToCollection}
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
                        onDelete={handleDeleteLink}
                        onToggleImportant={handleToggleImportant}
                        onTogglePublic={handleTogglePublic}
                        onShare={handleShareLink}
                        onUpdateNotes={handleUpdateNotes}
                        onSaveToCollection={handleSaveToCollection}
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
                  <BookmarkPlus className="h-4 w-4 mr-1" />
                  New Collection
                </Button>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockCollections.map(collection => (
                  <CollectionCard
                    key={collection.id}
                    {...collection}
                  />
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </main>

      <CollectionDialog
        open={showCollectionDialog}
        onOpenChange={setShowCollectionDialog}
        linkId={selectedLinkId || ""}
        collections={mockCollections}
        onAddToCollection={handleAddToCollection}
        onCreateCollection={handleCreateCollection}
      />
    </div>
  );
}
