import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Search, 
  BookmarkPlus, 
  Clock, 
  Star, 
  ListFilter, 
  FolderKanban,
  Settings,
  LogOut,
  Lock
} from 'lucide-react';
import { Logo } from '@/components/logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';

export function MainSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 bg-black">
        <Logo size="md" className="mx-auto" />
      </SidebarHeader>
      <SidebarSeparator className="bg-white/10" />
      <SidebarContent className="bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Home">
                  <Link to="/dashboard">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Explore (Coming Soon)">
                  <div className="cursor-not-allowed opacity-70">
                    <Search />
                    <span>Explore</span>
                    <Lock className="ml-auto h-4 w-4" />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70">Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Recents">
                  <Link to="/dashboard?tab=recents">
                    <Clock />
                    <span>Recents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Important">
                  <Link to="/dashboard?tab=important">
                    <Star />
                    <span>Important</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="All Links">
                  <Link to="/dashboard?tab=all">
                    <ListFilter />
                    <span>All Links</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Collections">
                  <Link to="/dashboard?tab=collections">
                    <FolderKanban />
                    <span>Collections</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="bg-black border-t border-white/10">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link to="#">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout">
                  <Link to="/">
                    <LogOut />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
