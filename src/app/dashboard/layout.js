"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "../utils/authUtils";
import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Dashboard/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { isLoggedin } from "@/api/client";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedin()) {
      router.push('/auth');
    }
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="navbar p-0">
        <Navbar />
      </div>

      {/* Centered Sidebar + Content */}
      <Container fluid className="d-flex justify-content-center mt-4">
        <Row className="w-100" style={{ maxWidth: "1100px" }}>
          <Col md={4} lg={3}>
            <Sidebar />
          </Col>
          <Col md={8} lg={9}>
            <div className="main-content">{children}</div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
