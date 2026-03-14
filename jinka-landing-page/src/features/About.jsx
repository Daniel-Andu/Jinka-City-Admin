"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ChevronRight, Eye, Target } from "lucide-react";
import HeroScrollButton from "../components/HeroScrollButton";
import HeroSlideshowBackground from "../components/HeroSlideshowBackground";
import { useLanguage, API_BASE } from "../context/LanguageContext";
import { getCachedData, setCachedData } from "../lib/dataCache";
import { resolveMediaUrl } from "../lib/media";
const ABOUT_HERO_IMAGES = [
    "https://images.unsplash.com/photo-1765475467677-579353b25ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjBjaXR5JTIwdXJiYW4lMjBkZXZlbG9wbWVudCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1722725384325-7ba56456db3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbGFrZSUyMHN1bnNldCUyMG5hdHVyZSUyMHNjZW5lcnl8ZW58MXx8fHwxNzcyODA0MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1764145177622-8317fbfe1877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNvbW11bml0eSUyMHBlb3BsZSUyMGdhdGhlcmluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzcyODA0MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
];
const COMMUNITY_IMAGE = "https://images.unsplash.com/photo-1764145177622-8317fbfe1877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNvbW11bml0eSUyMHBlb3BsZSUyMGdhdGhlcmluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzcyODA0MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080";
const LAKE_IMAGE = "https://images.unsplash.com/photo-1722725384325-7ba56456db3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbGFrZSUyMHN1bnNldCUyMG5hdHVyZSUyMHNjZW5lcnl8ZW58MXx8fHwxNzcyODA0MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080";
const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};
export default function About() {
    const { t, currentLang } = useLanguage();
    const heroRef = useRef(null);
    const heroCacheKey = `hero:about:${currentLang}`;
    const cachedHero = getCachedData(heroCacheKey);
    const [heroSlides, setHeroSlides] = useState(cachedHero || []);
    useEffect(() => {
        const cached = getCachedData(heroCacheKey);
        if (cached) {
            setHeroSlides(cached);
            return;
        }

        let cancelled = false;
        const fetchHeroSlides = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/public/hero?lang=${currentLang}&page=about`);
                if (response.ok) {
                    const data = await response.json();
                    const slides = data.data || [];
                    if (!cancelled) {
                        setHeroSlides(slides);
                        setCachedData(heroCacheKey, slides);
                    }
                }
            } catch (error) {
                console.error("Error fetching about hero slides:", error);
            }
        };
        fetchHeroSlides();
        return () => {
            cancelled = true;
        };
    }, [currentLang, heroCacheKey]);

    const resolvedHeroImages = (heroSlides || [])
        .map((slide) => resolveMediaUrl(slide.image))
        .filter(Boolean);
    const heroImages = resolvedHeroImages.length ? resolvedHeroImages : ABOUT_HERO_IMAGES;
    const handleScrollNext = () => {
        const nextSection = heroRef.current === null || heroRef.current === void 0 ? void 0 : heroRef.current.nextElementSibling;
        if (nextSection instanceof HTMLElement) {
            nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    return (<div>
      {/* Page Hero */}
      <div ref={heroRef} style={{
            position: "relative",
            height: "360px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
        }}>
        <HeroSlideshowBackground images={heroImages} intervalMs={4200} imageBrightness={0.4} overlay="linear-gradient(to bottom, rgba(13,37,89,0.2), rgba(13,37,89,0.3))"/>
        <motion.div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "#fff", padding: "0 1rem" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          {/* Breadcrumb */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "1rem",
        }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
              {t("about.breadcrumbHome")}
            </Link>
            <ChevronRight size={13}/>
            <span style={{ color: "#e8a020" }}>{t("about.breadcrumbAbout")}</span>
          </div>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "#fff",
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            marginBottom: "0.75rem",
        }}>
            {t("about.heroTitle")}
          </h1>
          <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.85)", maxWidth: "600px", margin: "0 auto" }}>
            {t("about.heroSubtitle")}
          </p>
        </motion.div>
        <HeroScrollButton label={t("hero.scroll")} onClick={handleScrollNext}/>
      </div>

      {/* City Overview */}
      <section style={{ padding: "5rem 2rem", background: "#fff" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
        }} className="about-two-col">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="section-title">{t("about.overviewTitle")}</h2>
              <p style={{ color: "#4a5a78", lineHeight: 1.85, marginBottom: "1.25rem", marginTop: "1rem" }}>
                {t("about.overviewText1")}
              </p>
              <p style={{ color: "#4a5a78", lineHeight: 1.85 }}>
                {t("about.overviewText2")}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ position: "relative" }}>
              <img src={LAKE_IMAGE} alt="Jinka City" style={{
            width: "100%",
            height: "380px",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0 16px 48px rgba(26,58,107,0.15)",
        }}/>
              <div style={{
            position: "absolute",
            bottom: "20px",
            left: "-20px",
            background: "#1a3a6b",
            color: "#fff",
            padding: "1rem 1.4rem",
            borderRadius: "8px",
            boxShadow: "0 8px 24px rgba(26,58,107,0.25)",
        }}>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>
                  Capital of
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>South Omo Zone</div>
                <div style={{ fontSize: "0.75rem", color: "#e8a020", marginTop: "2px" }}>Ethiopia</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History */}
      <section style={{ padding: "5rem 2rem", background: "#f4f7fd" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="about-two-col">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ order: 2 }} className="about-order-2">
              <img src={COMMUNITY_IMAGE} alt="Jinka Community" style={{
            width: "100%",
            height: "380px",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0 16px 48px rgba(26,58,107,0.15)",
        }}/>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ order: 1 }} className="about-order-1">
              <h2 className="section-title">{t("about.historyTitle")}</h2>
              <p style={{ color: "#4a5a78", lineHeight: 1.85, marginTop: "1rem" }}>
                {t("about.historyText")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ padding: "5rem 2rem", background: "#fff" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
        }} className="about-two-col">
            {/* Vision */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{
            background: "#1a3a6b",
            borderRadius: "12px",
            padding: "2.5rem",
            color: "#fff",
        }}>
              <div style={{
            width: "56px",
            height: "56px",
            background: "rgba(232,160,32,0.2)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
        }}>
                <Eye size={26} style={{ color: "#e8a020" }}/>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem", color: "#fff" }}>
                {t("about.visionTitle")}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                {t("about.visionText")}
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.15 }} style={{
            background: "#f4f7fd",
            borderRadius: "12px",
            padding: "2.5rem",
            border: "2px solid #eef2f9",
        }}>
              <div style={{
            width: "56px",
            height: "56px",
            background: "#e8a020",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
        }}>
                <Target size={26} style={{ color: "#fff" }}/>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem", color: "#1a3a6b" }}>
                {t("about.missionTitle")}
              </h3>
              <p style={{ color: "#4a5a78", lineHeight: 1.8, fontSize: "0.95rem" }}>
                {t("about.missionText")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-two-col { grid-template-columns: 1fr !important; }
          .about-order-1 { order: 1 !important; }
          .about-order-2 { order: 2 !important; }
        }
      `}</style>
    </div>);
}
