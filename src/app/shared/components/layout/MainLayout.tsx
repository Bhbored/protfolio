import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "./NavMenu";
import Footer from "./Footer";

export default function MainLayout() {
  const [currentSection, setCurrentSection] = useState("Home");

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    const el = document.getElementById(section.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="main-layout">
      <NavMenu onNavigate={handleNavigate} currentSection={currentSection} />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
