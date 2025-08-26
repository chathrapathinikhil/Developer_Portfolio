import React, { useState, useEffect, useRef } from "react";
import SectionHeading from "./SectionHeading";

// Use image from public assets folder
const citysailImage = "/assets/citysail.png";

const projectsData = [
  {
    id: 1,
    featured: false,
    title: "Sponsorship Web Extension",
    description:
      "Developed a data pipeline and backend system to process and analyze H1B records, providing users with insights into sponsorship trends and enabling informed decision-making through efficient data access and operations.",
    image:
      "https://res.cloudinary.com/dq2jzuzqr/image/upload/v1756143546/h1b_qevgrq.png",
    mockup: false,
    tech: [
      "Express.js",
      "Node.js",
      "MongoDB",
      "Firebase",
      "Chart.js",
      "Javascript",
      "HTML",
      "CSS",
    ],
    link: "https://www.youtube.com/watch?v=zneKCooV8Dg",
    repo: "https://github.com/chathrapathinikhil/h1b-web-extension",
  },
  {
    id: 2,
    featured: false,
    title: "Workodoro: Pomodoro Enhancement",
    description:
      "Improved a Pomodoro productivity app to enhance focus, task management, and user engagement by introducing cross-device synchronization, motivational features, and seamless functionality. Added tools for efficient task tracking and integrated elements to inspire users during work and break sessions.",
    image:
      "https://res.cloudinary.com/dq2jzuzqr/image/upload/v1756143543/workodoro_q0wq7w.png",
    mockup: false,
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    link: "#",
    repo: "https://github.com/FMZOrganization/final-project-droidsquad",
  },
  {
    id: 3,
    featured: false,
    title: "Hangman game",
    description:
      "Created a classic Hangman game with word guessing logic, tracking of attempts, and a simple interactive interface.",
    image:
      "https://res.cloudinary.com/dq2jzuzqr/image/upload/v1756158185/Screenshot_2025-08-25_144220_aqlbzv.png",
    mockup: false,
    tech: ["Vue.js", "Flask", "Socket.IO", "CSS", "Vercel"],
    link: "https://nickmackenzie.github.io/hangman/",
    repo: "https://github.com/chathrapathinikhil/hangman-game",
  },
  {
    id: 4,
    featured: false,
    title: "CitySail OSM Map Project",
    description:
      "Developed a simulation to optimize evacuation routes and enhance emergency response planning, leveraging advanced algorithms and real-time data. Designed an intuitive interface for seamless navigation and mapping, supported by efficient deployment pipelines for reliability and scalability.",
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
    title: "Portfolio",
    description:
      "The YouTube Translator project focused on bridging speech recognition and natural language processing to enable cross-language video accessibility. It combined automatic speech-to-text conversion with machine translation to produce subtitles in multiple languages. The system was designed with a modular backend for handling model inference and a simple frontend for user interaction, demonstrating how AI models can be integrated into a practical, end-to-end application.",
    image:
      "https://res.cloudinary.com/dq2jzuzqr/image/upload/v1756182816/Screenshot_2025-08-25_213307_cconvx.png",
    mockup: false,
    tech: ["React", "CSS", "Javascript", "Three.js", "Figma"],
    link: "https://buildwithnikhil.com/",
    repo: "https://github.com/chathrapathinikhil/Developer_Portfolio",
  },
];

export default function Projects() {
  const [visibleProjects, setVisibleProjects] = useState(
    projectsData.slice(0, 2)
  );
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);
  const lastProjectRef = useRef(null);

  // Progressive loading with Intersection Observer
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
          // Simulate loading delay
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

  // Reveal animations with Intersection Observer
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

    const revealElements = document.querySelectorAll(
      ".reveal-left, .reveal-right"
    );
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
          title="Things I've worked on, Some of Them"
          subtitle="Building solutions that make a difference in people's lives"
        />

        <div className="projects-wrapper">
          <div className="projects-grid">
            {visibleProjects.map((project, index) => (
              <div
                key={project.id}
                className="project-row"
                ref={
                  index === visibleProjects.length - 1 ? lastProjectRef : null
                }
              >
                {/* Left side: Text content */}
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

                {/* Right side: Visual mockup */}
                <div className="project-visual reveal-right">
                  <div className="visual-panel">
                    {project.mockup ? (
                      <div className="device-mockup">
                        <div className="mockup-screen">
                          <img
                            src={project.image}
                            alt={`${project.title} mockup`}
                            className="mockup-image"
                          />
                          <div className="mockup-overlay">
                            <div className="mockup-content">
                              <h4>Stock Market App</h4>
                              <p>STOCK MARKET CALENDAR AND INVESTMENTS</p>
                              <div className="mockup-logo">
                                <div className="hexagon-logo">
                                  <span>$</span>
                                </div>
                                <span className="app-name">X-Dividend</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="image-panel">
                        <img
                          src={project.image}
                          alt={`${project.title} screenshot`}
                          className="panel-image"
                        />
                        <div className="image-overlay"></div>
                      </div>
                    )}
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
