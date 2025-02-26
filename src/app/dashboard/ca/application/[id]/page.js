"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getApplicationDetails } from "@/api/documents";

const ApplicationDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [application, setApplication] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchApplication = async () => {
      try {
        const data = await getApplicationDetails(id);
        setApplication(data);
      } catch (error) {
        console.error("Failed to fetch application:", error);
      }
    };
    fetchApplication();
  }, [id]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Application Details</h2>
      {application ? (
        <div className="border p-4 rounded-lg shadow">
          <p><strong>Applicant Name:</strong> {application.applicantName}</p>
          <p><strong>Status:</strong> {application.status}</p>
          <p><strong>Details:</strong> {application.details}</p>
          {application.status === "Pending" && (
            <a href={`/dashboard/ca/application/edit/${id}`} className="text-green-500">Edit Application</a>
          )}
        </div>
      ) : (
        <p>Loading application...</p>
      )}
    </div>
  );
};

export default ApplicationDetails;
