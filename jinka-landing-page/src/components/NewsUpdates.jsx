"use client";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useLanguage, API_BASE } from "../context/LanguageContext";
import { getCachedData, setCachedData } from "../lib/dataCache";
import { resolveMediaUrl } from "../lib/media";
import { Skeleton } from "./ui/skeleton";
import { useState, useEffect } from "react";

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
    }),
};

export default function NewsUpdates() {
    const { t, currentLang } = useLanguage();
    const cacheKey = `newsUpdates:${currentLang}`;
    const cachedNews = getCachedData(cacheKey);
    const [newsItems, setNewsItems] = useState(cachedNews || []);
    const [loading, setLoading] = useState(!cachedNews);

    useEffect(() => {
        const cached = getCachedData(cacheKey);
        if (cached) {
            setNewsItems(cached);
            setLoading(false);
            return;
        }

        let cancelled = false;
        const fetchNews = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/public/news?lang=${currentLang}&limit=3`);
                if (response.ok) {
                    const data = await response.json();
                    const nextItems = data.data || [];
                    if (!cancelled) {
                        setNewsItems(nextItems);
                        setCachedData(cacheKey, nextItems);
                    }
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };
        fetchNews();
        return () => {
            cancelled = true;
        };
    }, [currentLang, cacheKey]);

    if (loading) {
        return (
            <section id="announcements" style={{ padding: "5rem 2rem", background: "#f9fbff" }}>
                <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3rem" }}>
                        <div>
                            <Skeleton className="h-8 w-52 mb-3" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                        <Skeleton className="h-5 w-24" />
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "1.75rem",
                        }}
                    >
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: "#fff",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    boxShadow: "0 4px 20px rgba(26, 58, 107, 0.08)",
                                    border: "1px solid #e8f0fe",
                                }}
                            >
                                <Skeleton className="h-48 w-full rounded-none" />
                                <div style={{ padding: "1.5rem" }}>
                                    <Skeleton className="h-4 w-40 mb-3" />
                                    <Skeleton className="h-5 w-64 mb-3" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-5/6 mb-4" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="announcements" style={{ padding: "5rem 2rem", background: "#f9fbff" }}>
            <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
                {/* Header */}
                <motion.div
                    style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        marginBottom: "3rem",
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <h2 className="section-title">{t("news.sectionTitle")}</h2>
                        <p className="section-subtitle" style={{ marginTop: "0.5rem" }}>
                            {t("news.sectionSubtitle")}
                        </p>
                    </div>
                    <Link
                        href="/news"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            color: "#1a3a6b",
                            fontWeight: 700,
                            fontSize: "0.88rem",
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {t("news.btnViewAll")} <ArrowRight size={15} />
                    </Link>
                </motion.div>

                {/* Cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "1.75rem",
                    }}
                >
                    {newsItems.map((item, idx) => {
                        const preview =
                            (item.excerpt && item.excerpt.trim()) ||
                            (item.content ? `${item.content.substring(0, 120)}...` : "");
                        const categoryLabel =
                            item.category_name ||
                            item.category_slug ||
                            (Array.isArray(item.categories) && item.categories[0]?.name) ||
                            null;
                        return (
                        <motion.article
                            key={item.id}
                            custom={idx}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            whileHover={{ y: -6, boxShadow: "0 14px 40px rgba(26, 58, 107, 0.15)" }}
                            style={{
                                background: "#fff",
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: "0 4px 20px rgba(26, 58, 107, 0.08)",
                                border: "1px solid #e8f0fe",
                            }}
                        >
                            <div
                                style={{
                                    height: "200px",
                                    backgroundImage: `url(${resolveMediaUrl(item.featured_image)})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                            <div style={{ padding: "1.5rem" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        marginBottom: "0.75rem",
                                        fontSize: "0.8rem",
                                        color: "#6b7c93",
                                    }}
                                >
                                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                        <Calendar size={14} />
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </span>
                                    {categoryLabel && (
                                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                            <Tag size={14} />
                                            {categoryLabel}
                                        </span>
                                    )}
                                </div>
                                <h3
                                    style={{
                                        fontSize: "1.1rem",
                                        fontWeight: 700,
                                        color: "#1a2744",
                                        marginBottom: "0.5rem",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    style={{
                                        color: "#6b7c93",
                                        fontSize: "0.9rem",
                                        lineHeight: 1.5,
                                        marginBottom: "1rem",
                                    }}
                                >
                                    {preview}
                                </p>
                                <Link
                                    href={`/news/${item.slug}`}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        color: "#1a3a6b",
                                        fontWeight: 600,
                                        fontSize: "0.88rem",
                                        textDecoration: "none",
                                    }}
                                >
                                    {t("news.btnReadMore")} <ArrowRight size={14} />
                                </Link>
                            </div>
                        </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
