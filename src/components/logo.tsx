
import React from 'react';
import { Link } from '@/components/ui/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <Link 
      href="/" 
      className={cn("font-semibold tracking-tight no-underline transition-all", 
        sizeClasses[size],
        className
      )}
    >
      <span className="mr-1">linker's db</span>
    </Link>
  );
}
