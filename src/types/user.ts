export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  friends: User[];
  profile_picture: string | null;
  bio: string | null;
  created_at: Date;
  updated_at: Date;
}
