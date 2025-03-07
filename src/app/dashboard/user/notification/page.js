"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Spinner, Card } from "react-bootstrap";

const ApplicationDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ID ko localStorage se uthao
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const id = storedData?.id;

  const API_URL = `http://194.195.112.4:3070/api/v1/application-additional-documents/${id}`;


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error before API call

      try {
        if (!id) {
          throw new Error("User ID not found in localStorage!");
        }

        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          throw new Error("Authentication token is missing. Please log in again.");
        }

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        console.log("API Response:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!data) {
    return <p className="text-danger">No data found!</p>;
  }

  return (
    <div className="container mt-4">
      <Card className="shadow-lg p-4">
        <h3 className="text-center">Application Details</h3>
        <hr />

        {/* User Details */}
        <div className="d-flex align-items-center gap-3">
          <Image
            src={data.application?.user?.photo?.path || "/default-profile.png"}
            alt="User Photo"
            width={80}
            height={80}
            className="rounded-circle"
          />
          <div>
            <h5>
              {data.application?.user?.firstName}{" "}
              {data.application?.user?.lastName}
            </h5>
            <p>Email: {data.application?.user?.email}</p>
            <p>Mobile: {data.application?.user?.mobile}</p>
          </div>
        </div>

        <hr />

        {/* Review Comments */}
        <h5>Review Comments:</h5>
        {data.reviewComments ? (
          <p className="text-success">"{data.reviewComments}"</p>
        ) : (
          <p className="text-warning">No comments available</p>
        )}

        <hr />

        {/* File Preview */}
        <h5>Uploaded File:</h5>
        {data.file?.path ? (
          <Image
            src={data.file.path}
            alt="Uploaded Document"
            width={400}
            height={300}
            className="rounded border"
          />
        ) : (
          <p className="text-warning">No file available</p>
        )}
      </Card>
    </div>
  );
};

export default ApplicationDetails;
