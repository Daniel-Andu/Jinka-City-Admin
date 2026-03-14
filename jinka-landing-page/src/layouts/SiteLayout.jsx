"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function SiteLayout({ children }) {
    const pathname = usePathname();
    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);
    return (<div style={{ minWidth: 0, width: "100%" }}>
      <TopBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>);
}
