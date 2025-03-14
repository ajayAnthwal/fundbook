import { Badge, Card, Col, Row } from "react-bootstrap";
import { FaClipboardCheck, FaRupeeSign, FaUser } from "react-icons/fa";

function ApplicationDetails({ application }) {
  return (
    <Card className="p-4 shadow-lg border-0 rounded mb-4">
      <Card.Body>
        <h4 className="text-primary mb-4">
          📄 Loan & Application Details
        </h4>
        <Row>
          <Col md={6}>
            <p>
              <strong>
                <FaClipboardCheck /> Application Name:
              </strong>{" "}
              {application?.name || "N/A"}
            </p>
            <p>
              <strong>💳 Loan Type:</strong>{" "}
              {application?.loanType?.name || "N/A"}
            </p>
            <p>
              <strong>
                <FaRupeeSign /> Amount:
              </strong>
              <Badge bg="success" className="ms-2">
                ₹{application?.amount || "N/A"}
              </Badge>
            </p>
          </Col>
          <Col md={6}>
            <p>
              <strong>
                <FaUser /> Initiated By:
              </strong>{" "}
              {application?.initiatedBy || "N/A"}
            </p>
            <p>
              <strong>📌 Application Status:</strong>
              <Badge
                bg={
                  application?.status === "pending"
                    ? "warning"
                    : application?.status === "approved"
                    ? "success"
                    : "danger"
                }
                className="ms-2"
              >
                {application?.status || "N/A"}
              </Badge>
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ApplicationDetails;