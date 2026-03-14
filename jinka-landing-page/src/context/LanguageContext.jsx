"use client";
import { createContext, useContext, useState, useEffect } from "react";

// API base URL - adjust for production
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5001";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState("en");
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTranslations = async (lang) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE}/api/public/ui-texts?lang=${lang}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch translations: ${response.status}`);
      }
      const data = await response.json();
      setTranslations(data.ui || {});
    } catch (err) {
      console.error("Error fetching translations:", err);
      setError(err.message);
      // Fallback to empty object
      setTranslations({});
    } finally {
      setLoading(false);
    }
  };

  const switchLanguage = (lang) => {
    setCurrentLang(lang);
    fetchTranslations(lang);
  };

  useEffect(() => {
    fetchTranslations(currentLang);
  }, []);

  const t = (key) => {
    const keys = key.split(".");
    let value = translations;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key; // fallback to key if not found
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        translations,
        loading,
        error,
        switchLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}