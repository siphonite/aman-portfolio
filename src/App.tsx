import Layout from "./layout/layout";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { toggleTheme } = useTheme();

  return (
    <Layout>
      <ThemeToggle toggleTheme={toggleTheme} />
      <div>App shell ready</div>
    </Layout>
  );
}

export default App;
