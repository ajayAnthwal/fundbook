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
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Your Profile</h2>
        {profile ? (
          <div>
            <ul className="list-group mb-3">
              <li className="list-group-item"><strong>Name:</strong> {profile.name}</li>
              <li className="list-group-item"><strong>Email:</strong> {profile.email}</li>
              <li className="list-group-item"><strong>Phone:</strong> {profile.phone}</li>
              <li className="list-group-item"><strong>Address:</strong> {profile.address}</li>
            </ul>
            <a href="/user/edit-profile" className="btn btn-primary w-100">Edit Profile</a>
          </div>
        ) : (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2">Loading profile...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;