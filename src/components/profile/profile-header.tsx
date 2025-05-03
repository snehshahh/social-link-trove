
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";

export function ProfileHeader() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    username: "janedoe",
    email: "jane.doe@example.com",
    bio: "Digital content curator and research enthusiast. I collect and organize links about AI, design, and productivity.",
    avatarUrl: "/placeholder.svg"
  });
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({...profile});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully.");
  };

  const handleCancel = () => {
    setFormData({...profile});
    setIsEditing(false);
  };

  return (
    <Card className={`${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'} mb-8 transition-colors`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className={`w-32 h-32 border-2 ${isDark ? 'border-zinc-700' : 'border-zinc-200'}`}>
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback className={`text-2xl ${isDark ? 'bg-zinc-900 text-zinc-300' : 'bg-zinc-100 text-zinc-700'}`}>
                {profile.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            {!isEditing && (
              <Button 
                variant="outline" 
                className={`${isDark 
                  ? 'text-zinc-200 border-zinc-700 hover:bg-zinc-800' 
                  : 'text-zinc-700 border-zinc-200 hover:bg-zinc-50'} w-full`}
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
                    <label className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'} mb-1 block`}>Name</label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`${isDark 
                        ? 'bg-zinc-900 border-zinc-700 text-zinc-200' 
                        : 'bg-white border-zinc-200 text-zinc-800'}`}
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'} mb-1 block`}>Username</label>
                    <Input 
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`${isDark 
                        ? 'bg-zinc-900 border-zinc-700 text-zinc-200' 
                        : 'bg-white border-zinc-200 text-zinc-800'}`}
                    />
                  </div>
                </div>
                
                <div>
                  <label className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'} mb-1 block`}>Email</label>
                  <Input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${isDark 
                      ? 'bg-zinc-900 border-zinc-700 text-zinc-200' 
                      : 'bg-white border-zinc-200 text-zinc-800'}`}
                  />
                </div>
                
                <div>
                  <label className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'} mb-1 block`}>Bio</label>
                  <Textarea 
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className={`${isDark 
                      ? 'bg-zinc-900 border-zinc-700 text-zinc-200' 
                      : 'bg-white border-zinc-200 text-zinc-800'} min-h-[100px]`}
                  />
                </div>
                
                <div className="flex gap-2 justify-end">
                  <Button 
                    variant="outline" 
                    className={`${isDark 
                      ? 'text-zinc-200 border-zinc-700 hover:bg-zinc-800' 
                      : 'text-zinc-700 border-zinc-200 hover:bg-zinc-50'}`}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className={isDark 
                      ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
                      : 'bg-purple-500 text-white hover:bg-purple-600'}
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h1 className={`text-2xl font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-800'}`}>
                  {profile.name}
                </h1>
                <div className={`flex items-center ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  <span>@{profile.username}</span>
                  <span className="mx-2">•</span>
                  <span>{profile.email}</span>
                </div>
                <p className={`${isDark ? 'text-zinc-300' : 'text-zinc-600'} leading-relaxed`}>
                  {profile.bio}
                </p>
                
                <div className="flex gap-4 pt-2">
                  <div>
                    <span className={`${isDark ? 'text-zinc-100' : 'text-zinc-800'} font-semibold block`}>124</span>
                    <span className={`${isDark ? 'text-zinc-400' : 'text-zinc-500'} text-sm`}>Collections</span>
                  </div>
                  <div>
                    <span className={`${isDark ? 'text-zinc-100' : 'text-zinc-800'} font-semibold block`}>3,568</span>
                    <span className={`${isDark ? 'text-zinc-400' : 'text-zinc-500'} text-sm`}>Links</span>
                  </div>
                  <div>
                    <span className={`${isDark ? 'text-zinc-100' : 'text-zinc-800'} font-semibold block`}>48</span>
                    <span className={`${isDark ? 'text-zinc-400' : 'text-zinc-500'} text-sm`}>Friends</span>
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
