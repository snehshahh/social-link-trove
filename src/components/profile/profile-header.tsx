
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export function ProfileHeader() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    username: "janedoe",
    email: "jane.doe@example.com",
    bio: "Digital content curator and research enthusiast. I collect and organize links about AI, design, and productivity.",
    avatarUrl: "/placeholder.svg"
  });

  const [formData, setFormData] = useState({...profile});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };

  const handleCancel = () => {
    setFormData({...profile});
    setIsEditing(false);
  };

  return (
    <Card className="bg-black border border-white/10 mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32 border-2 border-white/10">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback className="text-2xl bg-zinc-950">{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            {!isEditing && (
              <Button 
                variant="outline" 
                className="text-white border-white/20 hover:bg-white/10 w-full"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
          
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-white/70 mb-1 block">Name</label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-zinc-950 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-white/70 mb-1 block">Username</label>
                    <Input 
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="bg-zinc-950 border-white/10 text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-white/70 mb-1 block">Email</label>
                  <Input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-zinc-950 border-white/10 text-white"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-white/70 mb-1 block">Bio</label>
                  <Textarea 
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="bg-zinc-950 border-white/10 text-white min-h-[100px]"
                  />
                </div>
                
                <div className="flex gap-2 justify-end">
                  <Button 
                    variant="outline" 
                    className="text-white border-white/20 hover:bg-white/10"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-white text-black hover:bg-white/90"
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                <div className="flex items-center text-white/70">
                  <span>@{profile.username}</span>
                  <span className="mx-2">•</span>
                  <span>{profile.email}</span>
                </div>
                <p className="text-white/80 leading-relaxed">{profile.bio}</p>
                
                <div className="flex gap-4 pt-2">
                  <div>
                    <span className="text-white font-semibold block">124</span>
                    <span className="text-white/60 text-sm">Collections</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold block">3,568</span>
                    <span className="text-white/60 text-sm">Links</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold block">48</span>
                    <span className="text-white/60 text-sm">Friends</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
