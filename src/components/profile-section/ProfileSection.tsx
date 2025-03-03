import React from "react";
import { Profile } from "@/types/common";

interface ProfileSectionProps {
  profile: Profile;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  return (
    <div className="text-center mb-8">
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 p-1 mx-auto">
        <div className="w-full h-full rounded-full bg-white overflow-hidden">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <h2 className="text-xl font-semibold mt-4">{profile.name}</h2>
      <p className="text-gray-600">{profile.bio}</p>
    </div>
  );
};

export default ProfileSection;
