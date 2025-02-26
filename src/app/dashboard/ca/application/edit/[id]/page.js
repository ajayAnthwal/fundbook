"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getApplicationDetails, updateApplication } from "@/api/documents";
const EditApplication = () => {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    applicantName: "",
    details: "",
  });

  useEffect(() => {
    if (!id) return;
    const fetchApplication = async () => {
      try {
        const data = await getApplicationDetails(id);
        setFormData(data);
      } catch (error) {
        console.error("Failed to fetch application:", error);
      }
    };
    fetchApplication();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateApplication(id, formData);
      alert("Application updated successfully!");
      router.push("/dashboard/ca");
    } catch (error) {
      console.error("Failed to update application:", error);
      alert("Error updating application.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Application</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded-lg shadow">
        <label className="block mb-2">
          Applicant Name:
          <input
            type="text"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Details:
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditApplication;
