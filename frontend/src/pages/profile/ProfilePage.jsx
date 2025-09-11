import React from "react";
import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";

const ProfilePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileCard />
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
