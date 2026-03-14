"use client";
import { Calendar, Map, Users, Mountain } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage, API_BASE } from "../context/LanguageContext";
import { getCachedData, setCachedData } from "../lib/dataCache";
import { Skeleton } from "./ui/skeleton";
import { useState, useEffect } from "react";
import "../styles/stats.css";

const icons = [
    <Calendar size={26}/>,
    <Map size={26}/>,
    <Users size={26}/>,
    <Mountain size={26}/>,
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
    }),
};

export default function Stats() {
    const { t, currentLang } = useLanguage();
    const cacheKey = `stats:${currentLang}`;
    const cachedStats = getCachedData(cacheKey);
    const [stats, setStats] = useState(cachedStats || []);
    const [loading, setLoading] = useState(!cachedStats);

    useEffect(() => {
        const cached = getCachedData(cacheKey);
        if (cached) {
            setStats(cached);
            setLoading(false);
            return;
        }

        let cancelled = false;
        const fetchStats = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/public/stats?lang=${currentLang}`);
                if (response.ok) {
                    const data = await response.json();
                    const nextStats = data.data || [];
                    if (!cancelled) {
                        setStats(nextStats);
                        setCachedData(cacheKey, nextStats);
                    }
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };
        fetchStats();
        return () => {
            cancelled = true;
        };
    }, [currentLang, cacheKey]);

    if (loading) {
        return (
            <section className="stats-section" id="about">
                <div className="stats-inner">
                    <div className="stats-header">
                        <Skeleton className="h-8 w-48 mb-3" />
                        <Skeleton className="h-4 w-72" />
                    </div>
                    <div className="stats-grid">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <div key={idx} className="stat-card">
                                <Skeleton className="h-10 w-10 mb-4" />
                                <Skeleton className="h-6 w-20 mb-2" />
                                <Skeleton className="h-4 w-28 mb-2" />
                                <Skeleton className="h-3 w-36" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="stats-section" id="about">
            <div className="stats-inner">
                {/* Header */}
                <motion.div
                    className="stats-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">{t("stats.sectionTitle")}</h2>
                    <p className="section-subtitle" style={{ margin: "0.5rem auto 0" }}>
                        {t("stats.sectionSubtitle")}
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="stats-grid">
                    {stats.map((stat, idx) => {
                        const label = stat.label || stat.stat_key || "";
                        const description = stat.description || "";
                        return (
                        <motion.div
                            key={stat.id}
                            className="stat-card"
                            custom={idx}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            whileHover={{ y: -6, boxShadow: "0 10px 32px rgba(26, 58, 107, 0.18)" }}
                        >
                            <div className="stat-icon">{icons[idx % icons.length]}</div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{label}</div>
                            <div className="stat-desc">{description}</div>
                        </motion.div>
                    );
                    })}
                </div>
            </div>
        </section>
    );
}
