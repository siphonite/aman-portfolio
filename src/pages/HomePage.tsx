import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../sections/hero/Hero";
import Technologies from "../sections/skills/Technologies";
import ContributionGraph from "../sections/hero/ContributionGraph";
import ProjectsSection from "../sections/projects/ProjectsSection";
import ExperienceSection from "../sections/experience/ExperienceSection";
import ContactSection from "../sections/contact/ContactSection";

export default function HomePage() {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const sectionId = searchParams.get("section");

    useEffect(() => {
        if (sectionId) {
            // Wait for mounting
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // If no section parameter, scroll to top
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [sectionId]); // Only re-run when sectionId changes

    return (
        <>
            <Hero />
            <Technologies />
            <ContributionGraph />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
        </>
    );
}
