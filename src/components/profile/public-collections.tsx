
import React, { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FolderKanban, Link, Share } from "lucide-react";

interface Collection {
  id: string;
  title: string;
  description: string;
  linkCount: number;
  isPublic: boolean;
}

export function PublicCollections() {
  const [searchQuery, setSearchQuery] = useState("");
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: "1",
      title: "Design Resources",
      description: "A collection of useful design tools, tutorials, and inspiration",
      linkCount: 42,
      isPublic: true
    },
    {
      id: "2",
      title: "AI Research Papers",
      description: "Latest publications and breakthroughs in artificial intelligence",
      linkCount: 28,
      isPublic: true
    },
    {
      id: "3",
      title: "UX Case Studies",
      description: "Detailed analysis and breakdowns of excellent user experience design",
      linkCount: 15,
      isPublic: true
    }
  ]);

  const filteredCollections = collections.filter(collection => 
    collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CardContent className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Public Collections</h2>
          <Button
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10"
          >
            <FolderKanban className="mr-2 h-4 w-4" />
            Create Collection
          </Button>
        </div>
        
        <Input
          placeholder="Search collections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-zinc-950 border-white/10 text-white"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCollections.length > 0 ? (
            filteredCollections.map(collection => (
              <div 
                key={collection.id} 
                className="flex flex-col p-5 border border-white/10 rounded-md bg-zinc-950 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-black p-2 rounded-md">
                    <FolderKanban className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-medium text-white">{collection.title}</h3>
                </div>
                
                <p className="text-sm text-white/70 mb-4">{collection.description}</p>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-white/60" />
                    <span className="text-sm text-white/70">{collection.linkCount} links</span>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-white border-white/20 hover:bg-white/10"
                  >
                    <Share className="mr-2 h-3 w-3" />
                    Share
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-white/60 col-span-full">
              No collections found. Try adjusting your search.
            </div>
          )}
        </div>
      </div>
    </CardContent>
  );
}
