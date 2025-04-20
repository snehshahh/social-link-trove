
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TermsAgreementProps {
  onAgreementChange: (agreed: boolean) => void;
  className?: string;
  error?: boolean;
  show: boolean;
  onClose: () => void;
}

export function TermsAgreement({ onAgreementChange, className, error, show, onClose }: TermsAgreementProps) {
  const [agreed, setAgreed] = useState(false);

  const handleChange = (checked: boolean | string) => {
    const isChecked = checked === true;
    setAgreed(isChecked);
  };

  const handleAccept = () => {
    onAgreementChange(agreed);
    onClose();
  };

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Terms Agreement</DialogTitle>
          <DialogDescription className="text-white/70">
            Please read and accept our terms before continuing
          </DialogDescription>
        </DialogHeader>
        
        <div className={cn("space-y-4", className)}>
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreed}
              onCheckedChange={handleChange}
              className={cn(
                error ? "border-red-500" : "border-white/20"
              )}
            />
            <Label 
              htmlFor="terms" 
              className={cn(
                "text-sm leading-tight text-white/70 font-normal cursor-pointer",
                error ? "text-red-500" : ""
              )}
            >
              I acknowledge that Linker's DB is not responsible for porn, scam links, or pirated content. Links are saved by users and exist on the public internet. By making links public, I understand they can be shared with others.
            </Label>
          </div>
          
          {error && (
            <div className="flex items-center text-xs text-red-500">
              <AlertCircle className="h-3 w-3 mr-1" />
              You must agree to the terms to continue
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={handleAccept}
            disabled={!agreed}
            className="bg-white text-black hover:bg-black hover:text-white"
          >
            Accept and Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
