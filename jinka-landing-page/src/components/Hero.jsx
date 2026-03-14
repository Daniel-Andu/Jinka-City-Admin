"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import HeroScrollButton from "./HeroScrollButton";
import HeroSlideshowBackground from "./HeroSlideshowBackground";
import { useLanguage, API_BASE } from "../context/LanguageContext";
import { getCachedData, setCachedData } from "../lib/dataCache";
import { resolveMediaUrl } from "../lib/media";
import { Skeleton } from "./ui/skeleton";
import "../styles/hero.css";

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.18 },
    },
};
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
    const { t, currentLang } = useLanguage();
    const cacheKey = `hero:${currentLang}`;
    const cachedSlides = getCachedData(cacheKey);
    const [heroSlides, setHeroSlides] = useState(cachedSlides || []);
    const [loading, setLoading] = useState(!cachedSlides);
    const heroRef = useRef(null);

    useEffect(() => {
        const cached = getCachedData(cacheKey);
        if (cached) {
            setHeroSlides(cached);
            setLoading(false);
            return;
        }

        let cancelled = false;
        const fetchHeroSlides = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/public/hero?lang=${currentLang}&page=home`);
                if (response.ok) {
                    const data = await response.json();
                    const slides = data.data || [];
                    if (!cancelled) {
                        setHeroSlides(slides);
                        setCachedData(cacheKey, slides);
                    }
                }
            } catch (error) {
                console.error("Error fetching hero slides:", error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };
        fetchHeroSlides();
        return () => {
            cancelled = true;
        };
    }, [currentLang, cacheKey]);

    const resolvedImages = (heroSlides || [])
        .map((slide) => resolveMediaUrl(slide.image))
        .filter(Boolean);
    const heroImages = resolvedImages.length
        ? resolvedImages
        : [
            "https://images.unsplash.com/photo-1666830320769-e979b6b82c38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYXdhc3NhJTIwRXRoaW9waWElMjBsYWtlJTIwY2l0eSUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODAzNjUzfDA&ixlib=rb-4.1.0&q=80&w=1080"
        ];

    const handleScrollNext = () => {
        const nextSection = heroRef.current?.nextElementSibling;
        if (nextSection instanceof HTMLElement) {
            nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (loading) {
        return (
            <section className="hero">
                <div className="hero-content" style={{ width: "100%" }}>
                    <Skeleton className="h-5 w-32 mx-auto mb-5 rounded-sm" />
                    <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
                    <Skeleton className="h-4 w-2/3 mx-auto mb-8" />
                    <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                        <Skeleton className="h-11 w-40" />
                        <Skeleton className="h-11 w-40" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="hero" ref={heroRef}>
            <HeroSlideshowBackground
                images={heroImages}
                intervalMs={4300}
                imageBrightness={0.55}
                overlay="linear-gradient(to bottom, rgba(13, 37, 89, 0.15) 0%, rgba(13, 37, 89, 0.25) 100%)"
            />

            {/* Content */}
            <motion.div className="hero-content" variants={container} initial="hidden" animate="visible">
                <motion.span className="hero-badge" variants={fadeUp}>
                    {t("hero.badge")}
                </motion.span>
                <motion.h1 className="hero-title" variants={fadeUp}>
                    {t("hero.title")}
                </motion.h1>
                <motion.p className="hero-subtitle" variants={fadeUp}>
                    {t("hero.subtitle")}
                </motion.p>
                <motion.div className="hero-actions" variants={fadeUp}>
                    <Link href="/services" className="hero-btn-primary">
                        {t("hero.btnServices")}
                    </Link>
                    <Link href="/about" className="hero-btn-secondary">
                        {t("hero.btnLearnMore")}
                    </Link>
                </motion.div>
                <motion.div variants={fadeUp}>
                    <HeroScrollButton onClick={handleScrollNext} text={t("hero.scroll")} />
                </motion.div>
            </motion.div>
        </section>
    );
}
