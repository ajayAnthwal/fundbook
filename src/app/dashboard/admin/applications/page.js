import Table from "@/app/components/Dashboard/Table";

const Applications = () => {
  const applications = [
    { id: "123", user: "Ajay", amount: "₹50,000", status: "Pending" },
    { id: "456", user: "Ravi", amount: "₹1,00,000", status: "Approved" },
  ];

  return (
    <div className="container-fluid px-4" style={{ marginTop: "200px !important" }}>
    <h1 className="fs-4 fw-bold mb-4 text-center">📋 All Loan Applications</h1>
    <div className="table-responsive">
      <Table data={applications} columns={["id", "user", "amount", "status"]} />
    </div>
  </div>  
  );
};

export default Applications;