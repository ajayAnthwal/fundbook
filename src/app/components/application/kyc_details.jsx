import { Alert, Card, Col, Row, Table } from "react-bootstrap";

function KycDetails({ kycDetails }) {
  // console.log('kycDetails', kycDetails);
  return (
    <Card className="p-4 shadow-lg border-0 rounded mb-4">
      <Card.Body>
        <h4 className="text-primary mb-4">🔒 KYC Details</h4>

        <Row>
          <Table striped bordered hover responsive className="text-center">
              <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">PAN</th>
                </tr>
              </thead>
                
              <tbody>
                {kycDetails.data?.length > 0 ? (
                  kycDetails.data.map((kycDetail, index) => (
                    <tr key={index}>
                      <td>
                          {kycDetail.name}
                      </td>
                      <td>{kycDetail.pan}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No Details found.
                    </td>
                  </tr>
                )}
              </tbody>
          </Table>
        </Row>

      </Card.Body>
    </Card>
  );
}

export default KycDetails;