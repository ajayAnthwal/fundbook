import { Alert, Card, Col, Row, Table } from "react-bootstrap";

function BusinessDetails({ businessDetails }) {
  // console.log('businessDetails', businessDetails);
  const businessDetail = businessDetails.data[0];

  return (
    <Card className="p-4 shadow-lg border-0 rounded mb-4">
            <Card.Body>
              <h4 className="text-primary mb-4">💼 Business Details</h4>
              
              <Row>
                <Table striped bordered hover responsive className="text-center">
                  <tbody>
                    <tr>
                      <td>email</td>
                      <td>{businessDetail?.email}</td>
                    </tr>

                    <tr>
                      <td>GST</td>
                      <td>{businessDetail.gst}</td>
                    </tr>

                    <tr>
                      <td>Mobile</td>
                      <td>{businessDetail.mobile}</td>
                    </tr>

                    <tr>
                      <td>Udyam</td>
                      <td>{businessDetail.udyam}</td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
              
            </Card.Body>
          </Card>
  );
}

export default BusinessDetails;