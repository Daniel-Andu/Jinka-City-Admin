"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, ChevronRight } from "lucide-react";
import { useLanguage, API_BASE } from "../../../src/context/LanguageContext";
import { resolveMediaUrl } from "../../../src/lib/media";
import { Skeleton } from "../../../src/components/ui/skeleton";

export default function NewsDetailPage({ params }) {
    const { t, currentLang } = useLanguage();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE}/api/public/news/${params.slug}?lang=${currentLang}`);
                
                if (response.ok) {
                    const data = await response.json();
                    setNews(data.data || data);
                } else if (response.status === 404) {
                    setError('News article not found');
                } else {
                    setError('Failed to load news article');
                }
            } catch (err) {
                console.error('Error fetching news detail:', err);
                setError('Failed to load news article');
            } finally {
                setLoading(false);
            }
        };

        if (params.slug) {
            fetchNewsDetail();
        }
    }, [params.slug, currentLang]);

    if (loading) {
        return (
            <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ marginBottom: "2rem" }}>
                    <Skeleton className="h-6 w-32 mb-4" />
                    <Skeleton className="h-12 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem" }}>
                    <div>
                        <Skeleton className="h-64 w-full mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                    <div>
                        <Skeleton className="h-32 w-full mb-4" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !news) {
        return (
            <div style={{ padding: "4rem 2rem", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
                <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#1a2744" }}>
                    {error || 'News article not found'}
                </h1>
                <p style={{ color: "#5a6a8a", marginBottom: "2rem" }}>
                    The news article you're looking for doesn't exist or has been removed.
                </p>
                <Link 
                    href="/news" 
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "0.75rem 1.5rem",
                        background: "#1a3a6b",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "8px",
                        fontWeight: 600,
                    }}
                >
                    <ArrowLeft size={16} />
                    Back to News
                </Link>
            </div>
        );
    }

    return (
        <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
            {/* Breadcrumb */}
            <motion.div 
                style={{ marginBottom: "2rem" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.7)",
                    marginBottom: "1rem",
                }}>
                    <Link href="/" style={{ color: "#5a6a8a", textDecoration: "none" }}>
                        {t("news.breadcrumbHome") || "Home"}
                    </Link>
                    <ChevronRight size={13} />
                    <Link href="/news" style={{ color: "#5a6a8a", textDecoration: "none" }}>
                        {t("news.breadcrumbNews") || "News"}
                    </Link>
                    <ChevronRight size={13} />
                    <span style={{ color: "#1a3a6b", fontWeight: 600 }}>
                        {news.title?.substring(0, 50)}...
                    </span>
                </div>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem" }}>
                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Featured Image */}
                    {news.featured_image && (
                        <div style={{ marginBottom: "2rem" }}>
                            <img
                                src={resolveMediaUrl(news.featured_image)}
                                alt={news.title}
                                style={{
                                    width: "100%",
                                    height: "400px",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 20px rgba(26,58,107,0.1)"
                                }}
                            />
                        </div>
                    )}

                    {/* Article Header */}
                    <div style={{ marginBottom: "2rem" }}>
                        <h1 style={{
                            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                            fontWeight: 800,
                            color: "#1a2744",
                            lineHeight: 1.2,
                            marginBottom: "1rem"
                        }}>
                            {news.title}
                        </h1>
                        
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            color: "#8a99b5",
                            fontSize: "0.9rem",
                            marginBottom: "1rem"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <Calendar size={14} />
                                {new Date(news.created_at).toLocaleDateString(
                                    currentLang === 'am' ? 'am-ET' : 'en-US',
                                    { year: 'numeric', month: 'long', day: 'numeric' }
                                )}
                            </div>
                            {news.category_name && (
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <Tag size={14} />
                                    {news.category_name}
                                </div>
                            )}
                        </div>

                        {/* Excerpt */}
                        {news.excerpt && (
                            <div style={{
                                fontSize: "1.1rem",
                                color: "#5a6a8a",
                                lineHeight: 1.6,
                                fontStyle: "italic",
                                marginBottom: "1rem",
                                padding: "1rem",
                                background: "#f8fafc",
                                borderLeft: "4px solid #1a3a6b",
                                borderRadius: "4px"
                            }}>
                                {news.excerpt}
                            </div>
                        )}
                    </div>

                    {/* Article Content */}
                    <div style={{
                        fontSize: "1rem",
                        lineHeight: 1.8,
                        color: "#2c3e50",
                        marginBottom: "2rem"
                    }}>
                        <div dangerouslySetInnerHTML={{ __html: news.content }} />
                    </div>

                    {/* Back Button */}
                    <Link
                        href="/news"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "0.75rem 1.5rem",
                            background: "#1a3a6b",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "8px",
                            fontWeight: 600,
                            transition: "all 0.2s"
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = "#0f2945";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = "#1a3a6b";
                        }}
                    >
                        <ArrowLeft size={16} />
                        Back to News
                    </Link>
                </motion.div>

                {/* Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Category Info */}
                    {news.category_name && (
                        <div style={{
                            background: "#fff",
                            padding: "1.5rem",
                            borderRadius: "12px",
                            boxShadow: "0 4px 20px rgba(26,58,107,0.07)",
                            marginBottom: "2rem"
                        }}>
                            <h3 style={{
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: "#1a2744",
                                marginBottom: "0.5rem"
                            }}>
                                Category
                            </h3>
                            <div style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "0.5rem 1rem",
                                background: "#1a3a6b",
                                color: "white",
                                borderRadius: "20px",
                                fontSize: "0.85rem",
                                fontWeight: 600
                            }}>
                                <Tag size={12} />
                                {news.category_name}
                            </div>
                        </div>
                    )}

                    {/* Share Section */}
                    <div style={{
                        background: "#fff",
                        padding: "1.5rem",
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(26,58,107,0.07)"
                    }}>
                        <h3 style={{
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "#1a2744",
                            marginBottom: "1rem"
                        }}>
                            Share this article
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <button
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: news.title,
                                            text: news.excerpt || news.content?.substring(0, 160),
                                            url: window.location.href
                                        });
                                    } else {
                                        navigator.clipboard.writeText(window.location.href);
                                        alert('Link copied to clipboard!');
                                    }
                                }}
                                style={{
                                    padding: "0.5rem 1rem",
                                    border: "1px solid #e2e8f0",
                                    background: "#fff",
                                    borderRadius: "6px",
                                    fontSize: "0.85rem",
                                    cursor: "pointer",
                                    transition: "all 0.2s"
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.background = "#f8fafc";
                                }}
                                onMouseOut={(e) => => {
                                    e.target.style.background = "#fff";
                                }}
                            >
                                Share Article
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
