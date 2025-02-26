"use client";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/api/documents";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      {profile ? (
        <div className="border p-4 rounded-lg shadow">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <a href="/user/edit-profile" className="text-blue-500">Edit Profile</a>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
