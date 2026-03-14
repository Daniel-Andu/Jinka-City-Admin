"use client";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
const NEWS_IMAGES = [
    "https://images.unsplash.com/photo-1771495604392-2008757fb32a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNpdHklMjBpbmZyYXN0cnVjdHVyZSUyMGRldmVsb3BtZW50JTIwcHJvamVjdHxlbnwxfHx8fDE3NzI4MDM2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1680686096607-368be87896ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNvbW11bml0eSUyMHNvY2lhbCUyMHByb2dyYW0lMjBldmVudHxlbnwxfHx8fDE3NzI4MDM2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1620996148754-c4b4fa9aca78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjB1cmJhbiUyMGNpdHklMjBwYXJrJTIwcHVibGljJTIwc3BhY2V8ZW58MXx8fHwxNzcyODAzNjU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
];
const NEWS_DATES = ["February 20, 2026", "February 14, 2026", "January 30, 2026"];
const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
    }),
};
export default function NewsUpdates() {
    const { t } = useLanguage();
    return (<section id="announcements" style={{ padding: "5rem 2rem", background: "#f9fbff" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
        }} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div>
            <h2 className="section-title">{news.sectionTitle}</h2>
            <p className="section-subtitle" style={{ marginTop: "0.5rem" }}>
              {news.sectionSubtitle}
            </p>
          </div>
          <Link href="/news" style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#1a3a6b",
            fontWeight: 700,
            fontSize: "0.88rem",
            textDecoration: "none",
            whiteSpace: "nowrap",
        }}>
            {news.btnViewAll} <ArrowRight size={15}/>
          </Link>
        </motion.div>

        {/* Cards */}
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.75rem",
        }}>
          {news.items.map((item, idx) => (<motion.article key={idx} custom={idx} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -6, boxShadow: "0 14px 40px rgba(26, 58, 107, 0.15)" }} style={{
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 20px rgba(26, 58, 107, 0.07)",
                overflow: "hidden",
                cursor: "pointer",
            }}>
              {/* Image */}
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <motion.img src={NEWS_IMAGES[idx]} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}/>
                {/* Category badge */}
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
                  <Tag size={10}/> {item.category}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: "1.5rem" }}>
                <div style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#8a99b5",
                fontSize: "0.78rem",
                marginBottom: "0.75rem",
            }}>
                  <Calendar size={12}/> {NEWS_DATES[idx]}
                </div>
                <h3 style={{ color: "#1a2744", marginBottom: "0.75rem", lineHeight: 1.45 }}>
                  {item.title}
                </h3>
                <p style={{
                color: "#5a6a8a",
                fontSize: "0.88rem",
                lineHeight: 1.7,
                marginBottom: "1.25rem",
            }}>
                  {item.excerpt}
                </p>
                <Link href="/news" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                color: "#1a3a6b",
                fontWeight: 700,
                fontSize: "0.82rem",
                textDecoration: "none",
            }}>
                  {news.btnReadMore} <ArrowRight size={14}/>
                </Link>
              </div>
            </motion.article>))}
        </div>
      </div>
    </section>);
}
