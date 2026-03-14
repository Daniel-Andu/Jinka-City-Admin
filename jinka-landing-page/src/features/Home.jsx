"use client";
import Hero from "../components/Hero";
import FacebookPageSidebar from "../components/FacebookPageSidebar";
import Stats from "../components/Stats";
import Mayor from "../components/Mayor";
import NewsUpdates from "../components/NewsUpdates";
import Services from "../components/Services";
export default function Home() {
    return (<>
      <Hero />
      
      <Stats />
      <Mayor />
      <NewsUpdates />
      <Services />
      <FacebookPageSidebar />
    </>);
}
