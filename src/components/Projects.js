import React, { useState, useEffect, useRef } from "react";
import SectionHeading from "./SectionHeading";

const projectsData = [
  {
    id: 1,
    featured: true,
    title: "Multimodal Product Catalog",
    description:
      "Built a multimodal product catalog using CLIP and BLIP models for visual attribute extraction and semantic similarity search via pgvector. Product assets live in AWS S3, metadata in Supabase PostgreSQL. You can search by image or text — the system figures out what you mean either way.",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop",
    mockup: false,
    tech: ["CLIP", "BLIP", "pgvector", "FastAPI", "React", "AWS S3", "Supabase"],
    link: "https://huggingface.co/spaces/Crazy-Naruto/multimodal-product-catalog",
    repo: "https://huggingface.co/spaces/Crazy-Naruto/multimodal-product-catalog",
  },
  {
    id: 2,
    featured: false,
    title: "InstaCaptioner",
    description:
      "Caption generation service for Instagram posts and stories, powered by Gemini API and prompt-engineered LLM workflows. Feed it an image, get back captions that actually fit the vibe — not generic AI filler.",
    image:
      "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&auto=format&fit=crop",
    mockup: false,
    tech: ["Gemini API", "FastAPI", "React", "Prompt Engineering", "Gen AI"],
    link: "https://huggingface.co/spaces/Crazy-Naruto/InstaCap",
    repo: "https://huggingface.co/spaces/Crazy-Naruto/InstaCap",
  },
  {
    id: 3,
    featured: false,
    title: "HireSignal Web Extension",
    description:
      "Chrome extension that overlays company hiring trends and H-1B sponsorship insights directly on LinkedIn job pages. Surfaces real approval history and eligibility indicators in real time — so you know before you apply.",
    image:
      "https://res.cloudinary.com/dq2jzuzqr/image/upload/v1756143546/h1b_qevgrq.png",
    mockup: false,
    tech: ["Express.js", "Node.js", "MongoDB", "Firebase", "Chart.js", "JavaScript"],
    link: "https://www.youtube.com/watch?v=zneKCooV8Dg",
    repo: "https://github.com/chathrapathinikhil/web-extension",
  },
  {
    id: 4,
    featured: false,
    title: "CitySail OSM Map",
    description:
      "Evacuation route optimizer and emergency response planning tool built on OpenStreetMap. Uses pathfinding algorithms and real-time GeoJSON data with an intuitive Leaflet.js interface for seamless navigation and mapping.",
    image:
      "https://res.cloudinary.com/dq2jzuzqr/image/upload/v1756143553/citysail_kuwup4.png",
    mockup: false,
    tech: ["Leaflet.js", "OpenStreetMap", "React", "Firebase", "GeoJSON"],
    link: "https://citysail.netlify.app/home",
    repo: "https://github.com/akashbu/CitySail",
  },
  {
    id: 5,
    featured: false,
    title: "Workodoro",
    description:
      "Enhanced Pomodoro productivity app with cross-device sync, motivational streaks, and seamless task tracking. Added features that keep you in flow — not just counting down a timer.",
    image:
      "https://res.cloudinary.com/dq2jzuzqr/image/upload/v1756143543/workodoro_q0wq7w.png",
    mockup: false,
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    link: "#",
    repo: "https://github.com/FMZOrganization/final-project-droidsquad",
  },
];

export default function Projects() {
  const [visibleProjects, setVisibleProjects] = useState(projectsData.slice(0, 2));
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);
  const lastProjectRef = useRef(null);
  // 3D tilt on project visual panels
  useEffect(() => {
    const panels = document.querySelectorAll(".visual-panel");
    panels.forEach((panel) => {
      const onMove = (e) => {
        const rect = panel.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        panel.style.transform = `perspective(900px) rotateY(${x * 16}deg) rotateX(${-y * 10}deg) scale(1.04)`;
        panel.style.boxShadow = `
          ${-x * 20}px ${-y * 20}px 40px rgba(34, 204, 142, 0.15),
          0 20px 60px rgba(0,0,0,0.4)
        `;
      };
      const onLeave = () => {
        panel.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
        panel.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
      };
      panel.addEventListener("mousemove", onMove);
      panel.addEventListener("mouseleave", onLeave);
      panel._tiltCleanup = () => {
        panel.removeEventListener("mousemove", onMove);
        panel.removeEventListener("mouseleave", onLeave);
      };
    });
    return () => {
      document.querySelectorAll(".visual-panel").forEach((p) => p._tiltCleanup?.());
    };
  }, [visibleProjects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (
          lastEntry.isIntersecting &&
          !loading &&
          visibleProjects.length < projectsData.length
        ) {
          setLoading(true);
          setTimeout(() => {
            const nextBatch = projectsData.slice(0, visibleProjects.length + 1);
            setVisibleProjects(nextBatch);
            setLoading(false);
          }, 300);
        }
      },
      { threshold: 0.4 }
    );

    if (lastProjectRef.current) {
      observer.observe(lastProjectRef.current);
    }

    observerRef.current = observer;
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [visibleProjects.length, loading]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    const revealElements = document.querySelectorAll(".reveal-left, .reveal-right");
    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      revealElements.forEach((el) => revealObserver.unobserve(el));
    };
  }, [visibleProjects]);

  return (
    <section id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've Built"
          subtitle="From AI-powered catalogs to tools that save people hours every week."
        />

        <div className="projects-wrapper">
          <div className="projects-grid">
            {visibleProjects.map((project, index) => (
              <div
                key={project.id}
                className="project-row"
                ref={index === visibleProjects.length - 1 ? lastProjectRef : null}
              >
                <div className="project-content reveal-left">
                  {project.featured && (
                    <span className="featured-label">Featured Project</span>
                  )}
                  <h3 className="project-title">
                    <a href={project.link}>{project.title}</a>
                  </h3>
                  <div className="project-description">
                    <p>{project.description}</p>
                  </div>
                  <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-actions">
                    {project.link !== "#" ? (
                      <a
                        href={project.link}
                        className="cta-primary"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <svg viewBox="0 0 24 24" className="live-icon">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        Live Demo
                      </a>
                    ) : (
                      <span className="cta-primary disabled">
                        <svg viewBox="0 0 24 24" className="live-icon">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        Coming Soon
                      </span>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        className="cta-secondary"
                        aria-label={`View repository for ${project.title}`}
                      >
                        <svg viewBox="0 0 24 24" className="repo-icon">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                <div className="project-visual reveal-right">
                  <div className="visual-panel">
                    <div className="image-panel">
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        className="panel-image"
                      />
                      <div className="image-overlay"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="loading-indicator">
                <div className="loading-spinner"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
