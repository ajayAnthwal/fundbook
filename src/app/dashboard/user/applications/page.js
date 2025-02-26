"use client";
import { useEffect, useState } from "react";
import { getUserApplications } from "@/api/documents";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getUserApplications();
        setApplications(data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Loan Applications</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Application ID</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="border">
              <td className="border p-2">{app.id}</td>
              <td className="border p-2">{app.status}</td>
              <td className="border p-2">
                <a
                  href={`/user/applications/${app.id}`}
                  className="text-blue-500 mr-2"
                >
                  View
                </a>
                {["pending", "under_review"].includes(app.status) && (
                  <a
                    href={`/user/applications/edit/${app.id}`}
                    className="text-green-500"
                  >
                    Edit
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsPage;
