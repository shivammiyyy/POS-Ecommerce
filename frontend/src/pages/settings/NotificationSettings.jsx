import React from "react";

const NotificationSettings = () => {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      <label className="flex items-center space-x-2">
        <input type="checkbox" defaultChecked className="h-4 w-4" />
        <span>Email Alerts</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" className="h-4 w-4" />
        <span>SMS Alerts</span>
      </label>
    </div>
  );
};

export default NotificationSettings;
