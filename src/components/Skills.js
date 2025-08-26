import React, { useState, useEffect } from "react";
import SectionHeading from "./SectionHeading";
import SphericalWordCloud from "./SphericalWordCloud";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "💻",
      accent: "cyan",
      skills: [
        "React",
        "Vue.js",
        "TypeScript",
        "Javascript",
        "Bootstrap",
        "Tailwind",
        "HTML5",
        "CSS3",
      ],
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      accent: "green",
      skills: [
        "Node.js",
        "Express.js",
        "Python",
        "Flask",
        "FastAPI",
        "PostgreSQL",
        "MongoDB",
        "REST APIs",
      ],
    },
    {
      title: "UI/UX Design",
      icon: "🎨",
      accent: "purple",
      skills: ["Figma", "Responsive Design", "Wireframing", "Prototyping"],
    },
    {
      title: "Cloud & DevOps",
      icon: "☁️",
      accent: "orange",
      skills: ["AWS", "Docker", "CI/CD", "Kubernetes", "Git", "Linux"],
    },
    {
      title: "Tools & Technologies",
      icon: "🔧",
      accent: "pink",
      skills: [
        "VS Code",
        "Jest",
        "Webpack",
        "Redux",
        "Firebase",
        "Vercel",
        "Vite",
      ],
    },
    {
      title: "AI & Automation",
      icon: "✨",
      accent: "yellow",
      skills: ["OpenAI", "Langchain", "Streamlit", "n8n", "Zapier"],
    },
  ];

  // Spherical word cloud data
  const sphericalWords = [
    // Core technologies (high weight)
    { text: "React", weight: 1.0 },
    {
      text: "TypeScript",
      weight: 0.95,
    },
    { text: "Node.js", weight: 0.9 },
    { text: "JavaScript", weight: 0.9 },
    { text: "Python", weight: 0.85 },

    // Frontend & UI (high-medium weight)
    { text: "Vue.js", weight: 0.8 },
    { text: "Tailwind CSS", weight: 0.8 },
    { text: "HTML5", weight: 0.75 },
    { text: "CSS3", weight: 0.75 },
    { text: "Bootstrap", weight: 0.7 },

    // Backend & APIs (medium-high weight)
    { text: "Express.js", weight: 0.8 },
    { text: "MongoDB", weight: 0.75 },
    { text: "PostgreSQL", weight: 0.75 },
    { text: "REST APIs", weight: 0.7 },
    { text: "GraphQL", weight: 0.65 },

    // Cloud & DevOps (medium weight)
    { text: "AWS", weight: 0.7 },
    { text: "Docker", weight: 0.7 },
    { text: "Kubernetes", weight: 0.65 },
    { text: "CI/CD", weight: 0.65 },
    { text: "Git", weight: 0.7 },

    // Testing & Quality (medium weight)
    { text: "Jest", weight: 0.7 },
    { text: "Testing", weight: 0.65 },
    { text: "Cypress", weight: 0.6 },
    { text: "Accessibility", weight: 0.7 },
    { text: "Performance", weight: 0.65 },

    // State & Tools (medium weight)
    { text: "Redux", weight: 0.7 },
    { text: "VS Code", weight: 0.65 },
    { text: "Webpack", weight: 0.6 },
    { text: "Vite", weight: 0.65 },
    { text: "Firebase", weight: 0.6 },

    // Design & Animation (medium-low weight)
    { text: "Figma", weight: 0.65 },
    { text: "Framer Motion", weight: 0.6 },
    { text: "SVG", weight: 0.6 },
    { text: "Lottie", weight: 0.55 },
    { text: "Animations", weight: 0.6 },

    // AI & Data (medium-low weight)
    { text: "OpenAI", weight: 0.6 },
    { text: "LangChain", weight: 0.55 },
    { text: "LLM", weight: 0.5 },
    { text: "Prompt Engineering", weight: 0.55 },
    { text: "Data Pipelines", weight: 0.5 },

    // Business & Integration (low weight)
    { text: "OAuth", weight: 0.5 },
    { text: "Stripe", weight: 0.5 },
    { text: "Microservices", weight: 0.55 },
    { text: "gRPC", weight: 0.5 },
    { text: "OpenAPI", weight: 0.5 },

    // Additional skills (low weight)
    { text: "Agile", weight: 0.5 },
    { text: "Prototyping", weight: 0.55 },
    { text: "Wireframing", weight: 0.5 },
    { text: "Deployment", weight: 0.55 },
    { text: "Security", weight: 0.5 },
  ];

  return (
    <div className="skills-container">
      <SectionHeading
        eyebrow="Skills"
        title="What I Work With"
        subtitle="Technologies and tools I use across development and design."
      />

      {/* 3D Spherical Word Cloud */}
      <div className="spherical-word-cloud-section">
        <SphericalWordCloud words={sphericalWords} />
      </div>

      {/* Skill Category Cards */}
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className={`skill-card skill-card--${category.accent}`}
            style={{
              "--delay": `${index * 0.1}s`,
              "--card-index": index,
            }}
          >
            <div className="skill-card-header">
              <span className="skill-card-icon">{category.icon}</span>
              <h3 className="skill-card-title">{category.title}</h3>
            </div>
            <div className="skill-card-skills">
              {category.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className={`skill-pill skill-pill--${category.accent}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
