import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Dashboard/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

export default function DashboardLayout({ children }) {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar with fixed width */}
      <div className=" bg-[#21325B] text-white flex-shrink-0" style={{ width: "250px", backgroundColor: "#21325B" }}>
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-grow-1 d-flex flex-column ms-3">
        <Navbar />
        <main className="p-4 flex-grow-1 bg-light">{children}</main>
      </div>
    </div>
  );
}
