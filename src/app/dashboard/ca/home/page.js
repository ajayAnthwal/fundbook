"use client";
import Link from "next/link";

export default function CAHome() {
  return (
    <div className="container mt-4">
      <h2 className="text-primary">📌 CA Dashboard - Home</h2>
      <p>Welcome to your Chartered Accountant dashboard.</p>
      
      <div className="mt-4">
        <Link href="/dashboard/ca/application" className="btn btn-primary">
          📄 View Assigned Applications
        </Link>
      </div>
    </div>
  );
}
