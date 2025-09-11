import React, { useState } from "react";

const ProfileForm = () => {
  const [form, setForm] = useState({
    name: "Shivam Jha",
    email: "shivam@example.com",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-xl p-6 space-y-4"
    >
      <h3 className="text-lg font-semibold">Edit Profile</h3>

      <div>
        <label className="block text-sm">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div>
        <label className="block text-sm">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div>
        <label className="block text-sm">Password</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProfileForm;
