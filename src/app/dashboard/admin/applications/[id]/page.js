"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Spinner,
  Alert,
  Card,
  Button,
  Table,
  Image,
  Modal,
  Form,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FaRupeeSign,
  FaCalendarAlt,
  FaUser,
  FaClipboardCheck,
  FaCommentDots,
} from "react-icons/fa";
import { getApplication, getApplicationAdditionalDocuments, getApplicationDocuments, getBusinessDetails, getKycDetails, getWholeApplication } from "@/api/client";
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
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState("");
  const [showNewDocModal, setShowNewDocModal] = useState(false);

  const [application, setApplication] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [additionalDocuments, setAdditionalDocuments] = useState([]);
  const [kycDetails, setKycDetails] = useState([]);
  const [businessDetails, setBusinessDetails] = useState([]);
  const [applicationDocuments, setApplicationDocuments] = useState([]);

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
    <div className="container mt-4">
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

          <ApplicationAdditionalDocuments documents={additionalDocuments} />

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
