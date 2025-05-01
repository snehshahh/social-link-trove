import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Menu, X } from "lucide-react";

interface NavigationBarProps {
  onAuthClick?: () => void;
}

export function NavigationBar({ onAuthClick }: NavigationBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 md:py-4 px-3 md:px-4">
        <Logo size="md" className="text-white transition-transform hover:scale-105" />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <Link 
            to="#features" 
            className="text-white/80 hover:text-white px-3 py-2 transition-colors hover:bg-white/5 rounded-md"
          >
            Features
          </Link>
          <Link 
            to="#use-cases" 
            className="text-white/80 hover:text-white px-3 py-2 transition-colors hover:bg-white/5 rounded-md"
          >
            Use Cases
          </Link>
          <Link 
            to="#testimonials" 
            className="text-white/80 hover:text-white px-3 py-2 transition-colors hover:bg-white/5 rounded-md"
          >
            Testimonials
          </Link>
          <Link 
            to="#faq" 
            className="text-white/80 hover:text-white px-3 py-2 transition-colors hover:bg-white/5 rounded-md"
          >
            FAQ
          </Link>
        </nav>
        
        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-black transition-colors shadow-sm hover:shadow-white/20"
            onClick={onAuthClick}
          >
            Sign In
          </Button>
          <Button 
            className="bg-white text-black hover:bg-white/90 transition-colors shadow-sm hover:shadow-white/20"
            onClick={onAuthClick}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <button 
          className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 animate-in slide-in-from-top duration-300">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            <Link 
              to="#features" 
              className="text-white/80 hover:text-white py-3 px-2 transition-colors rounded-md hover:bg-white/5 block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="#use-cases" 
              className="text-white/80 hover:text-white py-3 px-2 transition-colors rounded-md hover:bg-white/5 block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Use Cases
            </Link>
            <Link 
              to="#testimonials" 
              className="text-white/80 hover:text-white py-3 px-2 transition-colors rounded-md hover:bg-white/5 block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              to="#faq" 
              className="text-white/80 hover:text-white py-3 px-2 transition-colors rounded-md hover:bg-white/5 block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4 mt-2 border-t border-white/10">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black w-full transition-colors shadow-sm hover:shadow-white/20"
                onClick={() => {
                  onAuthClick && onAuthClick();
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign In
              </Button>
              
              <Button 
                className="bg-white text-black hover:bg-white/90 w-full transition-colors shadow-sm hover:shadow-white/20"
                onClick={() => {
                  onAuthClick && onAuthClick();
                  setIsMobileMenuOpen(false);
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
