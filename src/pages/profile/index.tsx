
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";

export default function Profile() {
  return (
    <div className="min-h-screen bg-black text-white font-poppins">
      <Helmet>
        <title>My Profile | Linker's DB</title>
      </Helmet>
      
      <main className="container mx-auto px-4 pb-16">
        <div className="py-8">
          <ProfileHeader />
          <ProfileTabs />
        </div>
      </main>
    </div>
  );
}
