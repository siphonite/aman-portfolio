import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
    children: ReactNode;
    isDark: boolean;
    onNavigate?: (page: "home" | "resume") => void;
    currentPage?: "home" | "resume";
};

export default function Layout({ children, isDark, onNavigate, currentPage }: Props) {
    return (
        <div
            className={`min-h-screen ${isDark ? "bg-[#0A0A0A] text-white" : "bg-white text-black"} transition-colors duration-500`}
        >
            <Navbar isDark={isDark} onNavigate={onNavigate} currentPage={currentPage} />
            <main className="max-w-[1400px] mx-auto px-4 pt-20 pb-8 sm:pl-24 sm:pr-20 sm:py-24 lg:pl-28 lg:pr-24">
                {children}
            </main>
            <Footer />
        </div>
    );
}
