export interface Link {
  id: number;
  title: string;
  url: string;
  category: string;
  bgColor: string;
  textColor: string;
  scheduledUntil?: string;
}

export interface Profile {
  name: string;
  bio: string;
  avatar: string;
}
