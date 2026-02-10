import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Home,
    Layers,
    Briefcase,
    FileText,
    MessageSquare,
    Menu,
    X,
} from "lucide-react";
import type { ReactNode } from "react";

type NavItem = {
    icon: ReactNode;
    label: string;
    action: () => void;
};

type NavbarProps = {
    isDark: boolean;
};

export default function Navbar({ isDark }: NavbarProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we are physically on the home route
    const isHomeRoute = location.pathname === "/";

    const handleNavigation = (sectionId?: string) => {
        if (sectionId) {
            if (isHomeRoute) {
                // If on home, just scroll
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            } else {
                // If not on home, navigate with query param
                navigate(`/?section=${sectionId}`);
            }
        } else {
            // "Home" button clicked
            if (isHomeRoute) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                navigate("/");
            }
        }
        setMenuOpen(false);
    };

    const NAV_ITEMS: NavItem[] = [
        { icon: <Home size={20} />, label: "Home", action: () => handleNavigation() },
        { icon: <Layers size={20} />, label: "Projects", action: () => handleNavigation("projects") },
        { icon: <Briefcase size={20} />, label: "Work", action: () => handleNavigation("experience") },
        { icon: <FileText size={20} />, label: "Resume", action: () => { navigate("/resume"); setMenuOpen(false); } },
        { icon: <MessageSquare size={20} />, label: "Blogs", action: () => window.open("https://medium.com/@amansinha327", "_blank") },
    ];

    return (
        <>
            {/* Mobile Header - Hidden on desktop */}
            <header
                className={`fixed top-0 left-0 right-0 h-14 flex sm:hidden items-center justify-between px-4 z-50 transition-colors duration-500 ${isDark ? "bg-[#0A0A0A] border-b border-zinc-800" : "bg-white border-b border-zinc-200"
                    }`}
            >
                <span className="font-bold text-lg tracking-tight">AK</span>
                <button
                    onClick={() => setMenuOpen(true)}
                    className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`}
                    aria-label="Open menu"
                >
                    <Menu size={24} />
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div
                    className={`fixed inset-0 z-50 flex flex-col sm:hidden transition-colors duration-500 ${isDark ? "bg-[#0A0A0A]" : "bg-white"
                        }`}
                >
                    {/* Close button */}
                    <div className="flex justify-end p-4">
                        <button
                            onClick={() => setMenuOpen(false)}
                            className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`}
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 flex flex-col items-center justify-center gap-8">
                        {NAV_ITEMS.map((item, i) => (
                            <button
                                key={i}
                                onClick={item.action}
                                className={`flex items-center gap-4 text-xl font-medium transition-colors ${i === 0 && isHomeRoute
                                    ? (isDark ? "text-cyan-400" : "text-cyan-600")
                                    : (isDark ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-black")
                                    }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            )}

            {/* Desktop Sidebar - Hidden on mobile */}
            <nav
                className={`fixed top-0 left-0 h-full w-20 hidden sm:flex flex-col items-center justify-center z-40 transition-colors duration-500 ${isDark ? "bg-[#0A0A0A]" : "bg-white"
                    }`}
            >
                <div className="flex flex-col gap-[4.5rem]">
                    {NAV_ITEMS.map((item, i) => (
                        <button
                            key={i}
                            onClick={item.action}
                            className={`group relative transition-colors ${i === 0 && isHomeRoute
                                ? (isDark ? "text-white" : "text-black")
                                : (isDark ? "text-zinc-500 hover:text-white" : "text-zinc-400 hover:text-black")
                                }`}
                        >
                            {item.icon}
                            <span
                                className={`absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity mono text-xs uppercase tracking-widest whitespace-nowrap px-2 py-1 rounded ${isDark ? "bg-zinc-900 text-white" : "bg-zinc-100 text-black"
                                    }`}
                            >
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>
            </nav>
        </>
    );
}
