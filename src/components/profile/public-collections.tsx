
import React, { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderKanban, Link, Share, Copy, ExternalLink, Star } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

interface CollectionLink {
  id: string;
  title: string;
  url: string;
  favicon: string;
}

interface Collection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  links: CollectionLink[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  starCount: number;
}

export function PublicCollections() {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDark } = useTheme();
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: "1",
      title: "Design Resources",
      description: "A collection of useful design tools, tutorials, and inspiration",
      tags: ["design", "ui", "ux"],
      links: [
        {
          id: "link-1",
          title: "Figma Design System",
          url: "https://www.figma.com/design-systems",
          favicon: "https://www.figma.com/favicon.ico"
        },
        {
          id: "link-2", 
          title: "Dribbble Inspiration",
          url: "https://dribbble.com/shots/popular",
          favicon: "https://cdn.dribbble.com/assets/favicon-b38525134603b9513174ec887944bde1a869eb6cd414f4d640ee48ab2a15a26b.ico"
        },
        {
          id: "link-3",
          title: "UI Design Patterns",
          url: "https://ui-patterns.com/",
          favicon: "https://ui-patterns.com/favicon.ico"
        }
      ],
      isPublic: true,
      createdAt: "2023-10-15T10:30:00Z",
      updatedAt: "2023-11-20T14:45:00Z",
      starCount: 42
    },
    {
      id: "2",
      title: "AI Research Papers",
      description: "Latest publications and breakthroughs in artificial intelligence",
      tags: ["ai", "research", "machine learning"],
      links: [
        {
          id: "link-4",
          title: "Attention Is All You Need",
          url: "https://arxiv.org/abs/1706.03762",
          favicon: "https://static.arxiv.org/static/browse/0.3.4/images/icons/favicon.ico"
        },
        {
          id: "link-5",
          title: "GPT-4 Technical Report",
          url: "https://arxiv.org/abs/2303.08774",
          favicon: "https://static.arxiv.org/static/browse/0.3.4/images/icons/favicon.ico"
        }
      ],
      isPublic: true,
      createdAt: "2023-09-05T08:15:00Z",
      updatedAt: "2023-12-12T11:20:00Z",
      starCount: 28
    },
    {
      id: "3",
      title: "UX Case Studies",
      description: "Detailed analysis and breakdowns of excellent user experience design",
      tags: ["ux", "case study", "design"],
      links: [
        {
          id: "link-6",
          title: "Redesigning Airbnb's UX",
          url: "https://medium.com/@design/redesigning-airbnbs-ux",
          favicon: "https://miro.medium.com/1*m-R_BkNf1Qjr1YbyOIJY2w.png"
        }
      ],
      isPublic: true,
      createdAt: "2024-01-10T15:45:00Z",
      updatedAt: "2024-02-28T09:30:00Z",
      starCount: 15
    }
  ]);

  const filteredCollections = collections.filter(collection => 
    collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopyLink = (id: string) => {
    const shareUrl = `${window.location.origin}/shared-collection/${id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Collection link copied to clipboard");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <CardContent className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-zinc-800")}>Public Collections</h2>
          <Button
            variant="outline"
            className={cn(
              isDark 
                ? "text-white border-white/20 hover:bg-white/10" 
                : "text-zinc-800 border-zinc-300 hover:bg-zinc-100"
            )}
          >
            <FolderKanban className="mr-2 h-4 w-4" />
            Create Collection
          </Button>
        </div>
        
        <Input
          placeholder="Search collections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn(
            isDark 
              ? "bg-zinc-950 border-white/10 text-white" 
              : "bg-white border-zinc-200 text-zinc-800"
          )}
        />
        
        <div className="grid grid-cols-1 gap-6">
          {filteredCollections.length > 0 ? (
            filteredCollections.map(collection => (
              <div 
                key={collection.id} 
                className={cn(
                  "rounded-xl overflow-hidden transition-all duration-300",
                  isDark 
                    ? "bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:border-white/20" 
                    : "bg-gradient-to-br from-white to-zinc-50 border border-zinc-200 hover:border-zinc-300 shadow-sm hover:shadow-md"
                )}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-3 rounded-lg", 
                        isDark 
                          ? "bg-black/50 border border-white/10" 
                          : "bg-zinc-100 border border-zinc-200"
                      )}>
                        <FolderKanban className={cn(
                          "h-6 w-6", 
                          isDark ? "text-yellow-400" : "text-purple-500"
                        )} />
                      </div>
                      <div>
                        <h3 className={cn(
                          "text-lg font-medium", 
                          isDark ? "text-white" : "text-zinc-800"
                        )}>
                          {collection.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className={cn(
                            "h-3.5 w-3.5", 
                            isDark ? "text-yellow-400" : "text-purple-500"
                          )} />
                          <span className={cn(
                            "text-sm", 
                            isDark ? "text-white/70" : "text-zinc-600"
                          )}>
                            {collection.starCount}
                          </span>
                          <span className={cn(
                            "text-sm", 
                            isDark ? "text-white/50" : "text-zinc-500"
                          )}>
                            • Updated {formatDate(collection.updatedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className={cn(
                          isDark 
                            ? "border-white/10 text-white hover:bg-white/10" 
                            : "border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                        )}
                        onClick={() => handleCopyLink(collection.id)}
                      >
                        <Copy className="mr-2 h-3.5 w-3.5" />
                        Copy Link
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className={cn(
                          isDark 
                            ? "border-white/10 text-white hover:bg-white/10" 
                            : "border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                        )}
                      >
                        <Share className="mr-2 h-3.5 w-3.5" />
                        Share
                      </Button>
                    </div>
                  </div>
                  
                  <p className={cn(
                    "mb-4 text-sm", 
                    isDark ? "text-white/70" : "text-zinc-600"
                  )}>
                    {collection.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {collection.tags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="outline"
                        className={cn(
                          isDark 
                            ? "bg-black text-white border-white/10" 
                            : "bg-zinc-50 text-zinc-700 border-zinc-200"
                        )}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className={cn(
                    "mt-4 p-4 rounded-lg", 
                    isDark 
                      ? "bg-black/50 border border-white/10" 
                      : "bg-white border border-zinc-200"
                  )}>
                    <h4 className={cn(
                      "text-sm font-medium mb-3", 
                      isDark ? "text-white/80" : "text-zinc-700"
                    )}>
                      Links in this collection ({collection.links.length})
                    </h4>
                    <div className="space-y-3">
                      {collection.links.map(link => (
                        <div 
                          key={link.id} 
                          className={cn(
                            "flex items-center justify-between p-3 rounded-md", 
                            isDark 
                              ? "bg-zinc-900 hover:bg-zinc-800" 
                              : "bg-zinc-50 hover:bg-zinc-100"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-8 h-8 flex items-center justify-center rounded", 
                              isDark ? "bg-black" : "bg-white"
                            )}>
                              {link.favicon ? (
                                <img 
                                  src={link.favicon} 
                                  alt={`${link.title} favicon`} 
                                  className="w-4 h-4" 
                                />
                              ) : (
                                <Link className={cn(
                                  "w-4 h-4", 
                                  isDark ? "text-white/70" : "text-zinc-500"
                                )} />
                              )}
                            </div>
                            <div>
                              <h5 className={cn(
                                "text-sm font-medium", 
                                isDark ? "text-white" : "text-zinc-800"
                              )}>
                                {link.title}
                              </h5>
                              <p className={cn(
                                "text-xs truncate max-w-[180px] sm:max-w-xs", 
                                isDark ? "text-white/60" : "text-zinc-500"
                              )}>
                                {link.url}
                              </p>
                            </div>
                          </div>
                          
                          <Button 
                            size="icon"
                            variant="ghost"
                            className={cn(
                              isDark 
                                ? "text-white/70 hover:text-white hover:bg-white/10" 
                                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200"
                            )}
                            onClick={() => {
                              window.open(link.url, "_blank");
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={cn(
              "text-center py-12 rounded-lg border",
              isDark 
                ? "text-white/60 bg-zinc-900/50 border-white/10" 
                : "text-zinc-500 bg-zinc-50 border-zinc-200"
            )}>
              No collections found. Try adjusting your search.
            </div>
          )}
        </div>
      </div>
    </CardContent>
  );
}
