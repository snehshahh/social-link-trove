
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TermsAgreementProps {
  onAgreementChange: (agreed: boolean) => void;
  className?: string;
  error?: boolean;
}

export function TermsAgreement({ onAgreementChange, className, error }: TermsAgreementProps) {
  const [agreed, setAgreed] = useState(false);

  const handleChange = (checked: boolean | string) => {
    const isChecked = checked === true;
    setAgreed(isChecked);
    onAgreementChange(isChecked);
  };

  return (
    <div className={cn("space-y-2", className)}>
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
            "text-xs leading-tight text-white/70 font-normal cursor-pointer",
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
  );
}
