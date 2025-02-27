import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Dashboard/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

export default function DashboardLayout({ children }) {
  return (
    <>
      {/* Sidebar */}
      <div className="navbar p-0">
        <Navbar />
      </div>

      <Container className="mt-2">
        <Row>
          <Col md={3}>
            <div className="sidebar">
              <Sidebar />
            </div>
          </Col>
          <Col md={9}>
            <div className="main-content">{children}</div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
