import React from "react";
import AccountSettings from "./AccountSettings";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";

const SettingsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <AccountSettings />
      <NotificationSettings />
      <SecuritySettings />
    </div>
  );
};

export default SettingsPage;
