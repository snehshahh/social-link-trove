import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LinkContent } from "./link-content";
import { LinkCardActions } from "./link-card-actions";
import { LinkCardHeader } from "./link-card-header";
import { RootState } from '@/store';
import { setIsEditing, setEditedNotes, setIsSaving, setShowFullDescription, setIsPreviewOpen } from '@/store/slices/linkCardSlice';
import { Link } from '@/types/link';

interface LinkCardProps {
  link: Link;
}

export function LinkCard({
  link,
}: LinkCardProps) {
  const dispatch = useDispatch();
  const { isEditing, editedNotes, showFullDescription, isPreviewOpen } = useSelector((state: RootState) => state.linkCard);

  const handleTogglePreview = () => {
    dispatch(setIsPreviewOpen(!isPreviewOpen));
  };

  const handleShowMoreDescription = () => {
    dispatch(setShowFullDescription(!showFullDescription));
  };

  const handleEditNotesChange = (value: string) => {
    dispatch(setEditedNotes(value));
  };

  const formattedDate = new Date(link.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 group hover:shadow-md bg-black border border-white/10 hover:border-white/20", 
      link.bool_imp && "border-l-4 border-l-yellow-400",
      "animate-fade-in"
    )}>
      <CardHeader className="relative pb-3">
        <LinkCardHeader
          id={link.id}
          domain={new URL(link.url).hostname}
          bool_imp={link.bool_imp}
          isPublic={link.isPublic}
          isPreviewOpen={isPreviewOpen}
          favicon={`https://www.google.com/s2/favicons?domain=${link.url}`}
          onTogglePreview={handleTogglePreview}
        />
        <LinkContent
          link={link}
          isEditing={isEditing}
          editedNotes={editedNotes}
          showFullDescription={showFullDescription}
          onShowMoreDescription={handleShowMoreDescription}
          onEditNotesChange={handleEditNotesChange}
        />
      </CardHeader>
      
      {isPreviewOpen && (
        <div className="px-6 pb-4 -mt-2">
          <div className="w-full overflow-hidden rounded-lg border border-white/10">
            <iframe 
              src={link.url} 
              title={link.title}
              className="w-full h-[300px]"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}
      
      <CardContent>
        {/* Content is handled by LinkContent component */}
      </CardContent>

      <CardFooter className={cn(
        "flex flex-wrap items-center justify-between border-t border-white/10 pt-4 gap-2",
      )}>
        <div className="text-xs text-white/50">
          Added on {link.created_at}
        </div>
        <div className="flex flex-wrap gap-2">
          <LinkCardActions
            id={link.id}
            bool_imp={link.bool_imp}
            isPublic={link.isPublic}
            title={link.title || ""}
            onEdit={() => dispatch(setIsEditing(true))}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
