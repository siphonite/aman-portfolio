import { useState } from "react";
import Layout from "./layout/layout";
import OnekoCat from "./components/OnekoCat";

import Hero from "./sections/hero/Hero";
import Technologies from "./sections/skills/Technologies";
import ContributionGraph from "./sections/hero/ContributionGraph";
import ProjectsSection from "./sections/projects/ProjectsSection";
import ExperienceSection from "./sections/experience/ExperienceSection";
import ContactSection from "./sections/contact/ContactSection";
import ResumePage from "./pages/ResumePage";

type Page = "home" | "resume";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <OnekoCat />
      {currentPage === "resume" ? (
        <>
          <ResumePage />
          {/* Mobile Header - Hidden on desktop */}
          <header className="fixed top-0 left-0 right-0 h-14 flex sm:hidden items-center justify-between px-4 z-50 bg-[#0A0A0A] border-b border-zinc-800">
            <span className="font-bold text-lg tracking-tight text-white">AK</span>
            <button
              onClick={() => handleNavigate("home")}
              className="p-2 rounded-lg hover:bg-zinc-800 transition-colors text-white"
              aria-label="Go home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </button>
          </header>
          {/* Desktop Sidebar - Hidden on mobile */}
          <div className="fixed top-0 left-0 h-full w-20 hidden sm:flex flex-col items-center justify-center z-40 bg-[#0A0A0A]">
            <button
              onClick={() => handleNavigate("home")}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <Layout isDark={true} onNavigate={handleNavigate} currentPage={currentPage}>
          <Hero />
          <Technologies />
          <ContributionGraph />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </Layout>
      )}
    </>
  );
}

export default App;
