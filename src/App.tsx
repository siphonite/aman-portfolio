import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ResumeLayout from "./layout/ResumeLayout";
import HomePage from "./pages/HomePage";
import ResumePage from "./pages/ResumePage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route element={<ResumeLayout />}>
        <Route path="/resume" element={<ResumePage />} />
      </Route>
    </Routes>
  );
}

export default App;
