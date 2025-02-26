import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Dashboard/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

export default function DashboardLayout({ children }) {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar with fixed width */}
      <div className="text-white">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-grow-1 d-flex flex-column">
        <Navbar />
        <main className="p-4 flex-grow-1 bg-light">{children}</main>
      </div>
    </div>
  );
}
