"use client";
import { useState, useEffect } from "react";
import { Search, Menu, X, Building2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/navbar.css";
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { t } = useLanguage();
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    useEffect(() => {
        setMenuOpen(false);
        setSearchOpen(false);
    }, [pathname]);
    const navItems = [
        { label: t("nav.home"), href: "/" },
        { label: t("nav.about"), href: "/about" },
        { label: t("nav.government"), href: "/government" },
        { label: t("nav.services"), href: "/services" },
        { label: t("nav.news"), href: "/news" },
        { label: t("nav.contact"), href: "/contact" },
    ];
    return (<nav className="navbar" style={{
            position: "sticky",
            boxShadow: scrolled ? "0 4px 20px rgba(26,58,107,0.14)" : "0 2px 12px rgba(26,58,107,0.1)",
            transition: "box-shadow 0.3s",
        }}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <motion.div className="navbar-logo-icon" whileHover={{ scale: 1.08, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
            <Building2 size={22}/>
          </motion.div>
          <div className="navbar-logo-text">
            <span className="city-name">Jinka City</span>
            <span className="city-sub">Municipality</span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (<Link key={item.label} href={item.href} className={isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>);
        })}
        </div>

        {/* Right side: search + mobile toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <motion.button className="navbar-search-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search" whileTap={{ scale: 0.9 }}>
            <Search size={18}/>
          </motion.button>
          <button className="navbar-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (<motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={22}/>
                </motion.span>) : (<motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={22}/>
                </motion.span>)}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
            <div style={{
                background: "#f4f7fd",
                borderTop: "1px solid #e2e8f0",
                padding: "0.75rem 2rem",
            }}>
              <div style={{
                maxWidth: "1440px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
            }}>
                <Search size={16} style={{ color: "#5a6a8a" }}/>
                <input type="text" placeholder={t("search.placeholder")} autoFocus style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "0.95rem",
                color: "#1a2744",
            }}/>
                <button onClick={() => setSearchOpen(false)} style={{
                background: "none",
                border: "none",
                color: "#5a6a8a",
                cursor: "pointer",
                padding: "0.2rem",
            }}>
                  <X size={16}/>
                </button>
              </div>
            </div>
          </motion.div>)}
      </AnimatePresence>
    </nav>);
}
