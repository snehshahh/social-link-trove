
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { MainSidebar } from "@/components/main-sidebar";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Profile() {
  return (
    <div className="min-h-screen bg-black text-white font-poppins">
      <Helmet>
        <title>My Profile | Linker's DB</title>
      </Helmet>
      
      <SidebarProvider>
        <div className="flex h-screen">
          <MainSidebar />
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 py-8">
              <ProfileHeader />
              <ProfileTabs />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
