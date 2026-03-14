"use client";
import { createContext, useContext, useState, useEffect } from "react";
/* ================= ENGLISH ================= */
const en = {
    nav: {
        home: "Home",
        about: "About",
        government: "Government",
        council: "Council",
        programs: "Programs",
        services: "Services",
        explore: "Explore",
        resources: "Resources",
        announcements: "Announcements",
        news: "News",
        contact: "Contact",
    },
    topbar: {
        country: "Federal Democratic Republic of Ethiopia",
        langLabel: "English",
    },
    hero: {
        badge: "Official Government Website",
        title: "Welcome to Jinka City",
        subtitle: "Jinka is the administrative capital of South Omo Zone in Southern Ethiopia. The city is known for its cultural diversity, natural beauty, and growing economic opportunities.",
        btnServices: "City Services",
        btnLearnMore: "Learn More",
        scroll: "SCROLL",
    },
    stats: {
        sectionTitle: "Jinka at a Glance",
        sectionSubtitle: "Key facts about Jinka City and its development as the capital of South Omo Zone.",
        items: [
            { value: "1936", label: "Established", desc: "Modern city administration formed" },
            { value: "120 km²", label: "Total Area", desc: "Administrative city area" },
            { value: "60,000+", label: "Population", desc: "Estimated residents" },
            { value: "1,490 m", label: "Elevation", desc: "Above sea level" },
        ],
    },
    mayor: {
        tag: "Mayor's Message",
        title: "Working Together for the Development of Jinka",
        nameQuote: "— Mayor of Jinka City",
        messages: [
            "Welcome to the official website of Jinka City Administration. Our city is rich in culture, diversity, and opportunity.",
            "The administration is committed to delivering transparent governance, improving infrastructure, and providing quality public services to all residents.",
            "Together we are building a modern, inclusive, and sustainable city for future generations.",
        ],
        signatureName: "Mayor",
        signatureTitle: "Jinka City Administration",
        btnReadMore: "Read Full Message",
        cityMayorLabel: "City Mayor",
        yearsLabel: "Present",
    },    // news section used on homepage and news page
    news: {
        sectionTitle: "Latest News",
        sectionSubtitle: "Updates and announcements from Jinka City",
        btnViewAll: "View All News",
        btnReadMore: "Read More",
        items: [
            {
                title: "Infrastructure Works Begin",
                excerpt: "Construction of new roads and utilities has started across the city.",
                category: "Infrastructure",
            },
            {
                title: "Community Health Fair",
                excerpt: "Local health services host a free fair for residents with screenings and advice.",
                category: "Community",
            },
            {
                title: "Environmental Awareness Campaign",
                excerpt: "City launches tree planting initiative to improve green spaces.",
                category: "Environment",
            },
        ],
    },
    newsPage: {
        heroTitle: "News & Updates",
        heroSubtitle: "Stay informed with the latest stories from Jinka City.",
        categories: [
            "All",
            "Infrastructure",
            "Community",
            "Environment",
            "Health",
            "Education",
            "Economy",
        ],
    },
    services: {
        sectionTitle: "Public Services",
        sectionSubtitle: "Essential municipal services available for residents, businesses, and visitors.",
        btnAccess: "Access",
        btnViewAll: "View All Services",
        items: [
            { title: "Civil Registration", desc: "Birth, marriage, and residence registration services." },
            { title: "Permit & Licensing", desc: "Construction permits, business licenses, and approvals." },
            { title: "Water Services", desc: "Water connections, billing support, and maintenance requests." },
            { title: "Electricity Support", desc: "Power service coordination and outage reporting support." },
            { title: "Parks & Environment", desc: "Urban greenery, parks maintenance, and environmental care." },
            { title: "Waste Management", desc: "Household and commercial waste collection coordination." },
            { title: "Public Safety", desc: "Community safety support and emergency coordination channels." },
            { title: "Health Services", desc: "Access information for municipal health programs and clinics." },
            { title: "Education Services", desc: "School support services and local education administration." },
            { title: "Transport Services", desc: "Traffic, public transport guidance, and mobility assistance." },
            { title: "Business Support", desc: "Support and guidance for startups and local enterprises." },
            { title: "Revenue & Tax", desc: "Municipal fee, tax payment, and compliance assistance." },
        ],
    },
    servicesPage: {
        heroTitle: "City Services",
        heroSubtitle: "Find and access municipal services provided by Jinka City Administration.",
        allServicesTitle: "All Available Services",
        allServicesSubtitle: "Browse services by category or use search to quickly find what you need.",
    },
    government: {
        heroTitle: "City Government",
        heroSubtitle: "Learn about the leadership, offices, and departments serving Jinka City.",
        structureTitle: "Government Structure",
        structureSubtitle: "Key departments working to deliver public services and city development.",
        departments: [
            { name: "Mayor's Office", desc: "Provides strategic leadership and oversight for city administration." },
            { name: "City Council Office", desc: "Coordinates council sessions, records resolutions, and public representation." },
            { name: "Finance Department", desc: "Manages budgeting, municipal revenue, and financial accountability." },
            { name: "Urban Development", desc: "Leads planning, land management, and infrastructure expansion efforts." },
            { name: "Public Service Office", desc: "Coordinates citizen-facing services and administrative support." },
            { name: "Health & Sanitation", desc: "Oversees urban health initiatives, sanitation, and community wellbeing programs." },
            { name: "Education & Culture", desc: "Supports schools, youth initiatives, and cultural development programs." },
            { name: "Trade & Investment", desc: "Promotes local business growth, investment, and economic opportunity." },
        ],
    },
    about: {
        breadcrumbHome: "Home",
        breadcrumbAbout: "About",
        heroTitle: "About Jinka City",
        heroSubtitle: "A growing administrative, cultural, and economic center in South Omo Zone.",
        overviewTitle: "City Overview",
        overviewText1: "Jinka is the administrative capital of South Omo Zone and serves as a key center for public administration, trade, and services in the region.",
        overviewText2: "The city is known for its cultural diversity and strategic role in connecting surrounding communities with essential government and market services.",
        historyTitle: "History & Identity",
        historyText: "Jinka has evolved into an important urban center through steady growth in infrastructure, governance, and social services while preserving its rich local heritage.",
        visionTitle: "Our Vision",
        visionText: "To build an inclusive, well-managed, and resilient city that provides equitable opportunities and quality public services for all residents.",
        missionTitle: "Our Mission",
        missionText: "To deliver transparent governance, strengthen urban services, and enable sustainable local development through responsive city administration.",
    },
    contact: {
        heroTitle: "Contact Us",
        heroSubtitle: "Reach Jinka City Administration for information, support, and public service requests.",
        officeTitle: "Administration Office",
        officeAddress: "Jinka City Administration, South Omo Zone, Ethiopia",
        hours: "Monday - Friday: 8:30 AM - 5:30 PM",
        getInTouchTitle: "Get In Touch",
        getInTouchSubtitle: "Send us a message and our team will respond as soon as possible.",
        formName: "Full Name",
        formEmail: "Email Address",
        formSubject: "Subject",
        formMessage: "Message",
        formSend: "Send Message",
    },
    notFound: {
        title: "Page Not Found",
        subtitle: "The page you are looking for does not exist or may have been moved.",
        btn: "Back to Home",
    },
    footer: {
        tagline: "Jinka City Administration is committed to providing transparent and efficient services for all residents.",
        address: "Jinka City Administration, South Omo Zone, Ethiopia",
        hours: "Monday – Friday: 8:30 AM – 5:30 PM",
        quickLinksTitle: "Quick Links",
        quickLinks: ["About Jinka", "City Government", "Council Office", "Programs", "News", "Announcements", "Resources", "Contact"],
        servicesTitle: "Services",
        serviceLinks: ["Civil Registration", "Permit & Licensing", "Water Services", "Electricity Support", "Parks & Environment", "Waste Management", "Public Safety", "Health Services"],
        resourcesTitle: "Resources",
        resources: ["Citizen Charter", "Open Data", "Procurement", "Downloads"],
        newsletterLabel: "Stay Updated",
        newsletterPlaceholder: "Enter your email",
        subscribeBtnLabel: "Subscribe",
        copyright: "© 2026 Jinka City Administration | Federal Democratic Republic of Ethiopia",
    },
};
/* ================= AMHARIC ================= */
const am = {
    nav: {
        home: "መነሻ",
        about: "ስለ ከተማው",
        government: "መንግስት",
        council: "ምክር ቤት",
        programs: "ፕሮግራሞች",
        services: "አገልግሎቶች",
        explore: "ያስሱ",
        resources: "ሀብቶች",
        announcements: "ማስታወቂያዎች",
        news: "ዜና",
        contact: "ያግኙን",
    },
    topbar: {
        country: "የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ",
        langLabel: "አማርኛ",
    },
    hero: {
        badge: "ይፋዊ የመንግስት ድህረ ገጽ",
        title: "ወደ ጅንካ ከተማ እንኳን ደህና መጡ",
        subtitle: "ጅንካ የደቡብ ኦሞ ዞን ዋና ከተማ ሲሆን በደቡብ ኢትዮጵያ የምትገኝ ከተማ ናት። ከተማዋ በባህላዊ ብዝሃነት፣ በተፈጥሯዊ ውበት እና በእየጨመረ በሚገኝ ኢኮኖሚ እድገት ታዋቂ ናት።",
        btnServices: "የከተማ አገልግሎቶች",
        btnLearnMore: "ተጨማሪ ይወቁ",
        scroll: "ወደ ታች",
    },
    stats: {
        sectionTitle: "ጅንካ በአጭሩ",
        sectionSubtitle: "ስለ ጅንካ ከተማ እና እድገቷ የሚያሳዩ አስፈላጊ መረጃዎች።",
        items: [
            { value: "1936", label: "የተመሰረተ", desc: "ዘመናዊ የከተማ አስተዳደር ተጀመረ" },
            { value: "120 ኪሜ²", label: "ጠቅላላ ስፋት", desc: "የከተማ አስተዳደር አካባቢ" },
            { value: "60,000+", label: "ህዝብ", desc: "ግምታዊ የነዋሪዎች ብዛት" },
            { value: "1,490 ሜ", label: "ከፍታ", desc: "ከባህር ወለል በላይ" },
        ],
    },
    mayor: {
        tag: "የከንቲባ መልዕክት",
        title: "ለጅንካ እድገት በአንድነት እንስራ",
        nameQuote: "— የጅንካ ከተማ ከንቲባ",
        messages: [
            "ወደ ጅንካ ከተማ አስተዳደር ይፋዊ ድህረ ገጽ እንኳን ደህና መጡ።",
            "ከተማችን በባህል፣ በልዩነት እና በእድገት ዕድሎች የበለፀገች ናት።",
            "አስተዳደራችን ግልጽነት፣ ጥራት ያለው የህዝብ አገልግሎት እና የመሰረተ ልማት ማሻሻል ላይ ተግቶ እየሰራ ነው።",
        ],
        signatureName: "ከንቲባ",
        signatureTitle: "ጅንካ ከተማ አስተዳደር",
        btnReadMore: "ሙሉ መልዕት ያንብቡ",
        cityMayorLabel: "የከተማ ከንቲባ",
        yearsLabel: "አሁን",
    },
    // news section used on homepage and news page
    news: {
        sectionTitle: "የአዳዲስ ዜናዎች",
        sectionSubtitle: "ከጅንካ ከተማ የተለያዩ ማስታወቂያዎችና ዜናዎች",
        btnViewAll: "ሁሉን ይመልከቱ",
        btnReadMore: "ተጨማሪ ያንብቡ",
        items: [
            {
                title: "የቅርብ ጊዜ መንገዶች ስራዎች ጀምረዋል",
                excerpt: "በከተማ ዙሪያ አዲስ መንገዶችና አገልግሎቶች ስራዎች ተከናወኑ።",
                category: "Infrastructure",
            },
            {
                title: "የሕብረቱ የጤና ቦታ በኢንስታ4B ተከናወነ",
                excerpt: "ከከተማ ጤና አገልግሎቶች ለነዋሪዎች ነፃ ምርመራዎችና ምክር ሰጥተዋል።",
                category: "Community",
            },
            {
                title: "የኢኮሎጂያዊ እውቀት ዘመናዊ ዘዴ",
                excerpt: "ከተማዋ የዛፎችን መክፈቻ ዕርምጃ እንዲሁም የአረንጓዴ ቦታዎችን ለማሻሻል ተመንሳሳይ ስራዎች አቀረች።",
                category: "Environment",
            },
        ],
    },
    newsPage: {
        heroTitle: "ዜና እና ማስታወቂያዎች",
        heroSubtitle: "ከጅንካ ከተማ ያሉ የቅርብ ጊዜ ዜናዎችን ይከታተሉ።",
        categories: [
            "ሁሉም",
            "Infrastructure",
            "Community",
            "Environment",
            "Health",
            "Education",
            "Economy",
        ],
    },
    services: en.services,
    servicesPage: en.servicesPage,
    government: en.government,
    about: en.about,
    contact: en.contact,
    notFound: en.notFound,
    footer: {
        tagline: "የጅንካ ከተማ አስተዳደር ለሁሉም ነዋሪዎች ግልጽና ውጤታማ አገልግሎት ለመስጠት ቁርጠኛ ነው።",
        address: "ጅንካ ከተማ አስተዳደር፣ ደቡብ ኦሞ ዞን፣ ኢትዮጵያ",
        hours: "ሰኞ – ዓርብ: 8:30 – 5:30",
        quickLinksTitle: "ፈጣን አገናኞች",
        quickLinks: ["ስለ ጅንካ", "የከተማ መንግስት", "ምክር ቤት", "ፕሮግራሞች", "ዜና", "ማስታወቂያዎች", "ሀብቶች", "ያግኙን"],
        servicesTitle: "አገልግሎቶች",
        serviceLinks: ["ሲቪል ምዝገባ", "ፈቃድ እና ፍቃድ ስርዓት", "የውሃ አገልግሎት", "የኤሌክትሪክ ድጋፍ", "ፓርኮች እና አካባቢ", "የቆሻሻ አስተዳደር", "የህዝብ ደህንነት", "የጤና አገልግሎት"],
        resourcesTitle: "ሀብቶች",
        resources: ["የዜጎች ቻርተር", "ክፍት ዳታ", "ግዢ", "ማውረጃዎች"],
        newsletterLabel: "ዝማኔ ይቀበሉ",
        newsletterPlaceholder: "ኢሜይልዎን ያስገቡ",
        subscribeBtnLabel: "ይመዝገቡ",
        copyright: "© 2026 ጅንካ ከተማ አስተዳደር | የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ",
    },
};
/* ================= CONTEXT ================= */
const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState("en");
    const [translations, setTranslations] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API base URL - adjust for production
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5001";

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
        setLanguage(lang);
        fetchTranslations(lang);
    };

    useEffect(() => {
        fetchTranslations(language);
    }, []);

    const t = (key) => {
        const keys = key.split(".");
        let value = translations;
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key; // fallback to key if not found
    };

    const value = {
        language,
        setLanguage: switchLanguage,
        t,
        loading,
        error,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used inside LanguageProvider");
    }
    return context;
}
