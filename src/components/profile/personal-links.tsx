
import React, { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Linkedin, Link, Share } from "lucide-react";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  category: string;
  isPublic: boolean;
}

export function PersonalLinks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [links, setLinks] = useState<LinkItem[]>([
    {
      id: "1",
      title: "Professional Design Portfolio",
      url: "https://www.linkedin.com/in/designportfolio",
      category: "Career",
      isPublic: true
    },
    {
      id: "2",
      title: "AI Research Publications",
      url: "https://www.linkedin.com/company/openai/",
      category: "Research",
      isPublic: false
    },
    {
      id: "3",
      title: "UX Design Conference",
      url: "https://www.linkedin.com/events/uxdesignconference2025",
      category: "Events",
      isPublic: true
    },
    {
      id: "4",
      title: "Digital Marketing Trends",
      url: "https://www.linkedin.com/pulse/marketing-trends-2025",
      category: "Marketing",
      isPublic: false
    },
    {
      id: "5",
      title: "Tech Industry Insights",
      url: "https://www.linkedin.com/company/microsoft/",
      category: "Industry",
      isPublic: true
    }
  ]);

  const handleTogglePublic = (id: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, isPublic: !link.isPublic } : link
    ));
  };

  const filteredLinks = links.filter(link => 
    link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CardContent className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">My LinkedIn Resources</h2>
          <Button
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10"
          >
            <Link className="mr-2 h-4 w-4" />
            Add New Link
          </Button>
        </div>
        
        <Input
          placeholder="Search links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-zinc-950 border-white/10 text-white"
        />
        
        <div className="space-y-4">
          {filteredLinks.length > 0 ? (
            filteredLinks.map(link => (
              <div 
                key={link.id} 
                className="flex items-center justify-between p-4 border border-white/10 rounded-md bg-zinc-950"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-black p-2 rounded-md">
                    <Linkedin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{link.title}</h3>
                    <p className="text-sm text-white/70 truncate max-w-xs md:max-w-md">
                      {link.url}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs px-2 py-0.5 bg-white/10 rounded text-white/80">
                        {link.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/70">Public</span>
                    <Switch 
                      checked={link.isPublic} 
                      onCheckedChange={() => handleTogglePublic(link.id)}
                      className="data-[state=checked]:bg-white"
                    />
                  </div>
                  
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    disabled={!link.isPublic}
                    className={!link.isPublic ? "opacity-50 cursor-not-allowed" : "text-white hover:bg-white/10"}
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-white/60">
              No links found. Try adjusting your search.
            </div>
          )}
        </div>
      </div>
    </CardContent>
  );
}
