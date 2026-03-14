"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLanguage, API_BASE } from "../context/LanguageContext";
import { getCachedData, setCachedData } from "../lib/dataCache";
import { resolveMediaUrl } from "../lib/media";
import { Skeleton } from "./ui/skeleton";
import "../styles/mayor.css";
 const MAYOR_IMAGE = "Jinkamayor.jpg";
// const MAYOR_IMAGE = "https://images.unsplash.com/photo-1731093714827-ba0353e09bfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWF5b3IlMjBnb3Zlcm5tZW50JTIwb2ZmaWNpYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI4MDM2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080";
export default function Mayor() {
    const { t, currentLang } = useLanguage();
    const cacheKey = `mayor:${currentLang}`;
    const cachedMayor = getCachedData(cacheKey);
    const [mayor, setMayor] = useState(cachedMayor || null);
    const [loading, setLoading] = useState(!cachedMayor);

    useEffect(() => {
        const cached = getCachedData(cacheKey);
        if (cached) {
            setMayor(cached);
            setLoading(false);
            return;
        }

        let cancelled = false;
        const fetchMayor = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/public/mayor?lang=${currentLang}`);
                if (response.ok) {
                    const data = await response.json();
                    const nextMayor = data.data || null;
                    if (!cancelled) {
                        setMayor(nextMayor);
                        setCachedData(cacheKey, nextMayor);
                    }
                }
            } catch (error) {
                console.error("Error fetching mayor:", error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchMayor();
        return () => {
            cancelled = true;
        };
    }, [currentLang, cacheKey]);

    const messageParagraphs = (() => {
        if (mayor?.message) {
            return mayor.message
                .split(/\n\s*\n/)
                .map((msg) => msg.trim())
                .filter(Boolean);
        }
        const msgs = t("mayor.messages");
        return Array.isArray(msgs) ? msgs : msgs ? [msgs] : [];
    })();

    const mayorName = mayor?.name || t("mayor.signatureName") || t("mayor.nameQuote");
    const mayorPosition = mayor?.position || t("mayor.signatureTitle");
    const mayorPhoto = resolveMediaUrl(mayor?.photo) || MAYOR_IMAGE;

    if (loading) {
        return (
            <section className="mayor-section" id="government">
                <div className="mayor-inner">
                    <div className="mayor-content">
                        <Skeleton className="h-5 w-32 mb-4" />
                        <Skeleton className="h-8 w-56 mb-3" />
                        <Skeleton className="h-5 w-40 mb-4" />
                        <Skeleton className="h-1 w-20 mb-6" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6 mb-2" />
                        <Skeleton className="h-4 w-4/6 mb-6" />
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-4 w-40 mb-6" />
                        <Skeleton className="h-10 w-40" />
                    </div>
                    <div className="mayor-image-wrap">
                        <Skeleton className="h-[360px] w-[280px] rounded-xl" />
                    </div>
                </div>
            </section>
        );
    }

    return (<section className="mayor-section" id="government">
      <div className="mayor-inner">
        {/* Left: Text Content */}
        <motion.div className="mayor-content" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <span className="mayor-tag">{t("mayor.tag")}</span>
          <h2 className="mayor-title">{t("mayor.title")}</h2>
          <span className="mayor-name">{mayorName}</span>
          <div className="mayor-divider"/>
          {messageParagraphs.map((msg, i) => (
            <p key={i} className="mayor-message">
              {msg}
            </p>
          ))}
          <div className="mayor-signature">
            <span className="mayor-signature-name">{mayorName}</span>
            <span className="mayor-signature-title">{mayorPosition}</span>
          </div>
          <motion.a href="#" className="btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            {t("mayor.btnReadMore")}
          </motion.a>
        </motion.div>

        {/* Right: Image */}
        <motion.div className="mayor-image-wrap" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}>
          <div className="mayor-image-bg"/>
          <div className="mayor-image-accent"/>
          <img src={mayorPhoto} alt="Mayor of Jinka City" className="mayor-image"/>
          <motion.div className="mayor-badge" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.4 }}>
            <div className="mayor-badge-title">{t("mayor.cityMayorLabel")}</div>
            <div className="mayor-badge-name">{mayorName}</div>
            <div className="mayor-badge-years">{t("mayor.yearsLabel")}</div>
          </motion.div>
        </motion.div>
      </div>
    </section>);
}
