"use client";
import { useEffect } from "react";
import { LanguageProvider } from "../src/context/LanguageContext";
import { API_BASE } from "../src/context/LanguageContext";
export default function Providers({ children }) {
    useEffect(() => {
        try {
            const visitKey = "jinka_visit_logged";
            if (typeof window !== "undefined" && window.sessionStorage) {
                if (window.sessionStorage.getItem(visitKey)) {
                    return;
                }
                window.sessionStorage.setItem(visitKey, "1");
            }
        } catch {
            // ignore storage errors
        }

        fetch(`${API_BASE}/api/public/visit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: window.location.pathname }),
        }).catch(() => {});
    }, []);

    return <LanguageProvider>{children}</LanguageProvider>;
}
