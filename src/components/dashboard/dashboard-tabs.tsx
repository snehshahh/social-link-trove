
import { Inbox, Star, LinkIcon, Folder, Plus, FileText, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { LinkCard } from "./link-card";
import { EmptyState } from "./empty-state";
import { Link } from "@/types/link";
import CollectionCard from "./collection-card";
import { useTheme } from "@/hooks/use-theme";
import { useState, useEffect } from "react";

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
  const { isDark } = useTheme();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

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

  // Tab configuration with all necessary data
  const tabConfig = [
    {
      id: "recents",
      label: "Recents",
      icon: Clock,
      content: filteredLinks,
      emptyIcon: <Inbox className="h-8 w-8 text-zinc-500" />,
      emptyTitle: "No links yet",
      emptyDescription: "Add your first link to get started",
      showAddButton: true
    },
    {
      id: "important",
      label: "Important",
      icon: Star,
      content: importantLinks,
      emptyIcon: <Star className="h-8 w-8 text-zinc-500" />,
      emptyTitle: "No important links",
      emptyDescription: "Mark links as important to see them here",
      showAddButton: false
    },
    {
      id: "all",
      label: "All Links",
      icon: LinkIcon,
      content: filteredLinks,
      emptyIcon: <LinkIcon className="h-8 w-8 text-zinc-500" />,
      emptyTitle: "No links found",
      emptyDescription: searchQuery ? "Try a different search term" : "Add your first link to get started",
      showAddButton: true
    },
    {
      id: "collections",
      label: "Collections",
      icon: Folder,
      isSpecial: true // Special handling for collections tab
    }
  ];

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <div className={`p-1 ${isDark ? 'bg-zinc-900/20' : 'bg-white/80'} backdrop-blur-md rounded-xl border ${isDark ? 'border-zinc-800/50' : 'border-zinc-200/70'} mb-6`}>
        <TabsList className="w-full h-auto p-1 bg-transparent flex items-center gap-1">
          {tabConfig.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={`relative flex-1 py-3 px-6 rounded-lg transition-all duration-300 ${
                activeTab === tab.id 
                  ? isDark
                    ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 text-white shadow-lg shadow-black/20'
                    : 'bg-gradient-to-br from-white to-zinc-50 text-zinc-900 shadow-md shadow-zinc-300/30'
                  : isDark
                    ? 'text-zinc-400 hover:text-zinc-300'
                    : 'text-zinc-600 hover:text-zinc-800'
              } ${
                hoveredTab === tab.id && activeTab !== tab.id
                  ? isDark
                    ? 'bg-zinc-800/30'
                    : 'bg-zinc-100/80'
                  : ''
              } data-[state=active]:scale-100 data-[state=active]:translate-y-0 data-[state=inactive]:translate-y-0`}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <div className="flex items-center justify-center gap-2">
                <tab.icon className={`h-4 w-4 ${
                  activeTab === tab.id 
                    ? isDark
                      ? 'text-yellow-400'
                      : 'text-blue-500'
                    : ''
                }`} />
                <span className="font-medium">{tab.label}</span>
              </div>
              
              {/* Animated highlight for active tab */}
              {activeTab === tab.id && (
                <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full ${
                  isDark ? 'bg-yellow-400/70' : 'bg-blue-500/70'
                }`}></div>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className="mt-6">
        {tabConfig.filter(tab => !tab.isSpecial).map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-6">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-4">
                {tab.content && tab.content.length > 0 ? (
                  tab.content.map(link => (
                    <LinkCard
                      key={link.id}
                      link={link}
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={tab.emptyIcon}
                    title={tab.emptyTitle}
                    description={tab.emptyDescription}
                    action={tab.showAddButton ? (
                      <Button className={isDark ? 
                        "bg-zinc-800 text-zinc-200 hover:bg-zinc-700" : 
                        "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
                      }>
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Add Link
                      </Button>
                    ) : undefined}
                    className={isDark ? "bg-zinc-900/50 border border-zinc-800" : "bg-white/50 border border-zinc-200"}
                  />
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}

        <TabsContent value="collections">
          <div className="mb-6">
            <div className={`flex justify-between items-center ${isDark ? 'bg-zinc-900/30' : 'bg-white/30'} backdrop-blur-sm p-4 rounded-lg border ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <div className="flex items-center">
                <Folder className={`h-5 w-5 mr-2 ${isDark ? 'text-yellow-400' : 'text-blue-500'}`} />
                <h2 className={`text-lg font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                  Your Collections
                </h2>
                <span className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full ${
                  isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-600'
                }`}>
                  {collections.length}
                </span>
              </div>
              <Button className={`rounded-full px-4 ${isDark ? 
                "bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-200 hover:from-zinc-700 hover:to-zinc-800 border border-zinc-700" : 
                "bg-gradient-to-br from-white to-zinc-50 text-zinc-900 hover:from-zinc-50 hover:to-zinc-100 border border-zinc-200"
              }`}>
                <Plus className="h-4 w-4 mr-2" />
                New Collection
              </Button>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collections.map(collection => (
              <CollectionCard
                key={collection.id}
                {...collection}
              />
            ))}
            {collections.length === 0 && (
              <div className={`col-span-full flex flex-col items-center justify-center p-12 rounded-lg ${
                isDark ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-white/50 border border-zinc-200'
              }`}>
                <Folder className={`h-12 w-12 ${isDark ? 'text-zinc-700' : 'text-zinc-300'} mb-4`} />
                <h3 className={`text-xl font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'} mb-2`}>No collections yet</h3>
                <p className={`text-center mb-6 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Create your first collection to organize your links
                </p>
                <Button className={`${isDark ? 
                  "bg-zinc-800 text-zinc-200 hover:bg-zinc-700" : 
                  "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
                }`}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Collection
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
