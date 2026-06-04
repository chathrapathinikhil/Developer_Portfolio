import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AIChat from "./components/AIChat";
import CursorGlow from "./components/CursorGlow";

import "./styles.css";
import "./ai-chat.css";

export default function App() {
  // Global scroll-reveal for section headings + general elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    const targets = document.querySelectorAll(
      ".section-eyebrow, .section-title, .section-sub, .education-card, .contact-item, .contact-social, .contact-form"
    );
    targets.forEach((el) => {
      el.classList.add("scroll-reveal");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Magnetic buttons
  useEffect(() => {
    const applyMagnetic = () => {
      const btns = document.querySelectorAll(".magnetic-btn");

      btns.forEach((btn) => {
        const onMove = (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
        };
        const onLeave = () => {
          btn.style.transform = "translate(0, 0)";
        };

        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
        btn._magneticCleanup = () => {
          btn.removeEventListener("mousemove", onMove);
          btn.removeEventListener("mouseleave", onLeave);
        };
      });

      return btns;
    };

    // Small delay so DOM is ready
    const timer = setTimeout(() => {
      const btns = applyMagnetic();
      return () => btns.forEach((b) => b._magneticCleanup?.());
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      <CursorGlow />
      <Nav />

      <section id="hero">
        <Hero />
      </section>

      <section id="experience">
        <Experience />
      </section>

      <section id="education">
        <Education />
      </section>

      <section id="projects" className="container">
        <Projects />
      </section>

      <section id="skills" className="container">
        <Skills />
      </section>

      <section id="contact" className="container">
        <Contact />
      </section>

      <Footer />

      <AIChat />
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
