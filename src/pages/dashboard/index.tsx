import { useState } from "react";
import { Link } from "@/types/link";
import { Collection } from "@/types/collection";
import { SearchHeader } from "@/components/dashboard/search-header";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";
import { CollectionDialog } from "@/components/dashboard/collection-dialog";
import { MessageHistory } from "@/components/messages/message-history";
import { Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PublicConfirmationDialog } from "@/components/ui/public-confirmation-dialog";
import { useDispatch, useSelector } from 'react-redux';
import { toggleImportant, togglePublic, deleteLink, setSelectedLink, removeFromCollection } from '@/store/slices/linksSlice';
import { setShowSharePopup, setShowPublicConfirmation } from '@/store/slices/uiSlice';
import { addCollection, addLinkToCollection, removeLinkFromCollection } from '@/store/slices/collectionsSlice';
import { BottomNavigation } from "@/components/bottom-navigation";


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
  const dispatch = useDispatch();
  const links = useSelector((state: any) => state.links.links); // Access the links array from the links state object
  console.log('Dashboard links:', links); // Debug log to see what's being passed
  const collections = useSelector((state: any) => state.collections.collections || []);
  console.log('Dashboard collections:', collections); // Debug log for collections
  const [showCollectionDialog, setShowCollectionDialog] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleAddToCollection = (linkId: string, collectionId: string) => {
    dispatch(addLinkToCollection({ collectionId, linkId }));
  };

  const handleRemoveFromCollection = (collectionId: string, linkId: string) => {
    dispatch(removeLinkFromCollection({ collectionId, linkId }));
  };

  const handleCreateCollection = async (name: string) => {
    try {
      await dispatch(addCollection(name));
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  return (
    <div className={`min-h-screen bg-[#000000] transition-colors duration-300`}>
      <SearchHeader
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="container mx-auto py-6 pb-20 h-screen max-h-[calc(100vh-4rem)]">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          <div className="flex-1 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-200">Dashboard</h1>
            </div>

            <Separator className="bg-gray-800" />

            <DashboardTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              links={links}
              collections={collections}
              searchQuery={searchQuery}
            />
          </div>

          <aside className="lg:w-80 space-y-4 overflow-y-auto">
            <h2 className="text-lg font-medium text-gray-200">Recent Activity</h2>
            <MessageHistory />
          </aside>
        </div>
        <BottomNavigation />
      </main>

      <CollectionDialog
        open={showCollectionDialog}
        onOpenChange={setShowCollectionDialog}
        linkId={selectedLinkId || ""}
        collections={collections}
        onAddToCollection={handleAddToCollection}
        onRemoveFromCollection={handleRemoveFromCollection}
        onCreateCollection={handleCreateCollection}
      />
    </div>
  );
}
