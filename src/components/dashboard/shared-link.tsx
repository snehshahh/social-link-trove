
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExternalLink, ArrowLeft, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/types/link";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SharedLinkProps {
  link: Link;
  owner?: {
    name: string;
    avatar?: string;
  };
}

export function SharedLink({ link, owner }: SharedLinkProps) {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  const handleVote = (type: 'up' | 'down') => {
    toast.success(`You ${type === 'up' ? 'upvoted' : 'downvoted'} this link`);
    // Implement actual voting logic here
  };
  
  const formattedDate = new Date(link.created_at).toLocaleDateString("en-US", {
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {owner && (
                <div className={cn(
                  "flex items-center gap-2",
                  isDark 
                    ? "text-white/80" 
                    : "text-zinc-700"
                )}>
                  <div className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-full",
                    isDark 
                      ? "bg-zinc-900" 
                      : "bg-zinc-100"
                  )}>
                    {owner.avatar ? (
                      <img src={owner.avatar} alt={owner.name} className="w-8 h-8 rounded-full" />
                    ) : (
                      <span className="text-sm">{owner.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="font-medium">Shared by {owner.name}</span>
                </div>
              )}
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
                <span>{link.upvote || 0}</span>
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
                <span>{link.downvote || 0}</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="mb-6">
            <h1 className={cn(
              "text-2xl font-bold mb-2",
              isDark ? "text-white" : "text-zinc-900"
            )}>
              {link.title}
            </h1>
            
            <div className="flex items-center gap-2 mb-4">
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-1 text-sm",
                  isDark ? "text-blue-400" : "text-blue-600"
                )}
              >
                {link.url}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            
            {link.description && (
              <div className={cn(
                "my-4 p-4 rounded-md",
                isDark 
                  ? "bg-zinc-900 text-white/80" 
                  : "bg-zinc-50 text-zinc-700"
              )}>
                <p>{link.description}</p>
              </div>
            )}
            
            {link.tags && link.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {link.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={cn(
                      "px-2 py-1 text-xs rounded-full",
                      isDark 
                        ? "bg-zinc-900 text-white/70 border border-white/10" 
                        : "bg-zinc-100 text-zinc-700 border border-zinc-200"
                    )}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className={cn(
            "w-full overflow-hidden rounded-lg border",
            isDark 
              ? "border-white/10" 
              : "border-zinc-200"
          )}>
            <iframe 
              src={link.url} 
              title={link.title || "Shared link"}
              className="w-full h-[600px]"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
          
          <div className={cn(
            "mt-6 text-sm",
            isDark ? "text-white/50" : "text-zinc-500"
          )}>
            Added on {formattedDate}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
