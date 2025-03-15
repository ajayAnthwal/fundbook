"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import Link from "next/link";
import { getWholeApplication } from "@/api/client";
import ApplicationDetails from "@/app/components/application/application_details";
import KycDetails from "@/app/components/application/kyc_details";
import BusinessDetails from "@/app/components/application/business_details";
import ApplicationDocuments from "@/app/components/application/ApplicationDocuments";
import ApplicationAdditionalDocuments from "@/app/components/application/AdditionalDocuments";

const ApplicationDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [application, setApplication] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [additionalDocuments, setAdditionalDocuments] = useState([]);
  const [kycDetails, setKycDetails] = useState([]);
  const [businessDetails, setBusinessDetails] = useState([]);

  useEffect(() => {
    if (id) {
      fetchDetails();
    }
  }, [id]);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const {
        application,
        kycDetails,
        businessDetails,
        documents,
        additionalDocuments,
      } = await getWholeApplication(id);
      
      setApplication(application);
      setKycDetails(kycDetails);
      setBusinessDetails(businessDetails);
      setDocuments(documents);
      setAdditionalDocuments(additionalDocuments);

      console.log('done fetching');
    } catch (error) {
      console.log(error.response?.data ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 mb-8 pb-8">
      <h2 className="mb-4 text-primary">Application Details</h2>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && application && (
        <>
          {/* Application Details */}
          <ApplicationDetails application={application} />


          {/* KYC Details */}
          <KycDetails kycDetails={kycDetails} />

          {/* Business Details */}
          <BusinessDetails businessDetails={businessDetails} />

          {/* Required Documents */}
          <ApplicationDocuments applicationId={id} documents={documents} />

          <ApplicationAdditionalDocuments applicationId={id} documents={additionalDocuments} />

          {/* Back Button */}
          <div className="mt-4">
            <Link href="/dashboard/admin/applications">
              <Button variant="secondary">Back to Applications</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationDetailsPage;
