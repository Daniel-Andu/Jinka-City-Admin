"use client";
import { Building2, MapPin, Phone, Mail, Clock, Facebook, Twitter, Youtube, Instagram, ChevronRight, ExternalLink, } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage, API_BASE } from "../context/LanguageContext";
const quickLinkHrefs = ["/about", "/government", "/government", "/government", "/news", "#", "#", "/contact"];
const serviceHrefs = ["/services", "/services", "/services", "/services", "/services", "/services", "/services", "/services"];
export default function Footer() {
    const { t } = useLanguage();
    // ensure translation arrays exist before rendering lists
    const quickLinks = Array.isArray(t("footer.quickLinks")) ? t("footer.quickLinks") : [];
    const serviceLinks = Array.isArray(t("footer.serviceLinks")) ? t("footer.serviceLinks") : [];
    const resources = Array.isArray(t("footer.resources")) ? t("footer.resources") : [];

    // newsletter subscription state
    const [subscribeEmail, setSubscribeEmail] = useState("");
    const [subscribeStatus, setSubscribeStatus] = useState(null); // null | 'success' | 'error'

    const handleSubscribe = async () => {
        if (!subscribeEmail) return;
        try {
            const res = await fetch(`${API_BASE}/api/public/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: subscribeEmail }),
            });
            if (res.ok) {
                setSubscribeStatus("success");
                setSubscribeEmail("");
            } else {
                const data = await res.json();
                console.error("Subscribe failed", data);
                setSubscribeStatus("error");
            }
        } catch (err) {
            console.error("Network error subscribing", err);
            setSubscribeStatus("error");
        }
    };
    return (<footer style={{ background: "#0d2559", color: "#c8d6ef" }}>
      {/* Main footer */}
      <div style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "4rem 2rem 2.5rem",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "3rem",
        }} className="footer-grid">
        {/* Column 1: About */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
            <div style={{
            width: "44px",
            height: "44px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
        }}>
              <Building2 size={22}/>
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>Jinka City</div>
              <div style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
        }}>
                Municipality
              </div>
            </div>
          </div>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "#8fa8cc", marginBottom: "1.5rem" }}>
            {t("footer.tagline")}
          </p>

          {/* Contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.84rem" }}>
              <MapPin size={14} style={{ color: "#e8a020", flexShrink: 0 }}/>
              {t("footer.address")}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.84rem" }}>
              <Phone size={14} style={{ color: "#e8a020", flexShrink: 0 }}/>
              <a href="tel:+251462205050" style={{ color: "#8fa8cc", textDecoration: "none" }}>
                +251 46 220 5050
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.84rem" }}>
              <Mail size={14} style={{ color: "#e8a020", flexShrink: 0 }}/>
              <a href="mailto:info@jinkacity.gov.et" style={{ color: "#8fa8cc", textDecoration: "none" }}>
                info@jinkacity.gov.et
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.84rem" }}>
              <Clock size={14} style={{ color: "#e8a020", flexShrink: 0 }}/>
              {t("footer.hours")}
            </div>
          </div>

          {/* Social */}
          <div style={{ display: "flex", gap: "10px", marginTop: "1.5rem" }}>
            {[
            { Icon: Facebook, label: "Facebook" },
            { Icon: Twitter, label: "Twitter" },
            { Icon: Youtube, label: "YouTube" },
            { Icon: Instagram, label: "Instagram" },
        ].map(({ Icon, label }) => (<motion.a key={label} href="#" aria-label={label} whileHover={{ scale: 1.15 }} style={{
                width: "36px",
                height: "36px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#8fa8cc",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
            }} onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e8a020";
                e.currentTarget.style.color = "#fff";
            }} onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "#8fa8cc";
            }}>
                <Icon size={15}/>
              </motion.a>))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 style={{
            color: "#fff",
            fontWeight: 700,
            marginBottom: "1.25rem",
            fontSize: "0.9rem",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            borderBottom: "2px solid #e8a020",
            paddingBottom: "0.6rem",
            display: "inline-block",
        }}>
            {t("footer.quickLinksTitle")}
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {quickLinks.map((link, i) => (<li key={link}>
                <Link href={quickLinkHrefs[i] || "#"} style={{
                color: "#8fa8cc",
                textDecoration: "none",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "color 0.2s",
            }} onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#8fa8cc"; }}>
                  <ChevronRight size={13} style={{ color: "#e8a020" }}/>
                  {link}
                </Link>
              </li>))}
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 style={{
            color: "#fff",
            fontWeight: 700,
            marginBottom: "1.25rem",
            fontSize: "0.9rem",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            borderBottom: "2px solid #e8a020",
            paddingBottom: "0.6rem",
            display: "inline-block",
        }}>
            {t("footer.servicesTitle")}
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {serviceLinks.map((link, i) => (<li key={link}>
                <Link href={serviceHrefs[i] || "/services"} style={{
                color: "#8fa8cc",
                textDecoration: "none",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "color 0.2s",
            }} onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#8fa8cc"; }}>
                  <ChevronRight size={13} style={{ color: "#e8a020" }}/>
                  {link}
                </Link>
              </li>))}
          </ul>
        </div>

        {/* Column 4: Resources */}
        <div>
          <h4 style={{
            color: "#fff",
            fontWeight: 700,
            marginBottom: "1.25rem",
            fontSize: "0.9rem",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            borderBottom: "2px solid #e8a020",
            paddingBottom: "0.6rem",
            display: "inline-block",
        }}>
            {t("footer.resourcesTitle")}
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {resources.map((link) => (<li key={link}>
                <a href="#" style={{
                color: "#8fa8cc",
                textDecoration: "none",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "color 0.2s",
            }} onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#8fa8cc"; }}>
                  <ExternalLink size={12} style={{ color: "#e8a020" }}/>
                  {link}
                </a>
              </li>))}
          </ul>

          {/* Newsletter */}
          <div style={{ marginTop: "2rem" }}>
            <p style={{ color: "#c8d6ef", fontSize: "0.84rem", marginBottom: "0.75rem", fontWeight: 600 }}>
              {t("footer.newsletterLabel")}
            </p>
            <div style={{
            display: "flex",
            gap: "0",
            borderRadius: "4px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.15)",
        }}>
              <input
                type="email"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                placeholder={t("footer.newsletterPlaceholder")}
                style={{
            flex: 1,
            background: "rgba(255,255,255,0.07)",
            border: "none",
            padding: "0.55rem 0.85rem",
            color: "#fff",
            fontSize: "0.82rem",
            outline: "none",
            minWidth: 0,
        }}/>
              <button
                onClick={handleSubscribe}
                disabled={!subscribeEmail}
                style={{
            background: "#e8a020",
            color: "#fff",
            border: "none",
            padding: "0.55rem 1rem",
            fontWeight: 700,
            fontSize: "0.78rem",
            cursor: "pointer",
            transition: "background 0.2s",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
        }} onMouseEnter={(e) => { e.currentTarget.style.background = "#cf8c15"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#e8a020"; }}>
                {t("footer.subscribeBtnLabel")}
              </button>
            </div>
            {subscribeStatus === "success" && (
              <p style={{ color: "#2a8a5c", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                {t("footer.subscribeSuccess") || "Subscribed!"}
              </p>
            )}
            {subscribeStatus === "error" && (
              <p style={{ color: "#d33", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                {t("footer.subscribeError") || "Failed to subscribe"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "1.1rem 2rem",
            maxWidth: "1440px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
        }}>
        <p style={{ fontSize: "0.8rem", color: "#6a88b5", margin: 0 }}>
          {t("footer.copyright")}
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {[t("footer.privacyPolicy"), t("footer.termsOfUse"), t("footer.accessibility"), t("footer.sitemap")].map((item) => (<a key={item} href="#" style={{ color: "#6a88b5", fontSize: "0.78rem", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#6a88b5"; }}>
              {item}
            </a>))}
        </div>
      </div>

      {/* Responsive footer grid */}
      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>);
}
