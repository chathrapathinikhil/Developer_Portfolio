import React, { useState, useEffect } from "react";

export default function Nav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredSection, setHoveredSection] = useState(null);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      const navHeight = document.querySelector(".nav").offsetHeight;
      window.scrollTo({
        top: section.offsetTop - navHeight - 20,
        behavior: "smooth",
      });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "experience",
        "education",
        "projects",
        "skills",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="brand">
          <span className="logo" aria-hidden />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="nav-links">
            <a
              href="#hero"
              className={`chip ${
                hoveredSection === "hero" || activeSection === "hero"
                  ? "active"
                  : ""
              }`}
              onClick={(e) => scrollToSection(e, "#hero")}
              onMouseEnter={() => setHoveredSection("hero")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              Home
            </a>
            <a
              href="#experience"
              className={`chip ${
                hoveredSection === "experience" ||
                activeSection === "experience"
                  ? "active"
                  : ""
              }`}
              onClick={(e) => scrollToSection(e, "#experience")}
              onMouseEnter={() => setHoveredSection("experience")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              Experience
            </a>
            <a
              href="#education"
              className={`chip ${
                hoveredSection === "education" || activeSection === "education"
                  ? "active"
                  : ""
              }`}
              onClick={(e) => scrollToSection(e, "#education")}
              onMouseEnter={() => setHoveredSection("education")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              Education
            </a>
            <a
              href="#projects"
              className={`chip ${
                hoveredSection === "projects" || activeSection === "projects"
                  ? "active"
                  : ""
              }`}
              onClick={(e) => scrollToSection(e, "#projects")}
              onMouseEnter={() => setHoveredSection("projects")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              Projects
            </a>
            <a
              href="#skills"
              className={`chip ${
                hoveredSection === "skills" || activeSection === "skills"
                  ? "active"
                  : ""
              }`}
              onClick={(e) => scrollToSection(e, "#skills")}
              onMouseEnter={() => setHoveredSection("skills")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              Skills
            </a>
          </div>
          <a
            href="#contact"
            className="cta"
            onClick={(e) => scrollToSection(e, "#contact")}
          >
            <strong>Let's Talk</strong>
          </a>
        </div>
      </div>
    </nav>
  );
}
