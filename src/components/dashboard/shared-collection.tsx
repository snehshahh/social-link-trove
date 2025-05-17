
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, ArrowLeft, ThumbsUp, ThumbsDown, ExternalLink, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Collection } from "@/types/collection";

interface SharedCollectionProps {
  collection: Collection;
  links: any[]; // Replace with actual link type when available
  owner?: {
    name: string;
    avatar?: string;
  };
}

export function SharedCollection({ collection, links, owner }: SharedCollectionProps) {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  const handleVote = (type: 'up' | 'down') => {
    toast.success(`You ${type === 'up' ? 'upvoted' : 'downvoted'} this collection`);
    // Implement actual voting logic here
  };
  
  const formattedDate = new Date(collection.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Button 
          variant="outline" 
          className={cn(
            isDark 
              ? "text-white border-white/10 hover:bg-white/5" 
              : "text-zinc-700 border-zinc-200 hover:bg-zinc-50"
          )}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <Card className={cn(
        "overflow-hidden border",
        isDark 
          ? "bg-black border-white/10" 
          : "bg-white border-zinc-200"
      )}>
        <CardHeader className={cn(
          "border-b",
          isDark 
            ? "border-white/10" 
            : "border-zinc-200"
        )}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-3 rounded-lg", 
                isDark 
                  ? "bg-zinc-900 border border-white/10" 
                  : "bg-zinc-100 border border-zinc-200"
              )}>
                <FolderKanban className={cn(
                  "h-6 w-6", 
                  isDark ? "text-yellow-400" : "text-purple-500"
                )} />
              </div>
              
              <div>
                <h1 className={cn(
                  "text-xl font-bold",
                  isDark ? "text-white" : "text-zinc-900"
                )}>
                  {collection.name}
                </h1>
                
                {owner && (
                  <div className={cn(
                    "flex items-center gap-2 mt-1",
                    isDark 
                      ? "text-white/60" 
                      : "text-zinc-600"
                  )}>
                    <span className="text-sm">
                      Shared by {owner.name} • {formattedDate}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  isDark 
                    ? "text-green-400 border-white/10 hover:bg-white/5" 
                    : "text-green-600 border-zinc-200 hover:bg-zinc-50"
                )}
                onClick={() => handleVote('up')}
              >
                <ThumbsUp className="mr-1 h-4 w-4" />
                <span>{collection.upvote || 0}</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  isDark 
                    ? "text-red-400 border-white/10 hover:bg-white/5" 
                    : "text-red-600 border-zinc-200 hover:bg-zinc-50"
                )}
                onClick={() => handleVote('down')}
              >
                <ThumbsDown className="mr-1 h-4 w-4" />
                <span>{collection.downvote || 0}</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {collection.description && (
            <div className={cn(
              "mb-6 p-4 rounded-md",
              isDark 
                ? "bg-zinc-900 text-white/80" 
                : "bg-zinc-50 text-zinc-700"
            )}>
              <p>{collection.description}</p>
            </div>
          )}
          
          <h2 className={cn(
            "text-lg font-medium mb-4",
            isDark ? "text-white" : "text-zinc-800"
          )}>
            Links in this collection ({links.length})
          </h2>
          
          <div className="space-y-4">
            {links.map(link => (
              <div 
                key={link.id}
                className={cn(
                  "p-4 rounded-lg border",
                  isDark 
                    ? "bg-zinc-900/50 border-white/10 hover:bg-zinc-900" 
                    : "bg-zinc-50 border-zinc-200 hover:bg-zinc-100"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "mt-1 w-8 h-8 flex items-center justify-center rounded-md",
                      isDark ? "bg-black" : "bg-white border border-zinc-200"
                    )}>
                      {link.favicon ? (
                        <img src={link.favicon} alt="" className="w-4 h-4" />
                      ) : (
                        <Link className={cn(
                          "w-4 h-4",
                          isDark ? "text-white/70" : "text-zinc-500" 
                        )} />
                      )}
                    </div>
                    <div>
                      <h3 className={cn(
                        "font-medium",
                        isDark ? "text-white" : "text-zinc-800"
                      )}>
                        {link.title}
                      </h3>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={cn(
                          "text-sm block truncate max-w-[300px] sm:max-w-md",
                          isDark ? "text-blue-400" : "text-blue-600"
                        )}
                      >
                        {link.url}
                      </a>
                      
                      {link.description && (
                        <p className={cn(
                          "mt-2 text-sm",
                          isDark ? "text-white/70" : "text-zinc-600"
                        )}>
                          {link.description}
                        </p>
                      )}
                      
                      {link.tags && link.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {link.tags.map(tag => (
                            <Badge 
                              key={tag} 
                              variant="outline"
                              className={cn(
                                "text-xs",
                                isDark 
                                  ? "bg-black/50 border-white/10 text-white/70" 
                                  : "bg-zinc-100/50 border-zinc-200 text-zinc-700"
                              )}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                      isDark ? "text-white/70" : "text-zinc-500"
                    )}
                    onClick={() => window.open(link.url, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {links.length === 0 && (
              <div className={cn(
                "p-8 text-center rounded-lg border",
                isDark 
                  ? "bg-zinc-900/50 border-white/10 text-white/60" 
                  : "bg-zinc-50 border-zinc-200 text-zinc-500"
              )}>
                This collection doesn't have any links yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
