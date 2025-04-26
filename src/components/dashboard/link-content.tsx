
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface LinkContentProps {
  url: string;
  title: string;
  description?: string;
  notes?: string;
  isEditing: boolean;
  editedNotes: string;
  showFullDescription: boolean;
  onShowMoreDescription: () => void;
  onEditNotesChange: (value: string) => void;
}

export function LinkContent({
  url,
  title,
  description,
  notes,
  isEditing,
  editedNotes,
  showFullDescription,
  onShowMoreDescription,
  onEditNotesChange,
}: LinkContentProps) {
  const truncateDescription = (text?: string, limit = 150) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  return (
    <>
      <CardTitle className="text-xl font-medium pt-2 text-balance text-white">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          {title}
        </a>
      </CardTitle>
      <CardDescription className="text-base mt-2 text-white/70">
        {showFullDescription || !description || description.length <= 150 
          ? description 
          : (
            <>
              {truncateDescription(description)}
              <button 
                onClick={onShowMoreDescription} 
                className="text-yellow-400 font-medium ml-1 hover:underline"
              >
                Show more
              </button>
            </>
          )}
      </CardDescription>
      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={editedNotes}
            onChange={(e) => onEditNotesChange(e.target.value)}
            placeholder="Add your notes here..."
            className="min-h-[100px] transition-all bg-zinc-950 border-white/10 text-white focus:border-white/20"
          />
        </div>
      ) : (
        notes && (
          <div className="bg-zinc-950 p-3 rounded-lg text-sm">
            <p className="text-white/50 font-medium text-xs uppercase mb-1">Notes</p>
            <p className="text-balance text-white/90">{notes}</p>
          </div>
        )
      )}
    </>
  );
}
