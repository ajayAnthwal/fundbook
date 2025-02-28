import React from 'react';
const users = [
  { id: 1, name: "Alice", role: "MSME" },
  { id: 2, name: "Bob", role: "CA" },
];

export default function ManageUsers() {
  return (
    <>
      <h2>👥 Manage Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
              <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
          </>
  );
}
