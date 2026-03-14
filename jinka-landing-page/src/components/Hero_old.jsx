"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import HeroScrollButton from "./HeroScrollButton";
import HeroSlideshowBackground from "./HeroSlideshowBackground";
import { useLanguage, API_BASE } from "../context/LanguageContext";
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
    const [heroSlides, setHeroSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const heroRef = useRef(null);

    useEffect(() => {
        const fetchHeroSlides = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/public/hero?lang=${currentLang}&page=home`);
                if (response.ok) {
                    const data = await response.json();
                    setHeroSlides(data.data || []);
                }
            } catch (error) {
                console.error("Error fetching hero slides:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHeroSlides();
    }, [currentLang]);

    const heroImages = heroSlides.map(slide => slide.image) || [
        "https://images.unsplash.com/photo-1666830320769-e979b6b82c38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYXdhc3NhJTIwRXRoaW9waWElMjBsYWtlJTIwY2l0eSUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODAzNjUzfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ];

    const handleScrollNext = () => {
        const nextSection = heroRef.current?.nextElementSibling;
        if (nextSection instanceof HTMLElement) {
            nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (loading) {
        return <div>Loading hero...</div>;
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
            {t.hero.btnServices}
          </Link>
          <Link href="/about" className="hero-btn-outline">
            {t.hero.btnLearnMore}
          </Link>
        </motion.div>
      </motion.div>

      <HeroScrollButton label={t.hero.scroll} onClick={handleScrollNext}/>
    </section>);
}
