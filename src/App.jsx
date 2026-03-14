import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerBindings, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";

import { ThemedLayoutV2 } from "./components/layout";
import { ConnectionStatus } from "./components/ConnectionStatus";
import { Dashboard } from "./pages/dashboard";
import { DepartmentList, DepartmentCreate, DepartmentEdit } from "./pages/departments";
import { AnnouncementList, AnnouncementCreate, AnnouncementEdit } from "./pages/announcements";
import { MessageList } from "./pages/messages";
import { SettingsPage } from "./pages/settings";
import { LoginPage } from "./pages/login";
import { HeroSliderList } from "./pages/hero-sliders";
import { CityStatsList } from "./pages/city-stats";
import { CityServicesList } from "./pages/city-services";
import { LanguagesList } from "./pages/languages";
import { SubscribersList } from "./pages/subscribers";
import { NewsList } from "./pages/news";
import { NewsCategoriesList } from "./pages/news-categories";
import { NewsTagsList } from "./pages/news-tags";
import { LeadersList } from "./pages/leaders";
import { UiTranslationsList } from "./pages/ui-translations";
import { PageHeroSlidesList } from "./pages/page-hero-slides";
import { DepartmentTranslationsList } from "./pages/department-translations";
import { ServiceTranslationsList } from "./pages/service-translations";
import { NewsTranslationsList } from "./pages/news-translations";
import { NewsCategoryTranslationsList } from "./pages/news-category-translations";
import { NewsTagTranslationsList } from "./pages/news-tag-translations";
import { NewsCategoryMapList } from "./pages/news-category-map";
import { NewsTagMapList } from "./pages/news-tag-map";
import { MediaList } from "./pages/media";
import { AnalyticsPage } from "./pages/analytics";

import { authService, api, API_URL as ENV_API_URL } from "./services";

import "./App.css";

const API_URL = ENV_API_URL;
const ADMIN_API_URL = `${API_URL}/admin`;

const RequireAuth = () => {
    if (!authService.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

function App() {
    return (
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#2E8B57",
                        colorInfo: "#1E90FF",
                        colorError: "#E02F2F",
                        colorWarning: "#C21F1F",
                        colorSuccess: "#3CB371",
                        colorText: "#111827",
                        borderRadius: 8,
                        fontFamily: "'Inter', sans-serif",
                    },
                }}
            >
                <RefineKbarProvider>
                    <AntdApp>
                        <ConnectionStatus />
                        <Refine
                            dataProvider={dataProvider(ADMIN_API_URL, api)}
                            routerProvider={routerBindings}
                            resources={[
                                {
                                    name: "dashboard",
                                    list: "/",
                                    meta: {
                                        label: "Dashboard",
                                        icon: "🏠",
                                    },
                                },
                                {
                                    name: "departments",
                                    list: "/departments",
                                    create: "/departments/create",
                                    edit: "/departments/edit/:id",
                                    meta: {
                                        label: "Departments",
                                        icon: "🏢",
                                    },
                                },
                                {
                                    name: "announcements",
                                    list: "/announcements",
                                    create: "/announcements/create",
                                    edit: "/announcements/edit/:id",
                                    meta: {
                                        label: "Announcements",
                                        icon: "📢",
                                    },
                                },
                                {
                                    name: "hero-sliders",
                                    list: "/hero-sliders",
                                    meta: {
                                        label: "Hero Sliders",
                                        icon: "🖼️",
                                    },
                                },
                                {
                                    name: "city-stats",
                                    list: "/city-stats",
                                    meta: {
                                        label: "City Stats",
                                        icon: "📈",
                                    },
                                },
                                {
                                    name: "city-services",
                                    list: "/city-services",
                                    meta: {
                                        label: "City Services",
                                        icon: "🛠️",
                                    },
                                },
                                {
                                    name: "messages",
                                    list: "/messages",
                                    meta: {
                                        label: "Messages",
                                        icon: "💬",
                                    },
                                },
                                {
                                    name: "languages",
                                    list: "/languages",
                                    meta: {
                                        label: "Languages",
                                        icon: "🌍",
                                    },
                                },
                                {
                                    name: "subscribers",
                                    list: "/subscribers",
                                    meta: {
                                        label: "Subscribers",
                                        icon: "👥",
                                    },
                                },
                                {
                                    name: "settings",
                                    list: "/settings",
                                    meta: {
                                        label: "Settings",
                                        icon: "⚙️",
                                    },
                                },
                                {
                                    name: "news",
                                    list: "/news",
                                    meta: {
                                        label: "News",
                                        icon: "📰",
                                    },
                                },
                                {
                                    name: "news-categories",
                                    list: "/news-categories",
                                    meta: {
                                        label: "News Categories",
                                        icon: "📁",
                                    },
                                },
                                {
                                    name: "news-tags",
                                    list: "/news-tags",
                                    meta: {
                                        label: "News Tags",
                                        icon: "🏷️",
                                    },
                                },
                                {
                                    name: "leaders",
                                    list: "/leaders",
                                    meta: {
                                        label: "Leaders",
                                        icon: "👔",
                                    },
                                },
                                {
                                    name: "ui-translations",
                                    list: "/ui-translations",
                                    meta: {
                                        label: "UI Translations",
                                        icon: "🌐",
                                    },
                                },
                                {
                                    name: "page-hero-slides",
                                    list: "/page-hero-slides",
                                    meta: {
                                        label: "Page Hero Slides",
                                        icon: "🎨",
                                    },
                                },
                                {
                                    name: "department-translations",
                                    list: "/department-translations",
                                    meta: {
                                        label: "Department Translations",
                                        icon: "🔄",
                                    },
                                },
                                {
                                    name: "service-translations",
                                    list: "/service-translations",
                                    meta: {
                                        label: "Service Translations",
                                        icon: "🔄",
                                    },
                                },
                                {
                                    name: "news-translations",
                                    list: "/news-translations",
                                    meta: {
                                        label: "News Translations",
                                        icon: "🔄",
                                    },
                                },
                                {
                                    name: "news-category-translations",
                                    list: "/news-category-translations",
                                    meta: {
                                        label: "News Category Translations",
                                        icon: "🔄",
                                    },
                                },
                                {
                                    name: "news-tag-translations",
                                    list: "/news-tag-translations",
                                    meta: {
                                        label: "News Tag Translations",
                                        icon: "🔄",
                                    },
                                },
                                {
                                    name: "news-category-map",
                                    list: "/news-category-map",
                                    meta: {
                                        label: "News Category Map",
                                        icon: "🗺️",
                                    },
                                },
                                {
                                    name: "news-tag-map",
                                    list: "/news-tag-map",
                                    meta: {
                                        label: "News Tag Map",
                                        icon: "🗺️",
                                    },
                                },
                                {
                                    name: "media",
                                    list: "/media",
                                    meta: {
                                        label: "Media",
                                        icon: "📁",
                                    },
                                },
                                {
                                    name: "analytics",
                                    list: "/analytics",
                                    meta: {
                                        label: "Analytics",
                                        icon: "📊",
                                    },
                                },
                            ]}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                            }}
                        >
                            <Routes>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/" element={<Navigate to={authService.isAuthenticated() ? "/dashboard" : "/login"} replace />} />
                                <Route element={<RequireAuth />}>
                                    <Route
                                        element={
                                            <ThemedLayoutV2>
                                                <Outlet />
                                            </ThemedLayoutV2>
                                        }
                                    >
                                        <Route index element={<Dashboard />} />
                                        <Route path="/departments">
                                            <Route index element={<DepartmentList />} />
                                            <Route path="create" element={<DepartmentCreate />} />
                                            <Route path="edit/:id" element={<DepartmentEdit />} />
                                        </Route>
                                        <Route path="/announcements">
                                            <Route index element={<AnnouncementList />} />
                                            <Route path="create" element={<AnnouncementCreate />} />
                                            <Route path="edit/:id" element={<AnnouncementEdit />} />
                                        </Route>
                                        <Route path="/hero-sliders" element={<HeroSliderList />} />
                                        <Route path="/city-stats" element={<CityStatsList />} />
                                        <Route path="/city-services" element={<CityServicesList />} />
                                        <Route path="/messages" element={<MessageList />} />
                                        <Route path="/languages" element={<LanguagesList />} />
                                        <Route path="/subscribers" element={<SubscribersList />} />
                                        <Route path="/settings" element={<SettingsPage />} />
                                        <Route path="/news" element={<NewsList />} />
                                        <Route path="/news-categories" element={<NewsCategoriesList />} />
                                        <Route path="/news-tags" element={<NewsTagsList />} />
                                        <Route path="/leaders" element={<LeadersList />} />
                                        <Route path="/ui-translations" element={<UiTranslationsList />} />
                                        <Route path="/page-hero-slides" element={<PageHeroSlidesList />} />
                                        <Route path="/department-translations" element={<DepartmentTranslationsList />} />
                                        <Route path="/service-translations" element={<ServiceTranslationsList />} />
                                        <Route path="/news-translations" element={<NewsTranslationsList />} />
                                        <Route path="/news-category-translations" element={<NewsCategoryTranslationsList />} />
                                        <Route path="/news-tag-translations" element={<NewsTagTranslationsList />} />
                                        <Route path="/news-category-map" element={<NewsCategoryMapList />} />
                                        <Route path="/news-tag-map" element={<NewsTagMapList />} />
                                        <Route path="/media" element={<MediaList />} />
                                        <Route path="/analytics" element={<AnalyticsPage />} />
                                    </Route>
                                </Route>
                            </Routes>
                            <RefineKbar />
                            <UnsavedChangesNotifier />
                        </Refine>
                    </AntdApp>
                </RefineKbarProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
}

export default App;
