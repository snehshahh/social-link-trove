
import { useState } from "react";
import { Link } from "@/types/link";
import { Collection } from "@/types/collection";
import { SearchHeader } from "@/components/dashboard/search-header";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";
import { CollectionDialog } from "@/components/dashboard/collection-dialog";
import { Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PublicConfirmationDialog } from "@/components/ui/public-confirmation-dialog";
import { useDispatch, useSelector } from 'react-redux';
import { toggleImportant, togglePublic, deleteLink, setSelectedLink, removeFromCollection } from '@/store/slices/linksSlice';
import { setShowSharePopup, setShowPublicConfirmation } from '@/store/slices/uiSlice';
import { addCollection, addLinkToCollection, removeLinkFromCollection } from '@/store/slices/collectionsSlice';
import { BottomNavigation } from "@/components/bottom-navigation";
import { useTheme } from "@/hooks/use-theme";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("recents");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const links = useSelector((state: any) => state.links.links);
  const collections = useSelector((state: any) => state.collections.collections || []);
  const [showCollectionDialog, setShowCollectionDialog] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const { theme, isDark } = useTheme();

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
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#000000]' : 'bg-zinc-50'}`}>
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="container mx-auto py-6 pb-20 h-screen max-h-[calc(100vh-4rem)]">
        <div className="h-full">
          <div className="space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h1 className={`text-2xl font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Dashboard</h1>
            </div>

            <Separator className={isDark ? "bg-gray-800" : "bg-gray-200"} />

            <DashboardTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              links={links}
              collections={collections}
              searchQuery={searchQuery}
            />
          </div>
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
