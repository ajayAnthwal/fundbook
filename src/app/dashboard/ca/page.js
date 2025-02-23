"use client";
import { useEffect, useState } from "react";
import { getCAApplications } from "@/api/documents";

const CADashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getCAApplications();
        setApplications(data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        CA Dashboard - Applications
      </h2>
      {applications.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Applicant Name</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="border p-2">{app.id}</td>
                <td className="border p-2">{app.applicantName}</td>
                <td className="border p-2">{app.status}</td>
                <td className="border p-2">
                  <a
                    href={`/dashboard/ca/application/${app.id}`}
                    className="text-blue-500"
                  >
                    Open
                  </a>
                  {app.status === "Pending" && (
                    <a
                      href={`/dashboard/ca/application/edit/${app.id}`}
                      className="text-green-500 ml-2"
                    >
                      Edit
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
};

export default CADashboard;
