import React, { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import SphericalWordCloud from "./SphericalWordCloud";

export default function Skills() {
  const gridRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "💻",
      accent: "cyan",
      skills: [
        "React.js",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "React Native",
        "Three.js",
        "Framer Motion",
        "Tailwind",
        "Redux",
        "HTML5 / CSS3",
      ],
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      accent: "green",
      skills: [
        "Node.js",
        "Express.js",
        "Java",
        "Spring Boot",
        "Python",
        "FastAPI",
        "Flask",
        "GraphQL",
        "REST APIs",
        "Microservices",
      ],
    },
    {
      title: "AI & Integrations",
      icon: "✨",
      accent: "yellow",
      skills: [
        "OpenAI GPT-4o",
        "Gemini API",
        "Retell AI",
        "CLIP / BLIP",
        "Prompt Engineering",
        "LLM Workflows",
        "Twilio",
        "Google OAuth",
        "Google Calendar API",
      ],
    },
    {
      title: "Databases & Messaging",
      icon: "🗄️",
      accent: "purple",
      skills: [
        "PostgreSQL",
        "MongoDB",
        "Firebase",
        "SQL Server",
        "Apache Kafka",
        "Azure Event Hubs",
        "RabbitMQ",
        "Prisma ORM",
        "pgvector",
        "Supabase",
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: "☁️",
      accent: "orange",
      skills: [
        "AWS (AppStream, Lambda, S3)",
        "Azure",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "Helm",
        "CI/CD",
        "GitHub Actions",
        "Linux",
        "Vercel / Render",
      ],
    },
    {
      title: "Languages",
      icon: "🔧",
      accent: "pink",
      skills: [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "C++",
        "HTML / CSS",
        "SQL",
        "Bash",
      ],
    },
  ];

  const sphericalWords = [
    { text: "React", weight: 1.0 },
    { text: "TypeScript", weight: 0.95 },
    { text: "Node.js", weight: 0.9 },
    { text: "JavaScript", weight: 0.9 },
    { text: "Python", weight: 0.85 },
    { text: "Java", weight: 0.85 },
    { text: "Spring Boot", weight: 0.85 },
    { text: "Next.js", weight: 0.8 },
    { text: "Tailwind CSS", weight: 0.8 },
    { text: "OpenAI", weight: 0.8 },
    { text: "Gemini API", weight: 0.75 },
    { text: "Express.js", weight: 0.8 },
    { text: "MongoDB", weight: 0.75 },
    { text: "PostgreSQL", weight: 0.75 },
    { text: "REST APIs", weight: 0.7 },
    { text: "GraphQL", weight: 0.65 },
    { text: "AWS", weight: 0.75 },
    { text: "Docker", weight: 0.75 },
    { text: "Kubernetes", weight: 0.7 },
    { text: "Kafka", weight: 0.7 },
    { text: "Azure", weight: 0.7 },
    { text: "Retell AI", weight: 0.65 },
    { text: "CLIP / BLIP", weight: 0.6 },
    { text: "Redux", weight: 0.7 },
    { text: "Three.js", weight: 0.7 },
    { text: "Framer Motion", weight: 0.6 },
    { text: "React Native", weight: 0.7 },
    { text: "CI/CD", weight: 0.65 },
    { text: "Firebase", weight: 0.6 },
    { text: "Prisma ORM", weight: 0.6 },
    { text: "FastAPI", weight: 0.65 },
    { text: "LLM", weight: 0.6 },
    { text: "Prompt Engineering", weight: 0.6 },
    { text: "pgvector", weight: 0.55 },
    { text: "Microservices", weight: 0.65 },
    { text: "Twilio", weight: 0.55 },
    { text: "Jenkins", weight: 0.6 },
    { text: "OAuth", weight: 0.5 },
    { text: "Agile", weight: 0.5 },
    { text: "Git", weight: 0.7 },
  ];

  return (
    <div className="skills-container">
      <SectionHeading
        eyebrow="Skills"
        title="What I Work With"
        subtitle="The stack I reach for — from React frontends to Spring Boot backends to LLM integrations."
      />

      <div className="spherical-word-cloud-section">
        <SphericalWordCloud words={sphericalWords} />
      </div>

      <div className="skills-grid" ref={gridRef}>
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className={`skill-card skill-card--${category.accent} ${inView ? "card-visible" : ""}`}
            style={{
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
