import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import OnekoCat from "../components/OnekoCat";
import { Analytics } from "@vercel/analytics/react";

export default function MainLayout() {
    const isDark = true;

    return (
        <div className={`min-h-screen ${isDark ? "bg-[#0A0A0A] text-white" : "bg-white text-black"} transition-colors duration-500`}>
            <Analytics />
            <OnekoCat />
            <Navbar isDark={isDark} />
            <main className="max-w-[1400px] mx-auto px-4 pt-20 pb-8 sm:pl-24 sm:pr-20 sm:py-24 lg:pl-28 lg:pr-24">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
