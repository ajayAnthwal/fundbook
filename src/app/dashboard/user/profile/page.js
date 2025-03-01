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
        setLoading(true);
        const data = await getUserProfile();
        console.log("Profile page data:", data);
        
        if (data && (data.user || data.email)) {
          setProfile(data.user || data);
          setError("");
        } else {
          setError("Invalid profile data received");
        }
      } catch (err) {
        console.error("Profile Error:", err);
        if (err.message === "No token found!") {
          setError("Please login to view your profile");
        } else if (err.status === 401) {
          setError("Session expired. Please login again.");
        } else {
          setError(err.message || "Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Your Profile</h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2">Loading profile...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">
            {error}
            {(error.includes("Please login") || error.includes("Session expired")) && (
              <div className="mt-3">
                <a href="/auth" className="btn btn-primary">Go to Login</a>
              </div>
            )}
          </div>
        ) : profile ? (
          <div>
            <ul className="list-group mb-3">
              {(profile.firstName || profile.lastName) && (
                <li className="list-group-item">
                  <strong>Name:</strong> {[profile.firstName, profile.lastName].filter(Boolean).join(" ")}
                </li>
              )}
              <li className="list-group-item"><strong>Email:</strong> {profile.email}</li>
              {profile.phone && (
                <li className="list-group-item"><strong>Phone:</strong> {profile.phone}</li>
              )}
              {profile.address && (
                <li className="list-group-item"><strong>Address:</strong> {profile.address}</li>
              )}
            </ul>
            <a href="/user/edit-profile" className="btn btn-primary w-100">Edit Profile</a>
          </div>
        ) : (
          <div className="alert alert-warning">No profile data available</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
