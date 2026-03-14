"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { Building2, Home } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
export default function NotFound() {
    const { t } = useLanguage();
    const nf = t("notFound");
    return (<div style={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 2rem",
            background: "#f4f7fd",
        }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ textAlign: "center", maxWidth: "480px" }}>
        <motion.div animate={{ rotate: [0, -5, 5, -3, 3, 0] }} transition={{ duration: 1.5, delay: 0.5 }} style={{
            width: "80px",
            height: "80px",
            background: "#eef2f9",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            color: "#1a3a6b",
        }}>
          <Building2 size={36}/>
        </motion.div>

        <h1 style={{
            fontSize: "5rem",
            fontWeight: 900,
            color: "#1a3a6b",
            lineHeight: 1,
            marginBottom: "0.5rem",
            letterSpacing: "-0.05em",
        }}>
          404
        </h1>
        <h2 style={{ color: "#1a2744", marginBottom: "0.75rem", fontSize: "1.4rem", fontWeight: 700 }}>
          {nf.title}
        </h2>
        <p style={{ color: "#5a6a8a", lineHeight: 1.7, marginBottom: "2rem" }}>
          {nf.subtitle}
        </p>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link href="/" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "#1a3a6b",
            color: "#fff",
            padding: "0.75rem 1.8rem",
            borderRadius: "6px",
            fontWeight: 700,
            fontSize: "0.95rem",
            textDecoration: "none",
        }}>
            <Home size={17}/>
            {nf.btn}
          </Link>
        </motion.div>
      </motion.div>
    </div>);
}
