"use client";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/api/documents";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        if (data) {
          setProfile(data);
        } else {
          setError("Failed to load profile.");
        }
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Your Profile</h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2">Loading profile...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          <div>
            <ul className="list-group mb-3">
              <li className="list-group-item"><strong>Name:</strong> {profile.name}</li>
              <li className="list-group-item"><strong>Email:</strong> {profile.email}</li>
              <li className="list-group-item"><strong>Phone:</strong> {profile.phone}</li>
              <li className="list-group-item"><strong>Address:</strong> {profile.address}</li>
            </ul>
            <a href="/user/edit-profile" className="btn btn-primary w-100">Edit Profile</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
