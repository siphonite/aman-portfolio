import Layout from "./layout/layout";
import CatCursor from "./components/CatCursor";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";

import Hero from "./sections/hero/Hero";
import Technologies from "./sections/skills/Technologies";
import ProjectsSection from "./sections/projects/ProjectsSection";
import ExperienceSection from "./sections/experience/ExperienceSection";

function App() {
  const { isDark, setIsDark } = useTheme();

  return (
    <Layout isDark={isDark}>
      <CatCursor />
      <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
      <Hero />
      <Technologies />
      <ProjectsSection />
      <ExperienceSection />
    </Layout>
  );
}

export default App;
