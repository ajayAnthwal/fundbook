import Table from "@/app/components/Dashboard/Table";

const Applications = () => {
  const applications = [
    { id: "123", user: "Ajay", amount: "₹50,000", status: "Pending" },
    { id: "456", user: "Ravi", amount: "₹1,00,000", status: "Approved" },
  ];

  return (
    <div className="p-4 my-[100px]">
      <h1 className="text-2xl font-bold">All Loan Applications</h1>
      <Table data={applications} columns={["id", "user", "amount", "status"]} />
    </div>
  );
};

export default Applications;
