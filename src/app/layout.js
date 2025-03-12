"use client";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import '../../public/assets/css/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import BootstrapClient from "./providers/BootstrapClient";

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get current route

  // Check if the page is inside "/dashboard"
  const isDashboard = pathname.startsWith("/dashboard");

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
        <BootstrapClient />

        {/* Dashboard pages par Header aur Footer nahi dikhana */}
        {!isDashboard && <Header />}
        {children}
        {!isDashboard && <Footer />}

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
