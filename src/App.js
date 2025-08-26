import React from "react";
import ReactDOM from "react-dom/client";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import "./styles.css";

export default function App() {
  return (
    <main>
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
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
