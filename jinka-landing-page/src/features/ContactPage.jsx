"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ChevronRight } from "lucide-react";
import HeroScrollButton from "../components/HeroScrollButton";
import HeroSlideshowBackground from "../components/HeroSlideshowBackground";
import { useLanguage, API_BASE } from "../context/LanguageContext";
import { getCachedData, setCachedData } from "../lib/dataCache";
import { resolveMediaUrl } from "../lib/media";
const CONTACT_HERO_IMAGES = [
    "https://images.unsplash.com/photo-1765475467677-579353b25ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjBjaXR5JTIwdXJiYW4lMjBkZXZlbG9wbWVudCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1764145177622-8317fbfe1877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNvbW11bml0eSUyMHBlb3BsZSUyMGdhdGhlcmluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzcyODA0MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1604560842632-bd795d8f1275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYW4lMjBnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
];
const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "0.92rem",
    color: "#1a2744",
    outline: "none",
    transition: "border-color 0.2s",
    background: "#fff",
    boxSizing: "border-box",
};
export default function ContactPage() {
    const { t, currentLang } = useLanguage();
    const c = t("contact");
    const heroRef = useRef(null);
    const heroCacheKey = `hero:contact:${currentLang}`;
    const cachedHero = getCachedData(heroCacheKey);
    const [heroSlides, setHeroSlides] = useState(cachedHero || []);
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    useEffect(() => {
        const cached = getCachedData(heroCacheKey);
        if (cached) {
            setHeroSlides(cached);
            return;
        }

        let cancelled = false;
        const fetchHeroSlides = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/public/hero?lang=${currentLang}&page=contact`);
                if (response.ok) {
                    const data = await response.json();
                    const slides = data.data || [];
                    if (!cancelled) {
                        setHeroSlides(slides);
                        setCachedData(heroCacheKey, slides);
                    }
                }
            } catch (error) {
                console.error("Error fetching contact hero slides:", error);
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
    const heroImages = resolvedHeroImages.length ? resolvedHeroImages : CONTACT_HERO_IMAGES;
    const handleScrollNext = () => {
        const nextSection = heroRef.current === null || heroRef.current === void 0 ? void 0 : heroRef.current.nextElementSibling;
        if (nextSection instanceof HTMLElement) {
            nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // send data to backend API
            const res = await fetch(`${API_BASE}/api/public/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setSent(true);
                setForm({ name: "", email: "", subject: "", message: "" });
            } else {
                const data = await res.json();
                console.error("Contact submit failed:", data);
                alert(data.error || "Failed to send message");
            }
        } catch (err) {
            console.error("Network error sending contact message:", err);
            alert("Network error, please try again later.");
        }
    };
    return (<div>
      {/* Page Hero */}
      <div ref={heroRef} style={{
            position: "relative",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
        }}>
        <HeroSlideshowBackground images={heroImages} intervalMs={4200} imageBrightness={0.4} overlay="linear-gradient(to bottom, rgba(13,37,89,0.2), rgba(13,37,89,0.3))"/>
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
            <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={13}/>
            <span style={{ color: "#e8a020" }}>Contact</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, textShadow: "0 2px 12px rgba(0,0,0,0.3)", marginBottom: "0.75rem" }}>
            {c.heroTitle}
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", maxWidth: "520px", margin: "0 auto" }}>
            {c.heroSubtitle}
          </p>
        </motion.div>
        <HeroScrollButton label={t("hero.scroll")} onClick={handleScrollNext}/>
      </div>

      {/* Contact Content */}
      <section style={{ padding: "5rem 2rem", background: "#f9fbff" }}>
        <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "3.5rem",
            alignItems: "start",
        }} className="contact-grid">
          {/* Left: Info */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
              {c.officeTitle}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
              {[
            { Icon: MapPin, label: c.officeAddress, color: "#1a3a6b" },
            { Icon: Phone, label: "+251 46 220 5050", color: "#e8a020" },
            { Icon: Mail, label: "info@jinkacity.gov.et", color: "#1a7ab5" },
            { Icon: Clock, label: c.hours, color: "#2a8a5c" },
        ].map(({ Icon, label, color }, i) => (<motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{
                width: "44px",
                height: "44px",
                background: "#fff",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 10px rgba(26,58,107,0.08)",
                color,
            }}>
                    <Icon size={19}/>
                  </div>
                  <div style={{ paddingTop: "0.25rem" }}>
                    <p style={{ color: "#1a2744", fontSize: "0.9rem", lineHeight: 1.55 }}>{label}</p>
                  </div>
                </motion.div>))}
            </div>

            {/* Map placeholder */}
            <div style={{
            background: "#e8eefc",
            borderRadius: "12px",
            height: "220px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "0.5rem",
            border: "1px solid #d4dff5",
            color: "#1a3a6b",
        }}>
              <MapPin size={32}/>
              <p style={{ fontWeight: 700, fontSize: "0.9rem" }}>Jinka City, South Omo Zone</p>
              <p style={{ fontSize: "0.78rem", color: "#5a6a8a" }}>7.053° N, 38.476° E</p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} style={{
            background: "#fff",
            borderRadius: "14px",
            padding: "2.5rem",
            boxShadow: "0 6px 30px rgba(26,58,107,0.08)",
            border: "1px solid #eef2f9",
        }}>
            {sent ? (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <CheckCircle size={56} style={{ color: "#2a8a5c", margin: "0 auto 1.25rem" }}/>
                <h3 style={{ color: "#1a3a6b", marginBottom: "0.75rem", fontSize: "1.3rem" }}>
                  Message Sent!
                </h3>
                <p style={{ color: "#5a6a8a", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  Thank you for contacting Jinka City Administration. We will respond within 2 business days.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }} style={{
                background: "#1a3a6b",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "0.7rem 1.6rem",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.9rem",
            }}>
                  Send Another Message
                </button>
              </motion.div>) : (<>
                <h2 style={{ color: "#1a3a6b", marginBottom: "0.4rem", fontSize: "1.3rem", fontWeight: 700 }}>
                  {c.getInTouchTitle}
                </h2>
                <p style={{ color: "#8a99b5", fontSize: "0.88rem", marginBottom: "1.75rem" }}>
                  {c.getInTouchSubtitle}
                </p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
                    <div>
                      <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a2744", display: "block", marginBottom: "0.35rem" }}>
                        {c.formName}
                      </label>
                      <input required type="text" value={form.name} onChange={(e) => setForm(Object.assign(Object.assign({}, form), { name: e.target.value }))} style={inputStyle} onFocus={(e) => { e.currentTarget.style.borderColor = "#1a3a6b"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; }}/>
                    </div>
                    <div>
                      <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a2744", display: "block", marginBottom: "0.35rem" }}>
                        {c.formEmail}
                      </label>
                      <input required type="email" value={form.email} onChange={(e) => setForm(Object.assign(Object.assign({}, form), { email: e.target.value }))} style={inputStyle} onFocus={(e) => { e.currentTarget.style.borderColor = "#1a3a6b"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; }}/>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a2744", display: "block", marginBottom: "0.35rem" }}>
                      {c.formSubject}
                    </label>
                    <input required type="text" value={form.subject} onChange={(e) => setForm(Object.assign(Object.assign({}, form), { subject: e.target.value }))} style={inputStyle} onFocus={(e) => { e.currentTarget.style.borderColor = "#1a3a6b"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; }}/>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a2744", display: "block", marginBottom: "0.35rem" }}>
                      {c.formMessage}
                    </label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm(Object.assign(Object.assign({}, form), { message: e.target.value }))} style={Object.assign(Object.assign({}, inputStyle), { resize: "vertical", minHeight: "130px", fontFamily: "inherit" })} onFocus={(e) => { e.currentTarget.style.borderColor = "#1a3a6b"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; }}/>
                  </div>
                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{
                background: "#1a3a6b",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "0.85rem 2rem",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                transition: "background 0.2s",
            }} onMouseEnter={(e) => { e.currentTarget.style.background = "#0f2548"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#1a3a6b"; }}>
                    <Send size={16}/>
                    {c.formSend}
                  </motion.button>
                </form>
              </>)}
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>);
}
