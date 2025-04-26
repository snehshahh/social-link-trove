import { useState } from "react";
import { Link } from "@/types/link";
import { SearchHeader } from "@/components/dashboard/search-header";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";
import { CollectionDialog } from "@/components/dashboard/collection-dialog";
import { MessageHistory } from "@/components/messages/message-history";
import { Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
    notes: "",
    favicon: "https://example.com/favicon.ico",
    isImportant: false,
    isPublic: false,
    dateAdded: "2024-02-14T15:45:00Z",
  },
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
];

const mockMessages = [
  {
    id: "1",
    content: "Just added a new article about React hooks to my collection.",
    sender: "Alice Chen",
    timestamp: new Date(2024, 3, 25, 14, 30),
    avatar: "/avatars/alice.jpg"
  },
  {
    id: "2",
    content: "Found an interesting tutorial on TypeScript generics.",
    sender: "Bob Smith",
    timestamp: new Date(2024, 3, 25, 15, 45),
    avatar: "/avatars/bob.jpg"
  },
  {
    id: "3",
    content: "Shared my frontend development resources collection.",
    sender: "Carol White",
    timestamp: new Date(2024, 3, 25, 16, 20),
    avatar: "/avatars/carol.jpg"
  }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("recents");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCollectionDialog, setShowCollectionDialog] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [links, setLinks] = useState<Link[]>(mockLinks);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleToggleImportant = (id: string, important: boolean) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, isImportant: important } : link
    ));
  };

  const handleTogglePublic = (id: string, isPublic: boolean) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, isPublic } : link
    ));
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "new-collection-id";
  };

  const filteredLinks = links.filter(link => 
    link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.notes?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const importantLinks = filteredLinks.filter(link => link.isImportant);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-950' : 'bg-zinc-50'} transition-colors duration-300`}>
      <SearchHeader
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="container py-6 pb-20 grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-zinc-200">Dashboard</h1>
            <Button 
              variant="outline" 
              size="sm"
              className="text-zinc-400 border-zinc-800 hover:bg-zinc-900"
            >
              <Grid className="h-4 w-4 mr-2" />
              View Options
            </Button>
          </div>
          
          <Separator className="bg-zinc-800" />
          
          <DashboardTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            filteredLinks={filteredLinks}
            importantLinks={importantLinks}
            collections={mockCollections}
            searchQuery={searchQuery}
            onDeleteLink={handleDeleteLink}
            onToggleImportant={handleToggleImportant}
            onTogglePublic={handleTogglePublic}
            onShareLink={handleShareLink}
            onUpdateNotes={handleUpdateNotes}
            onSaveToCollection={handleSaveToCollection}
          />
        </div>

        <aside>
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-zinc-200">Recent Activity</h2>
            <MessageHistory messages={mockMessages} />
          </div>
        </aside>
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
