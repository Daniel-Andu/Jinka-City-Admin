"use client";
import { FileText, Building, Droplets, Zap, TreePine, Trash2, ShieldCheck, HeartPulse, GraduationCap, Bus, Briefcase, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useLanguage, API_BASE } from "../context/LanguageContext";
import { getCachedData, setCachedData } from "../lib/dataCache";
import { Skeleton } from "./ui/skeleton";
import { useState, useEffect } from "react";

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
    { color: "#c9a818", bg: "#fdf8e6" },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" },
    }),
};

export default function Services() {
    const { t, currentLang } = useLanguage();
    const cacheKey = `servicesPreview:${currentLang}`;
    const cachedServices = getCachedData(cacheKey);
    const [services, setServices] = useState(cachedServices || []);
    const [loading, setLoading] = useState(!cachedServices);

    useEffect(() => {
        const cached = getCachedData(cacheKey);
        if (cached) {
            setServices(cached);
            setLoading(false);
            return;
        }

        let cancelled = false;
        const fetchServices = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/public/services?lang=${currentLang}`);
                if (response.ok) {
                    const data = await response.json();
                    const nextServices = data.data || [];
                    if (!cancelled) {
                        setServices(nextServices);
                        setCachedData(cacheKey, nextServices);
                    }
                }
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };
        fetchServices();
        return () => {
            cancelled = true;
        };
    }, [currentLang, cacheKey]);

    if (loading) {
        return (
            <section id="services" style={{ padding: "5rem 2rem", background: "#ffffff" }}>
                <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                        <Skeleton className="h-8 w-56 mx-auto mb-3" />
                        <Skeleton className="h-1 w-14 mx-auto mb-3" />
                        <Skeleton className="h-4 w-72 mx-auto" />
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "1.5rem",
                            marginBottom: "3rem",
                        }}
                    >
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: "#fff",
                                    borderRadius: "12px",
                                    padding: "2rem",
                                    boxShadow: "0 4px 20px rgba(26, 58, 107, 0.08)",
                                    border: "1px solid #eef2f9",
                                    textAlign: "center",
                                }}
                            >
                                <Skeleton className="h-14 w-14 mx-auto mb-4" />
                                <Skeleton className="h-5 w-40 mx-auto mb-3" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-5/6 mx-auto mb-4" />
                                <Skeleton className="h-4 w-24 mx-auto" />
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Skeleton className="h-11 w-40 mx-auto" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="services" style={{ padding: "5rem 2rem", background: "#ffffff" }}>
            <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
                {/* Header */}
                <motion.div
                    style={{ textAlign: "center", marginBottom: "3.5rem" }}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title" style={{ display: "block", textAlign: "center" }}>
                        {t("services.sectionTitle")}
                    </h2>
                    <div
                        style={{
                            width: "60px",
                            height: "3px",
                            background: "#e8a020",
                            margin: "8px auto 1rem",
                        }}
                    />
                    <p className="section-subtitle" style={{ margin: "0 auto", textAlign: "center" }}>
                        {t("services.sectionSubtitle")}
                    </p>
                </motion.div>

                {/* Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "1.5rem",
                        marginBottom: "3rem",
                    }}
                >
                    {services.map((service, idx) => {
                        const colorScheme = serviceColors[idx % serviceColors.length];
                        return (
                            <motion.div
                                key={service.id}
                                custom={idx}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ y: -6, boxShadow: `0 12px 32px ${colorScheme.color}20` }}
                                style={{
                                    background: "#fff",
                                    borderRadius: "12px",
                                    padding: "2rem",
                                    boxShadow: "0 4px 20px rgba(26, 58, 107, 0.08)",
                                    border: `1px solid ${colorScheme.bg}`,
                                    textAlign: "center",
                                    cursor: "pointer",
                                }}
                            >
                                <div
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "12px",
                                        background: colorScheme.bg,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 auto 1.25rem",
                                        color: colorScheme.color,
                                    }}
                                >
                                    {icons[idx % icons.length]}
                                </div>
                                <h3
                                    style={{
                                        fontSize: "1.1rem",
                                        fontWeight: 700,
                                        color: "#1a2744",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    {service.title}
                                </h3>
                                <p
                                    style={{
                                        color: "#6b7c93",
                                        fontSize: "0.9rem",
                                        lineHeight: 1.5,
                                        marginBottom: "1.25rem",
                                    }}
                                >
                                    {service.description}
                                </p>
                                <Link
                                    href="/services"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        color: colorScheme.color,
                                        fontWeight: 600,
                                        fontSize: "0.88rem",
                                        textDecoration: "none",
                                    }}
                                >
                                    {t("services.btnAccess")} <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    style={{ textAlign: "center" }}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Link href="/services" className="btn-primary">
                        {t("services.btnViewAll")}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
