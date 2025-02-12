"use client";
import { useEffect } from "react";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";


export default function RootLayout({ children }) {
  useEffect(() => {
    // Import bootstrap JS on component mount
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <head>
        <title>My Website</title>
        <link rel="stylesheet" href="/assets/css/theme.min.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <link rel="stylesheet" href="/assets/css/docs.css" />
        <link rel="stylesheet" href="/assets/css/snippets.css" />
        <link rel="stylesheet" href="/assets/css/theme.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor.min.css" />
        <link rel="stylesheet" href="/assets/css/theme.minc619.css" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        
        {/* Alternative: Add Bootstrap JS using Script component */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}