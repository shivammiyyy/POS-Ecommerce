import React from "react";

const ProfileCard = () => {
  const user = {
    name: "Shivam Jha",
    email: "shivam@example.com",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=3"
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
