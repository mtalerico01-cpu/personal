import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { CaseStudies } from "@/pages/CaseStudies";
import { Projects } from "@/pages/Projects";
import { SkillsPage } from "@/pages/SkillsPage";
import { Resume } from "@/pages/Resume";
import { Contact } from "@/pages/Contact";
import { NotFound } from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="projects" element={<Projects />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="resume" element={<Resume />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
