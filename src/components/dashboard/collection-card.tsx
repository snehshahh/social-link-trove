
import { useState } from "react";
import { BookOpen, Edit2, Trash2, Save, X, Link2, Copy, ExternalLink, Share2, Link, Globe, Lock } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export interface CollectionCardProps {
  id: string;
  name: string;
  description?: string;
  linkCount: number;
  dateCreated: string;
  isPublic?: boolean;
  onEdit?: (id: string, name: string) => void;
  onDelete?: (id: string) => void;
  onShare?: (id: string) => void;
  onClick?: (id: string) => void;
}

export function CollectionCard({
  id,
  name,
  description,
  linkCount,
  dateCreated,
  isPublic = false,
  onEdit,
  onDelete,
  onShare,
  onClick,
}: CollectionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { isDark } = useTheme();

  // Format the date
  const formattedDate = new Date(dateCreated).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleEditName = async () => {
    if (editedName.trim() === "") {
      toast.error("Collection name cannot be empty");
      return;
    }

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      onEdit?.(id, editedName);
      setIsEditing(false);
      toast.success("Collection renamed successfully");
    } catch (error) {
      toast.error("Failed to rename collection");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    onShare?.(id);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Get the hosting URL from env or fallback to current origin
    const hostingUrl = process.env.HOSTING_URL || window.location.origin;
    const shareUrl = `${hostingUrl}/shared-collection/${id}`;
    
    navigator.clipboard.writeText(shareUrl);
    toast.success("Collection link copied to clipboard");
  };

  const handleDelete = () => {
    if (showConfirmDelete) {
      onDelete?.(id);
      toast.success("Collection deleted");
      setShowConfirmDelete(false);
    } else {
      setShowConfirmDelete(true);
    }
  };

  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmDelete(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if the click was not on a button or input
    if (
      !(e.target as HTMLElement).closest('button') &&
      !(e.target as HTMLElement).closest('input') &&
      !(e.target as HTMLElement).closest('textarea')
    ) {
      onClick?.(id);
    }
  };

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer",
        isDark 
          ? "bg-gradient-to-br from-black to-zinc-950 border border-white/10 hover:border-white/20" 
          : "bg-gradient-to-br from-white to-zinc-50 border border-zinc-200 hover:border-zinc-300"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isEditing) setShowConfirmDelete(false);
      }}
      onClick={handleCardClick}
    >
      {/* Animated accent bar */}
      <div className={cn(
        "absolute top-0 left-0 w-full h-1 transform transition-transform duration-700 group-hover:scale-110",
        isDark
          ? "bg-gradient-to-r from-yellow-400/10 via-yellow-400/50 to-yellow-400/10"
          : "bg-gradient-to-r from-blue-400/10 via-blue-400/50 to-blue-400/10"
      )}></div>
      
      {/* Public/Private indicator */}
      <div className={cn(
        "absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-full transition-all duration-300",
        isDark 
          ? isPublic 
            ? "bg-yellow-400/20 text-yellow-200" 
            : "bg-zinc-800/80 text-white/70"
          : isPublic 
            ? "bg-blue-500/20 text-blue-700" 
            : "bg-zinc-100 text-zinc-600"
      )}>
        {isPublic ? (
          <>
            <Globe className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">Public</span>
          </>
        ) : (
          <>
            <Lock className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">Private</span>
          </>
        )}
      </div>
      
      {/* Collection icon with pulse effect */}
      <div className={cn(
        "absolute top-4 left-4 flex items-center justify-center size-10 rounded-full transition-all duration-500",
        isDark
          ? "bg-black/50 backdrop-blur border border-white/10 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/20"
          : "bg-white/50 backdrop-blur border border-zinc-200 group-hover:bg-blue-500/10 group-hover:border-blue-500/20"
      )}>
        <BookOpen className={cn(
          "h-5 w-5 transition-all duration-500",
          isDark
            ? "text-yellow-400 group-hover:text-yellow-300"
            : "text-blue-500 group-hover:text-blue-400"
        )} />
        {isHovered && (
          <span className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-20",
            isDark ? "bg-yellow-400" : "bg-blue-400"
          )}></span>
        )}
      </div>
      
      {/* Header */}
      <div className="p-5 pt-16 pb-3">
        {isEditing ? (
          <div className="space-y-3 pt-1">
            <input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Collection name"
              className={cn(
                "w-full p-2 rounded-md transition-all",
                isDark
                  ? "bg-black/50 border border-white/10 text-white focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                  : "bg-white border border-zinc-200 text-zinc-800 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
              )}
              autoFocus
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Collection description (optional)"
              rows={3}
              className={cn(
                "w-full p-2 rounded-md transition-all resize-none",
                isDark
                  ? "bg-black/50 border border-white/10 text-white focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                  : "bg-white border border-zinc-200 text-zinc-800 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
              )}
            />
          </div>
        ) : (
          <>
            <h3 className={cn(
              "text-xl font-medium pt-1 pr-20 truncate",
              isDark
                ? "text-white group-hover:text-yellow-400"
                : "text-zinc-800 group-hover:text-blue-500",
              "transition-colors duration-300"
            )}>
              {name}
            </h3>
            
            {description && (
              <p className={cn(
                "mt-2 text-sm line-clamp-2",
                isDark ? "text-white/70" : "text-zinc-600"
              )}>
                {description}
              </p>
            )}
            
            <div className="flex items-center gap-2 mt-2">
              <span className={cn(
                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                isDark
                  ? "text-white/70 bg-black/50 border border-white/10"
                  : "text-zinc-700 bg-zinc-100 border border-zinc-200"
              )}>
                <Link2 className={cn(
                  "h-3 w-3 mr-1",
                  isDark ? "text-yellow-400" : "text-blue-500"
                )} />
                {linkCount} {linkCount === 1 ? "link" : "links"}
              </span>
            </div>
            
            <p className={cn(
              "text-sm mt-2",
              isDark ? "text-white/60" : "text-zinc-500"
            )}>
              Created on {formattedDate}
            </p>
          </>
        )}
      </div>
      
      {/* Action footer with hover reveal */}
      <div className={cn(
        "px-5 py-4 border-t backdrop-blur-sm",
        isDark
          ? "border-white/10 bg-zinc-950/30"
          : "border-zinc-200 bg-zinc-50/50"
      )}>
        {showConfirmDelete ? (
          <div className="flex gap-2 justify-between items-center">
            <p className={cn(
              "text-sm",
              isDark ? "text-white/90" : "text-zinc-700"
            )}>
              Confirm delete?
            </p>
            <div className="flex gap-2">
              <button 
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm transition-colors",
                  isDark
                    ? "border border-white/10 bg-black text-white/90 hover:bg-white/5 hover:text-white"
                    : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                )}
                onClick={cancelDelete}
              >
                <X className="h-4 w-4" />
              </button>
              <button 
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm flex items-center transition-colors",
                  isDark
                    ? "bg-black border border-white/10 text-white/90 hover:bg-white/5 hover:text-white"
                    : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ) : isEditing ? (
          <div className="flex gap-2 justify-end">
            <button 
              className={cn(
                "px-3 py-1.5 rounded-md text-sm flex items-center transition-colors",
                isDark
                  ? "bg-black border border-white/10 text-white/90 hover:bg-white/5 hover:text-white"
                  : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(false);
                setEditedName(name);
                setEditedDescription(description || "");
              }}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </button>
            <button 
              className={cn(
                "px-3 py-1.5 rounded-md text-sm flex items-center transition-colors",
                isDark
                  ? "bg-black border border-white/10 text-white/90 hover:bg-white/5 hover:text-white"
                  : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleEditName();
              }} 
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center">
                  <svg className={cn(
                    "animate-spin -ml-1 mr-2 h-4 w-4",
                    isDark ? "text-yellow-400" : "text-blue-500"
                  )} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving
                </span>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <button 
              className={cn(
                "p-2 rounded-full transition-colors",
                isDark
                  ? "text-white/70 hover:text-yellow-400 hover:bg-white/5"
                  : "text-zinc-500 hover:text-blue-500 hover:bg-zinc-100"
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <Trash2 className="h-4 w-4" />
            </button>
            
            <div className="flex gap-2">
              <button 
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isDark
                    ? "text-white/70 hover:text-yellow-400 hover:bg-white/5"
                    : "text-zinc-500 hover:text-blue-500 hover:bg-zinc-100"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
              >
                <Edit2 className="h-4 w-4" />
              </button>
              
              <button 
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isDark
                    ? "text-white/70 hover:text-yellow-400 hover:bg-white/5"
                    : "text-zinc-500 hover:text-blue-500 hover:bg-zinc-100"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyLink(e);
                }}
              >
                <Copy className="h-4 w-4" />
              </button>
              
              <button 
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isDark
                    ? "text-white/70 hover:text-yellow-400 hover:bg-white/5"
                    : "text-zinc-500 hover:text-blue-500 hover:bg-zinc-100"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
              >
                <Share2 className="h-4 w-4" />
              </button>
              
              <button 
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isDark
                    ? "text-white/70 hover:text-yellow-400 hover:bg-white/5"
                    : "text-zinc-500 hover:text-blue-500 hover:bg-zinc-100" 
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick?.(id);
                }}
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Interactive hover effects */}
      {isHovered && !isEditing && !showConfirmDelete && (
        <div className={cn(
          "absolute inset-0 pointer-events-none",
          isDark
            ? "bg-gradient-to-t from-yellow-400/5 to-transparent"
            : "bg-gradient-to-t from-blue-400/5 to-transparent"
        )}></div>
      )}
    </div>
  );
}
