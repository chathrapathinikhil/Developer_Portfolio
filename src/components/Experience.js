import React from "react";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const experienceData = [
    {
      id: 1,
      dates: "Mar 2026 — Present",
      role: "Software Developer",
      type: "Contract",
      company: "Staples",
      location: "Boston, MA",
      bullets: [
        "Improved inventory synchronization accuracy by 40% between customer-facing platforms and warehouse stock using Spring Boot REST APIs, Kafka, PostgreSQL, and Azure Event Hubs.",
        "Automated hourly inventory reporting and reconciliation workflows, eliminating 20–30 hours of manual operational work weekly using Spring Boot, PostgreSQL, and Azure Blob Storage.",
        "Cut QA deployment and environment setup time by 50% through automated CI/CD pipelines using Jenkins, Docker, Kubernetes, and Helm.",
        "Enhanced inventory reporting responsiveness through normalized PostgreSQL schema design and SQL query optimization.",
      ],
      tags: ["Spring Boot", "Kafka", "PostgreSQL", "Azure", "Docker", "Kubernetes"],
    },
    {
      id: 2,
      dates: "Sep 2025 — Dec 2025",
      role: "Software Developer",
      type: "Intern",
      company: "DentalScan",
      location: "Venice, FL",
      bullets: [
        "Reduced GPT-4 API calls by ~70% through two-layer intent classification combining regex routing with OpenAI fallback, cutting projected inference costs by ~$2,400/month.",
        "Slashed scheduling response time from 300+ seconds to under 60 seconds by embedding real-time availability checks into Retell AI voice and SMS agents using GPT-4o.",
        "Built Prisma/PostgreSQL schema models supporting AI agent lifecycle management, reducing CRM reconciliation overhead by ~20 hours/month.",
      ],
      tags: ["Next.js", "OpenAI GPT-4o", "Retell AI", "Twilio", "PostgreSQL", "Prisma"],
    },
    {
      id: 3,
      dates: "Apr 2023 — May 2025",
      role: "Application Support Engineer",
      company: "CSUF Auxiliary Services Corporation",
      location: "Fullerton, CA",
      bullets: [
        "Migrated ~150 virtual desktop environments to AWS AppStream, reducing provisioning time by ~70% — from 45–60 min down to 10–15 min per setup.",
        "Replaced error-prone manual SQL backups with automated Jenkins pipelines across 5 databases, eliminating maintenance risk.",
        "Redesigned Omni CMS service pages, streamlining navigation and troubleshooting resources across ~1,000 student and staff support requests.",
      ],
      tags: ["AWS AppStream", "Jenkins", "SQL", "Omni CMS", "Automation"],
    },
    {
      id: 4,
      dates: "Nov 2020 — Sep 2022",
      role: "Full Stack Developer",
      company: "Tata Elxsi",
      location: "Bangalore, India",
      bullets: [
        "Developed interactive homepage animations increasing average session dwell time by 25–35 seconds using React, Three.js, and Framer Motion.",
        "Expanded platform to iOS and Android — contributing to 150K+ downloads via React Native.",
        "Dropped live session sync complaints by 70% by implementing WebSocket resync logic with event versioning and Redux state reconciliation.",
        "Optimized Node.js/GraphQL APIs with MongoDB for real-time student analytics across millions of records.",
      ],
      tags: ["React", "Three.js", "Node.js", "GraphQL", "MongoDB", "React Native"],
    },
  ];

  return (
    <section id="experience">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've Worked"
          subtitle="A track record of shipping things that move the needle."
        />

        <div className="experience-wrapper">
          <div className="experience-illustration">
            <iframe
              src="https://lottie.host/embed/022d5045-fb9a-4be4-9985-81c1581fe810/TvFpqDx0bn.lottie"
              style={{
                width: "450px",
                height: "450px",
                border: "none",
                background: "transparent",
              }}
              title="Experience Animation"
            ></iframe>
          </div>

          <div className="experience-cards">
            {experienceData.map((exp, index) => (
              <div
                key={exp.id}
                className="experience-card"
                style={{ "--card-index": index }}
              >
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" className="avatar-icon">
                    <path
                      d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-10-2h4v2h-4V5z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="card-content">
                  <div className="card-header-row">
                    <div className="card-header-left">
                      <span className="card-dates">{exp.dates}</span>
                      {exp.type && (
                        <span className="card-type">{exp.type}</span>
                      )}
                    </div>
                    <span className="card-location">{exp.location}</span>
                  </div>
                  <h3 className="card-role">{exp.role}</h3>
                  <span className="card-company">{exp.company}</span>
                  <ul className="card-bullets">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="card-tags">
                    {exp.tags.map((tag, i) => (
                      <span key={i} className="card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
