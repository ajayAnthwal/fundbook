"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Spinner, Alert } from "react-bootstrap";

export default function ManageUsers() {
  const API_URL = "http://194.195.112.4:3070/api/v1/users";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("authToken"); // Token auth ke liye
    if (!token) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          page: 1,
          limit: 10,
        },
      });

      setUsers(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">👥 Manage Users</h2>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Status</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email || "N/A"}</td>
                  <td>{user.mobile || "N/A"}</td>
                  <td>{user.role?.name || "N/A"}</td>
                  <td>{user.status?.name || "N/A"}</td>
                  <td>
                    {user.photo?.path ? (
                      <img
                        src={user.photo.path}
                        alt="Profile"
                        width="40"
                        height="40"
                        style={{ borderRadius: "50%" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No users found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
}
