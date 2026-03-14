"use client";
import { Phone, Globe, Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/navbar.css";
export default function TopBar() {
    const { currentLang, switchLanguage, t } = useLanguage();
    return (<div className="topbar">
      <div style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
        }}>
        {/* Left: country & phone */}
        <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            🇪🇹
            <span>{t("topbar.country")}</span>
          </span>
          <span className="topbar-divider"/>
          <a href="tel:+251462205050" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Phone size={12}/>
            +251 46 220 5050
          </a>
        </div>

        {/* Right: language toggle + social */}
        <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
          <button onClick={() => switchLanguage("en")} style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
            background: "none",
            border: "none",
            color: currentLang === "en" ? "#ffffff" : "#b8ccee",
            fontWeight: currentLang === "en" ? 700 : 400,
            fontSize: "0.82rem",
            padding: "0 4px",
            transition: "color 0.2s",
        }}>
            <Globe size={12}/>
            English
          </button>
          <span className="topbar-divider"/>
          <button onClick={() => switchLanguage("am")} style={{
            cursor: "pointer",
            background: "none",
            border: "none",
            color: currentLang === "am" ? "#ffffff" : "#b8ccee",
            fontWeight: currentLang === "am" ? 700 : 400,
            fontSize: "0.82rem",
            padding: "0 4px",
            transition: "color 0.2s",
        }}>
            አማርኛ
          </button>
          <span className="topbar-divider"/>
          {/* Social icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "4px" }}>
            <a href="#" aria-label="Facebook">
              <Facebook size={13}/>
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter size={13}/>
            </a>
            <a href="#" aria-label="YouTube">
              <Youtube size={13}/>
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram size={13}/>
            </a>
          </div>
        </div>
      </div>
    </div>);
}
