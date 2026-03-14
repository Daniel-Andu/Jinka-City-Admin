"use client";
import { useRef, useState ,useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Tag, ChevronRight } from "lucide-react";
import HeroScrollButton from "../components/HeroScrollButton";
import HeroSlideshowBackground from "../components/HeroSlideshowBackground";
import { useLanguage, API_BASE } from "../context/LanguageContext";
import { getCachedData, setCachedData } from "../lib/dataCache";
import { resolveMediaUrl } from "../lib/media";
import { Skeleton } from "../components/ui/skeleton";

const NEWS_HERO_IMAGES = [
    "https://images.unsplash.com/photo-1771495604392-2008757fb32a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNpdHklMjBpbmZyYXN0cnVjdHVyZSUyMGRldmVsb3BtZW50JTIwcHJvamVjdHxlbnwxfHx8fDE3NzI4MDM2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1680686096607-368be87896ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNvbW11bml0eSUyMHNvY2lhbCUyMHByb2dyYW0lMjBldmVudHxlbnwxfHx8fDE3NzI4MDM2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1620996148754-c4b4fa9aca78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjB1cmJhbiUyMGNpdHklMjBwYXJrJTIwcHVibGljJTIwc3BhY2V8ZW58MXx8fHwxNzcyODAzNjU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
];
const enCategories = ["All", "Infrastructure", "Community", "Environment", "Health", "Education", "Economy"];
export default function NewsPage() {
    const { t, currentLang } = useLanguage();
    const heroRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const cacheKey = `newsPage:${currentLang}`;
    const cached = getCachedData(cacheKey);
    const [news, setNews] = useState(cached?.news || []);
    const [categories, setCategories] = useState(cached?.categories || []);
    const [loading, setLoading] = useState(!cached);
    const heroCacheKey = `hero:news:${currentLang}`;
    const cachedHero = getCachedData(heroCacheKey);
    const [heroSlides, setHeroSlides] = useState(cachedHero || []);
    useEffect(() => {
        const cachedData = getCachedData(cacheKey);
        if (cachedData) {
            setNews(cachedData.news || []);
            setCategories(cachedData.categories || []);
            setLoading(false);
            return;
        }

        let cancelled = false;
        const fetchData = async () => {
            try {
                if (!cancelled) {
                    setLoading(true);
                }
                const [newsResponse, bootstrapResponse] = await Promise.all([
                    fetch(`${API_BASE}/api/public/news?lang=${currentLang}&limit=20`),
                    fetch(`${API_BASE}/api/public/bootstrap?lang=${currentLang}`)
                ]);

                let nextNews = [];
                let nextCategories = [];

                if (newsResponse.ok) {
                    const newsData = await newsResponse.json();
                    nextNews = newsData.data || [];
                    if (!cancelled) {
                        setNews(nextNews);
                    }
                }

                if (bootstrapResponse.ok) {
                    const bootstrapData = await bootstrapResponse.json();
                    nextCategories = bootstrapData.newsCategories || [];
                    if (!cancelled) {
                        setCategories(nextCategories);
                    }
                }

                if (!cancelled && newsResponse.ok && bootstrapResponse.ok) {
                    setCachedData(cacheKey, {
                        news: nextNews,
                        categories: nextCategories,
                    });
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };
        fetchData();
        return () => {
            cancelled = true;
        };
    }, [currentLang, cacheKey]);

    useEffect(() => {
        const cachedData = getCachedData(heroCacheKey);
        if (cachedData) {
            setHeroSlides(cachedData);
            return;
        }

        let cancelled = false;
        const fetchHeroSlides = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/public/hero?lang=${currentLang}&page=news`);
                if (response.ok) {
                    const data = await response.json();
                    const slides = data.data || [];
                    if (!cancelled) {
                        setHeroSlides(slides);
                        setCachedData(heroCacheKey, slides);
                    }
                }
            } catch (error) {
                console.error("Error fetching news hero slides:", error);
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
    const heroImages = resolvedHeroImages.length ? resolvedHeroImages : NEWS_HERO_IMAGES;

    const handleScrollNext = () => {
        const nextSection = heroRef.current === null || heroRef.current === void 0 ? void 0 : heroRef.current.nextElementSibling;
        if (nextSection instanceof HTMLElement) {
            nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // translation key for category labels lives under the `newsPage` namespace
    // fall back to the hardcoded english array if translations are missing or malformed
    const rawCategories = t("newsPage.categories");
    const translatedCategories = Array.isArray(rawCategories) ? rawCategories : enCategories;

    const getCategory = (item) => {
        return item.category_name || item.category_slug || "General";
    };

    // if the language changes and the translated categories array is different,
    // make sure the activeCategory state remains valid and starts on the first entry
    useEffect(() => {
      if (!translatedCategories.includes(activeCategory)) {
        setActiveCategory(translatedCategories[0] || "All");
      }
    }, [translatedCategories]);

    const filtered = activeCategory === "All" || activeCategory === translatedCategories[0]
        ? news
        : news.filter((item) => {
            const catIdx = translatedCategories.indexOf(activeCategory);
            return item.category_slug === categories[catIdx - 1]?.slug; // -1 because categories[0] is "All"
        });

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
                        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "2.5rem", justifyContent: "center" }}>
                            {Array.from({ length: 6 }).map((_, idx) => (
                                <Skeleton key={idx} className="h-9 w-28 rounded-full" />
                            ))}
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: "1.75rem",
                            }}
                        >
                            {Array.from({ length: 6 }).map((_, idx) => (
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
        <HeroSlideshowBackground images={heroImages} intervalMs={4200} imageBrightness={0.4} overlay="linear-gradient(to bottom, rgba(13,37,89,0.2), rgba(13,37,89,0.35))"/>
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
            <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>{t("news.breadcrumbHome")}</Link>
            <ChevronRight size={13}/>
            <span style={{ color: "#e8a020" }}>{t("news.breadcrumbNews")}</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, textShadow: "0 2px 12px rgba(0,0,0,0.3)", marginBottom: "0.75rem" }}>
            {t("news.heroTitle")}
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", maxWidth: "560px", margin: "0 auto" }}>
            {t("news.heroSubtitle")}
          </p>
        </motion.div>
        <HeroScrollButton label={t("hero.scroll")} onClick={handleScrollNext}/>
      </div>

      {/* News Grid */}
      <section style={{ padding: "5rem 2rem", background: "#f9fbff" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          {/* Category filters */}
          <motion.div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "2.5rem", justifyContent: "center" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {translatedCategories.map((cat) => (<button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: "0.45rem 1.1rem",
                borderRadius: "20px",
                border: "2px solid",
                borderColor: activeCategory === cat ? "#1a3a6b" : "#e2e8f0",
                background: activeCategory === cat ? "#1a3a6b" : "#fff",
                color: activeCategory === cat ? "#fff" : "#5a6a8a",
                fontWeight: 600,
                fontSize: "0.82rem",
                cursor: "pointer",
                transition: "all 0.2s",
            }}>
                {cat}
              </button>))}
          </motion.div>

          {/* Cards */}
          <AnimatePresence mode="popLayout">
            <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.75rem",
        }}>
              {filtered.map((item, idx) => (<motion.article key={item.id || idx} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.07 }} whileHover={{ y: -5, boxShadow: "0 14px 40px rgba(26,58,107,0.14)" }} style={{
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 20px rgba(26,58,107,0.07)",
                overflow: "hidden",
                cursor: "pointer",
            }}>
                  <div style={{ position: "relative", height: "210px", overflow: "hidden" }}>
                    <motion.img src={resolveMediaUrl(item.featured_image)} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} whileHover={{ scale: 1.06 }} transition={{ duration: 0.4 }}/>
                    <span style={{
                position: "absolute",
                top: "14px",
                left: "14px",
                background: "#1a3a6b",
                color: "#fff",
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "0.25rem 0.7rem",
                borderRadius: "3px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
            }}>
                      <Tag size={10}/> {getCategory(item)}
                    </span>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <div style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#8a99b5",
                fontSize: "0.78rem",
                marginBottom: "0.75rem",
            }}>
                      <Calendar size={12}/> {new Date(item.created_at).toLocaleDateString(currentLang === 'am' ? 'am-ET' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h3 style={{ color: "#1a2744", marginBottom: "0.75rem", lineHeight: 1.45 }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "#5a6a8a", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                      {(item.excerpt && item.excerpt.trim()) || (item.content ? `${item.content.substring(0, 160)}...` : "")}
                    </p>
                    <Link href={`/news/${item.slug}`} style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                color: "#1a3a6b",
                fontWeight: 700,
                fontSize: "0.82rem",
                textDecoration: "none",
            }}>
                      {t("news.btnReadMore")} <ArrowRight size={14}/>
                    </Link>
                  </div>
                </motion.article>))}
            </div>
          </AnimatePresence>
        </div>
      </section>
    </div>);
}
