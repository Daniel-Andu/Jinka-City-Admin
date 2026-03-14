"use client";
import { FileText, Building, Droplets, Zap, TreePine, Trash2, ShieldCheck, HeartPulse, GraduationCap, Bus, Briefcase, BarChart3, ArrowRight, } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
const icons = [
    <FileText size={24}/>,
    <Building size={24}/>,
    <Droplets size={24}/>,
    <Zap size={24}/>,
    <TreePine size={24}/>,
    <Trash2 size={24}/>,
    <ShieldCheck size={24}/>,
    <HeartPulse size={24}/>,
    <GraduationCap size={24}/>,
    <Bus size={24}/>,
    <Briefcase size={24}/>,
    <BarChart3 size={24}/>,
];
const serviceColors = [
    { color: "#1a3a6b", bg: "#eef2f9" },
    { color: "#e8a020", bg: "#fef4e4" },
    { color: "#1a7ab5", bg: "#e4f0f8" },
    { color: "#c9a818", bg: "#fdf8e6" },
    { color: "#2a8a5c", bg: "#e4f4ec" },
    { color: "#6a5acd", bg: "#f0eeff" },
    { color: "#d13030", bg: "#fde8e8" },
    { color: "#e84a7c", bg: "#fde9f1" },
    { color: "#1a3a6b", bg: "#eef2f9" },
    { color: "#e8a020", bg: "#fef4e4" },
    { color: "#1a7ab5", bg: "#e4f0f8" },
    { color: "#2a8a5c", bg: "#e4f4ec" },
];
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, duration: 0.45, ease: "easeOut" },
    }),
};
export default function Services() {
    const { t } = useLanguage();
    const s = t("services");
    return (<section id="services" style={{ padding: "5rem 2rem", background: "#ffffff" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div style={{ textAlign: "center", marginBottom: "3.5rem" }} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="section-title" style={{ display: "block", textAlign: "center" }}>
            {s.sectionTitle}
          </h2>
          <div style={{
            width: "60px",
            height: "3px",
            background: "#e8a020",
            margin: "8px auto 1rem",
        }}/>
          <p className="section-subtitle" style={{ margin: "0 auto", textAlign: "center" }}>
            {s.sectionSubtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.5rem",
        }}>
          {s.items.map((service, idx) => {
            const { color, bg } = serviceColors[idx];
            return (<motion.div key={idx} custom={idx} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -6, boxShadow: "0 10px 32px rgba(26, 58, 107, 0.14)" }} style={{
                    background: "#fff",
                    borderRadius: "10px",
                    padding: "1.75rem 1.5rem",
                    boxShadow: "0 2px 12px rgba(26, 58, 107, 0.06)",
                    border: "1px solid #eef2f9",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                }}>
                <div style={{
                    width: "52px",
                    height: "52px",
                    background: bg,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: color,
                }}>
                  {icons[idx]}
                </div>
                <h3 style={{ color: "#1a2744", fontSize: "0.98rem", margin: 0 }}>
                  {service.title}
                </h3>
                <p style={{ color: "#5a6a8a", fontSize: "0.84rem", lineHeight: 1.65, margin: 0 }}>
                  {service.desc}
                </p>
                <Link href="/services" style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    color: color,
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    textDecoration: "none",
                    marginTop: "auto",
                }}>
                  {s.btnAccess} <ArrowRight size={13}/>
                </Link>
              </motion.div>);
        })}
        </div>

        {/* Bottom CTA */}
        <motion.div style={{ textAlign: "center", marginTop: "3rem" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <Link href="/services" className="btn-outline">
            {s.btnViewAll}
          </Link>
        </motion.div>
      </div>
    </section>);
}
