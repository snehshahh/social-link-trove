
import { useState } from "react";
import { BookOpen, Edit2, Trash2, Save, X, Link2, Copy, ExternalLink, Share2, Link } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";

export interface CollectionCardProps {
  id: string;
  name: string;
  linkCount: number;
  dateCreated: string;
  onEdit?: (id: string, name: string) => void;
  onDelete?: (id: string) => void;
  onShare?: (id: string, type: 'internal' | 'external') => void;
  onClick?: (id: string) => void;
}

export default function CollectionCard({
  id,
  name,
  linkCount,
  dateCreated,
  onEdit,
  onDelete,
  onShare,
  onClick,
}: CollectionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
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

  const handleShare = (type: 'internal' | 'external') => {
    onShare?.(id, type);
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

  const cancelDelete = (e) => {
    e.stopPropagation();
    setShowConfirmDelete(false);
  };

  const handleCardClick = (e) => {
    // Only navigate if the click was not on a button or input
    if (
      !(e.target.closest('button')) &&
      !(e.target.closest('input'))
    ) {
      onClick?.(id);
    }
  };

  return (
    <div 
      className={`group relative overflow-hidden rounded-xl ${
        isDark 
          ? "bg-gradient-to-br from-black to-zinc-950 border border-white/10 hover:border-white/20" 
          : "bg-gradient-to-br from-white to-zinc-50 border border-zinc-200 hover:border-zinc-300"
      } transition-all duration-300 hover:shadow-lg cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isEditing) setShowConfirmDelete(false);
      }}
      onClick={handleCardClick}
    >
      {/* Animated accent bar */}
      <div className={`absolute top-0 left-0 w-full h-1 ${
        isDark
          ? "bg-gradient-to-r from-yellow-400/10 via-yellow-400/50 to-yellow-400/10"
          : "bg-gradient-to-r from-blue-400/10 via-blue-400/50 to-blue-400/10"
      } transform transition-transform duration-700 group-hover:scale-110`}></div>
      
      {/* Collection icon with pulse effect */}
      <div className={`absolute top-4 right-4 flex items-center justify-center size-10 rounded-full ${
        isDark
          ? "bg-black/50 backdrop-blur border border-white/10 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/20"
          : "bg-white/50 backdrop-blur border border-zinc-200 group-hover:bg-blue-500/10 group-hover:border-blue-500/20"
      } transition-all duration-500`}>
        <BookOpen className={`h-5 w-5 ${
          isDark
            ? "text-yellow-400 group-hover:text-yellow-300"
            : "text-blue-500 group-hover:text-blue-400"
        } transition-all duration-500`} />
        {isHovered && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
            isDark ? "bg-yellow-400" : "bg-blue-400"
          } opacity-20`}></span>
        )}
      </div>
      
      {/* Header */}
      <div className="p-5 pb-3">
        {isEditing ? (
          <div className="pt-1 flex items-center gap-2">
            <input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Collection name"
              className={`w-full p-2 rounded-md transition-all ${
                isDark
                  ? "bg-black/50 border border-white/10 text-white focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                  : "bg-white border border-zinc-200 text-zinc-800 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
              }`}
              autoFocus
            />
          </div>
        ) : (
          <>
            <h3 className={`text-xl font-medium pt-1 pr-12 ${
              isDark
                ? "text-white group-hover:text-yellow-400"
                : "text-zinc-800 group-hover:text-blue-500"
              } transition-colors duration-300 truncate`}>
              {name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isDark
                  ? "text-white/70 bg-black/50 border border-white/10"
                  : "text-zinc-700 bg-zinc-100 border border-zinc-200"
              }`}>
                <Link2 className={`h-3 w-3 mr-1 ${isDark ? "text-yellow-400" : "text-blue-500"}`} />
                {linkCount} {linkCount === 1 ? "link" : "links"}
              </span>
            </div>
            <p className={`text-sm mt-2 ${isDark ? "text-white/60" : "text-zinc-500"}`}>
              Created on {formattedDate}
            </p>
            
            {/* Links preview grid */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {Array.from({ length: Math.min(6, linkCount) }).map((_, index) => (
                <div 
                  key={index}
                  className={`relative aspect-square rounded-lg ${
                    isDark
                      ? "bg-black/50 border border-white/10"
                      : "bg-zinc-100 border border-zinc-200"
                  } overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link2 className={`h-6 w-6 ${isDark ? "text-yellow-400" : "text-blue-500"}`} />
                  </div>
                </div>
              ))}
              {linkCount > 6 && (
                <div className={`relative col-span-3 aspect-square rounded-lg ${
                  isDark
                    ? "bg-black/50 border border-white/10"
                    : "bg-zinc-100 border border-zinc-200"
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-sm ${isDark ? "text-white/70" : "text-zinc-500"}`}>+{linkCount - 6} more</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      
      {/* Action footer with hover reveal */}
      <div className={`px-5 py-4 border-t ${
        isDark
          ? "border-white/10 bg-zinc-950/30"
          : "border-zinc-200 bg-zinc-50/50"
      } backdrop-blur-sm`}>
        {showConfirmDelete ? (
          <div className="flex gap-2 justify-between items-center">
            <p className={`text-sm ${isDark ? "text-white/90" : "text-zinc-700"}`}>Confirm delete?</p>
            <div className="flex gap-2">
              <button 
                className={`px-3 py-1.5 rounded-md text-sm ${
                  isDark
                    ? "border border-white/10 bg-black text-white/90 hover:bg-white/5 hover:text-white"
                    : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                } transition-colors`}
                onClick={cancelDelete}
              >
                <X className="h-4 w-4" />
              </button>
              <button 
                className={`px-3 py-1.5 rounded-md text-sm flex items-center ${
                  isDark
                    ? "bg-black border border-white/10 text-white/90 hover:bg-white/5 hover:text-white"
                    : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                } transition-colors`}
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
              className={`px-3 py-1.5 rounded-md text-sm flex items-center ${
                isDark
                  ? "bg-black border border-white/10 text-white/90 hover:bg-white/5 hover:text-white"
                  : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
              } transition-colors`}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(false);
                setEditedName(name);
              }}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </button>
            <button 
              className={`px-3 py-1.5 rounded-md text-sm flex items-center ${
                isDark
                  ? "bg-black border border-white/10 text-white/90 hover:bg-white/5 hover:text-white"
                  : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
              } transition-colors`}
              onClick={(e) => {
                e.stopPropagation();
                handleEditName();
              }} 
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center">
                  <svg className={`animate-spin -ml-1 mr-2 h-4 w-4 ${isDark ? "text-yellow-400" : "text-blue-500"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
              className={`p-2 rounded-full ${
                isDark
                  ? "text-white/70 hover:text-yellow-400 hover:bg-white/5"
                  : "text-zinc-500 hover:text-blue-500 hover:bg-zinc-100"
              } transition-colors`}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <Trash2 className="h-4 w-4" />
            </button>
            
            <div className="flex gap-2">
              <button 
                className={`p-2 rounded-full ${
                  isDark
                    ? "text-white/70 hover:text-yellow-400 hover:bg-white/5"
                    : "text-zinc-500 hover:text-blue-500 hover:bg-zinc-100"
                } transition-colors`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
              >
                <Edit2 className="h-4 w-4" />
              </button>
              
              <button 
                className={`p-2 rounded-full ${
                  isDark
                    ? "text-white/70 hover:text-yellow-400 hover:bg-white/5"
                    : "text-zinc-500 hover:text-blue-500 hover:bg-zinc-100"
                } transition-colors`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare('internal');
                }}
              >
                <Share2 className="h-4 w-4" />
              </button>
              
              <button 
                className={`p-2 rounded-full ${
                  isDark
                    ? "text-white/70 hover:text-yellow-400 hover:bg-white/5"
                    : "text-zinc-500 hover:text-blue-500 hover:bg-zinc-100" 
                } transition-colors`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare('external');
                }}
              >
                <Link className="h-4 w-4" />
              </button>
              
              <button 
                className={`p-2 rounded-full ${
                  isDark
                    ? "text-white/70 hover:text-yellow-400 hover:bg-white/5"
                    : "text-zinc-500 hover:text-blue-500 hover:bg-zinc-100"
                } transition-colors`}
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
        <div className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-t from-yellow-400/5 to-transparent"
            : "bg-gradient-to-t from-blue-400/5 to-transparent"
        } pointer-events-none`}></div>
      )}
      
      {/* Add a subtle animation when card is clicked */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
