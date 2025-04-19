
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Folder, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNavigation() {
  const location = useLocation();
  
  const navItems = [
    {
      icon: Folder,
      label: "Links",
      href: "/dashboard",
      active: location.pathname === "/dashboard"
    },
    {
      icon: MessageSquare,
      label: "Messages",
      href: "/messages",
      active: location.pathname === "/messages"
    },
    {
      icon: User,
      label: "Profile",
      href: "/profile",
      active: location.pathname === "/profile"
    }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur border-t border-white/10">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link 
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full px-2",
              "transition-all duration-300 hover:scale-105",
              item.active ? "text-yellow-400" : "text-white/60 hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5 mb-1 transition-transform duration-300 hover:scale-110" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
