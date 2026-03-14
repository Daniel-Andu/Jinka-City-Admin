"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FileText, Building, Droplets, Zap, TreePine, Trash2, ShieldCheck, HeartPulse, GraduationCap, Bus, Briefcase, BarChart3, ArrowRight, ChevronRight, Search, } from "lucide-react";
import HeroScrollButton from "../components/HeroScrollButton";
import HeroSlideshowBackground from "../components/HeroSlideshowBackground";
import { useLanguage, API_BASE } from "../context/LanguageContext";
import { getCachedData, setCachedData } from "../lib/dataCache";
import { Skeleton } from "../components/ui/skeleton";
import { resolveMediaUrl } from "../lib/media";
const icons = [
    <FileText size={26}/>, <Building size={26}/>, <Droplets size={26}/>,
    <Zap size={26}/>, <TreePine size={26}/>, <Trash2 size={26}/>,
    <ShieldCheck size={26}/>, <HeartPulse size={26}/>, <GraduationCap size={26}/>,
    <Bus size={26}/>, <Briefcase size={26}/>, <BarChart3 size={26}/>,
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
const SERVICES_HERO_IMAGES = [
    "https://images.unsplash.com/photo-1604560842632-bd795d8f1275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYW4lMjBnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1765475467677-579353b25ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjBjaXR5JTIwdXJiYW4lMjBkZXZlbG9wbWVudCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1722725384325-7ba56456db3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbGFrZSUyMHN1bnNldCUyMG5hdHVyZSUyMHNjZW5lcnl8ZW58MXx8fHwxNzcyODA0MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
];
export default function ServicesPage() {
    const { t, currentLang } = useLanguage();
    const heroRef = useRef(null);
    const [search, setSearch] = useState("");
    const cacheKey = `servicesPage:${currentLang}`;
    const cachedServices = getCachedData(cacheKey);
    const [services, setServices] = useState(cachedServices || []);
    const [loading, setLoading] = useState(!cachedServices);
    const heroCacheKey = `hero:services:${currentLang}`;
    const cachedHero = getCachedData(heroCacheKey);
    const [heroSlides, setHeroSlides] = useState(cachedHero || []);

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

    useEffect(() => {
        const cached = getCachedData(heroCacheKey);
        if (cached) {
            setHeroSlides(cached);
            return;
        }

        let cancelled = false;
        const fetchHeroSlides = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/public/hero?lang=${currentLang}&page=services`);
                if (response.ok) {
                    const data = await response.json();
                    const slides = data.data || [];
                    if (!cancelled) {
                        setHeroSlides(slides);
                        setCachedData(heroCacheKey, slides);
                    }
                }
            } catch (error) {
                console.error("Error fetching services hero slides:", error);
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
    const heroImages = resolvedHeroImages.length ? resolvedHeroImages : SERVICES_HERO_IMAGES;

    const handleScrollNext = () => {
        const nextSection = heroRef.current === null || heroRef.current === void 0 ? void 0 : heroRef.current.nextElementSibling;
        if (nextSection instanceof HTMLElement) {
            nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const filtered = services.filter((item) => item.title && item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description && item.description.toLowerCase().includes(search.toLowerCase()));

    if (loading) {
        return (
            <div>
                <div style={{
                    position: "relative",
                    height: "320px",
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
                <section style={{ padding: "5rem 2rem", background: "#f9fbff" }}>
                    <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                            <Skeleton className="h-8 w-56 mx-auto mb-3" />
                            <Skeleton className="h-1 w-14 mx-auto mb-3" />
                            <Skeleton className="h-4 w-72 mx-auto" />
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                                gap: "1.5rem",
                            }}
                        >
                            {Array.from({ length: 8 }).map((_, idx) => (
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
                    </div>
                </section>
            </div>
        );
    }
    return (<div>
      {/* Page Hero */}
      <div ref={heroRef} style={{
            position: "relative",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
        }}>
        <HeroSlideshowBackground images={heroImages} intervalMs={4200} imageBrightness={0.4} overlay="linear-gradient(to bottom, rgba(13,37,89,0.2), rgba(13,37,89,0.25))"/>
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
            <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>{t("services.breadcrumbHome")}</Link>
            <ChevronRight size={13}/>
            <span style={{ color: "#e8a020" }}>{t("services.breadcrumbServices")}</span>
          </div>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            marginBottom: "0.75rem",
        }}>
            {t("services.heroTitle")}
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", maxWidth: "560px", margin: "0 auto" }}>
            {t("services.heroSubtitle")}
          </p>
        </motion.div>
        <HeroScrollButton label={t("hero.scroll")} onClick={handleScrollNext}/>
      </div>

      {/* Search + Grid */}
      <section style={{ padding: "5rem 2rem", background: "#f9fbff" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <motion.div style={{ textAlign: "center", marginBottom: "3rem" }} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="section-title" style={{ display: "block", textAlign: "center" }}>
              {t("services.allServicesTitle")}
            </h2>
            <div style={{ width: "60px", height: "3px", background: "#e8a020", margin: "8px auto 1rem" }}/>
            <p className="section-subtitle" style={{ margin: "0 auto 2rem", textAlign: "center" }}>
              {t("services.allServicesSubtitle")}
            </p>

            {/* Search bar */}
            <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "0.65rem 1.2rem",
            maxWidth: "480px",
            margin: "0 auto",
            boxShadow: "0 2px 12px rgba(26,58,107,0.06)",
        }}>
              <Search size={17} style={{ color: "#8a99b5", flexShrink: 0 }}/>
              <input type="text" placeholder={t("services.searchPlaceholder")} value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1, border: "none", outline: "none", fontSize: "0.92rem", color: "#1a2744", background: "transparent" }}/>
            </div>
          </motion.div>

          {/* Cards */}
          <AnimatePresence mode="popLayout">
            <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.5rem",
        }}>
              {filtered.map((service, idx) => {
            const { color, bg } = serviceColors[services.indexOf(service)];
            return (<motion.div key={service.title} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.04 }} whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(26,58,107,0.12)" }} style={{
                    background: "#fff",
                    borderRadius: "10px",
                    padding: "1.75rem 1.5rem",
                    boxShadow: "0 2px 12px rgba(26,58,107,0.06)",
                    border: "1px solid #eef2f9",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                }}>
                    <div style={{
                    width: "56px",
                    height: "56px",
                    background: bg,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color,
                }}>
                      {icons[services.indexOf(service)]}
                    </div>
                    <h3 style={{ color: "#1a2744", fontSize: "1rem", margin: 0 }}>{service.title}</h3>
                    <p style={{ color: "#5a6a8a", fontSize: "0.88rem", lineHeight: 1.65, margin: 0, flexGrow: 1 }}>
                      {service.description}
                    </p>
                    <a href="#" style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    color,
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    textDecoration: "none",
                }}>
                      {t("services.btnAccess")} <ArrowRight size={14}/>
                    </a>
                  </motion.div>);
        })}
            </div>
          </AnimatePresence>

          {filtered.length === 0 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "4rem 0", color: "#8a99b5" }}>
              <p style={{ fontSize: "1.1rem" }}>{t("services.noResults", { search })}</p>
              <button onClick={() => setSearch("")} style={{
                marginTop: "1rem",
                background: "#1a3a6b",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "0.6rem 1.4rem",
                cursor: "pointer",
                fontWeight: 600,
            }}>
                {t("services.clearSearch")}
              </button>
            </motion.div>)}
        </div>
      </section>
    </div>);
}
