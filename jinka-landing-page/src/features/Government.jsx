"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Landmark, Users } from "lucide-react";
import HeroScrollButton from "../components/HeroScrollButton";
import HeroSlideshowBackground from "../components/HeroSlideshowBackground";
import { useLanguage, API_BASE } from "../context/LanguageContext";
import { getCachedData, setCachedData } from "../lib/dataCache";
import { Skeleton } from "../components/ui/skeleton";
import { resolveMediaUrl } from "../lib/media";
const GOVT_HERO_IMAGES = [
    "https://images.unsplash.com/photo-1604560842632-bd795d8f1275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYW4lMjBnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1765475467677-579353b25ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjBjaXR5JTIwdXJiYW4lMjBkZXZlbG9wbWVudCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1771495604392-2008757fb32a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNpdHklMjBpbmZyYXN0cnVjdHVyZSUyMGRldmVsb3BtZW50JTIwcHJvamVjdHxlbnwxfHx8fDE3NzI4MDM2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
];
const deptColors = [
    "#1a3a6b", "#e8a020", "#1a7ab5", "#2a8a5c",
    "#6a5acd", "#d13030", "#e84a7c", "#c9a818",
];
const deptBgs = [
    "#eef2f9", "#fef4e4", "#e4f0f8", "#e4f4ec",
    "#f0eeff", "#fde8e8", "#fde9f1", "#fdf8e6",
];
const deptIcons = [
    <Landmark size={22}/>,
    <Users size={22}/>,
    <Landmark size={22}/>,
    <Landmark size={22}/>,
    <Landmark size={22}/>,
    <Landmark size={22}/>,
    <Landmark size={22}/>,
    <Landmark size={22}/>,
];
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.09, duration: 0.5, ease: "easeOut" },
    }),
};
export default function Government() {
    const { t, currentLang } = useLanguage();
    const cacheKey = `departments:${currentLang}`;
    const cachedDepartments = getCachedData(cacheKey);
    const [departments, setDepartments] = useState(cachedDepartments || []);
    const [loading, setLoading] = useState(!cachedDepartments);
    const heroCacheKey = `hero:government:${currentLang}`;
    const cachedHero = getCachedData(heroCacheKey);
    const [heroSlides, setHeroSlides] = useState(cachedHero || []);
    const heroRef = useRef(null);

    useEffect(() => {
        const cached = getCachedData(cacheKey);
        if (cached) {
            setDepartments(cached);
            setLoading(false);
            return;
        }

        let cancelled = false;
        const fetchDepartments = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/public/departments?lang=${currentLang}`);
                if (response.ok) {
                    const data = await response.json();
                    const nextDepartments = data.data || [];
                    if (!cancelled) {
                        setDepartments(nextDepartments);
                        setCachedData(cacheKey, nextDepartments);
                    }
                }
            } catch (error) {
                console.error("Error fetching departments:", error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };
        fetchDepartments();
        return () => {
            cancelled = true;
        };
    }, [currentLang, cacheKey]);

    useEffect(() => {
        const cached = getCachedData(heroCacheKey);
        if (cached) {
            setHeroSlides(cached);
            return;
        }

        let cancelled = false;
        const fetchHeroSlides = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/public/hero?lang=${currentLang}&page=government`);
                if (response.ok) {
                    const data = await response.json();
                    const slides = data.data || [];
                    if (!cancelled) {
                        setHeroSlides(slides);
                        setCachedData(heroCacheKey, slides);
                    }
                }
            } catch (error) {
                console.error("Error fetching government hero slides:", error);
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
    const heroImages = resolvedHeroImages.length ? resolvedHeroImages : GOVT_HERO_IMAGES;
    const handleScrollNext = () => {
        const nextSection = heroRef.current === null || heroRef.current === void 0 ? void 0 : heroRef.current.nextElementSibling;
        if (nextSection instanceof HTMLElement) {
            nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    if (loading) {
        return (
            <div>
                <div style={{
                    position: "relative",
                    height: "360px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    background: "#eef2f9",
                }}>
                    <div style={{ textAlign: "center" }}>
                        <Skeleton className="h-6 w-40 mx-auto mb-4" />
                        <Skeleton className="h-10 w-72 mx-auto mb-3" />
                        <Skeleton className="h-4 w-80 mx-auto" />
                    </div>
                </div>
                <section style={{ padding: "5rem 2rem", background: "#fff" }}>
                    <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                            <Skeleton className="h-8 w-56 mx-auto mb-3" />
                            <Skeleton className="h-1 w-14 mx-auto mb-3" />
                            <Skeleton className="h-4 w-72 mx-auto" />
                        </div>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: "1.5rem",
                        }}>
                            {Array.from({ length: 8 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        background: "#fff",
                                        borderRadius: "10px",
                                        padding: "1.75rem 1.5rem",
                                        boxShadow: "0 3px 16px rgba(26,58,107,0.07)",
                                        border: "1px solid #eef2f9",
                                    }}
                                >
                                    <Skeleton className="h-10 w-10 mb-4" />
                                    <Skeleton className="h-5 w-40 mb-3" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }

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
        <HeroSlideshowBackground images={heroImages} intervalMs={4300} imageBrightness={0.45} overlay="linear-gradient(to bottom, rgba(13,37,89,0.2), rgba(13,37,89,0.3))"/>
        <motion.div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "#fff", padding: "0 1rem" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
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
            <span style={{ color: "#e8a020" }}>{t("nav.government")}</span>
          </div>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "#fff",
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            marginBottom: "0.75rem",
        }}>
            {t("government.heroTitle")}
          </h1>
          <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.85)", maxWidth: "600px", margin: "0 auto" }}>
            {t("government.heroSubtitle")}
          </p>
        </motion.div>
        <HeroScrollButton label={t("hero.scroll")} onClick={handleScrollNext}/>
      </div>

      {/* Structure Section */}
      <section style={{ padding: "5rem 2rem", background: "#fff" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <motion.div style={{ textAlign: "center", marginBottom: "3.5rem" }} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="section-title" style={{ display: "block", textAlign: "center" }}>
              {t("government.structureTitle")}
            </h2>
            <div style={{ width: "60px", height: "3px", background: "#e8a020", margin: "8px auto 1rem" }}/>
            <p className="section-subtitle" style={{ margin: "0 auto", textAlign: "center" }}>
              {t("government.structureSubtitle")}
            </p>
          </motion.div>

          {/* Departments Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
        }}>
            {departments.map((dept, idx) => {
                const name = dept.name || dept.slug || "";
                const description = dept.description || "";
                return (
                <motion.div key={dept.id || idx} custom={idx} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -5, boxShadow: "0 12px 36px rgba(26,58,107,0.14)" }} style={{
                    background: "#fff",
                    borderRadius: "10px",
                    padding: "1.75rem 1.5rem",
                    boxShadow: "0 3px 16px rgba(26,58,107,0.07)",
                    border: "1px solid #eef2f9",
                    cursor: "pointer",
                    borderTop: `4px solid ${deptColors[idx % deptColors.length]}`,
                }}>
                <div style={{
                width: "48px",
                height: "48px",
                background: deptBgs[idx % deptBgs.length],
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: deptColors[idx % deptColors.length],
                marginBottom: "1rem",
            }}>
                  {deptIcons[idx % deptIcons.length]}
                </div>
                <h3 style={{ color: "#1a2744", marginBottom: "0.6rem", fontSize: "1rem" }}>
                  {name}
                </h3>
                <p style={{ color: "#5a6a78", fontSize: "0.88rem", lineHeight: 1.65 }}>
                  {description}
                </p>
              </motion.div>
            );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: "4rem 2rem", background: "#f4f7fd" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 style={{ color: "#1a3a6b", marginBottom: "0.75rem", fontSize: "1.5rem", fontWeight: 700 }}>
              {t("government.ctaTitle")}
            </h3>
            <p style={{ color: "#5a6a78", maxWidth: "560px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
              {t("government.ctaSubtitle")}
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">{t("government.ctaPrimary")}</Link>
              <Link href="/services" className="btn-outline">{t("government.ctaSecondary")}</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>);
}
