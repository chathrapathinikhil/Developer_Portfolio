import React from "react";
import SectionHeading from "./SectionHeading";

export default function Education() {
  const educationData = [
    {
      id: 1,
      degree: "Master of Science, Computer Science",
      institution: "California State University, Fullerton",
      location: "California, USA",
      dates: "Jan 2023 — May 2025",
      highlights: [
        "Advanced algorithms, databases, and machine learning",
        "Built full-stack and AI/LLM projects end-to-end",
        "Cloud infrastructure and deployment workflows",
        "Team-based software engineering from design to production",
      ],
    },
    {
      id: 2,
      degree: "Bachelor of Technology, Electronics & Communication Engineering",
      institution: "VNR VJIET",
      location: "Hyderabad, India",
      dates: "Aug 2016 — Sep 2020",
      highlights: [
        "Foundation in hardware, communications, and embedded systems",
        "Gravitated toward software — built first projects in C and Java",
        "Transition into full-stack development started here",
        "Active in programming clubs and technical competitions",
      ],
    },
  ];

  return (
    <section id="education">
      <div className="container">
        <SectionHeading
          eyebrow="Education"
          title="Educational Journey"
          subtitle="Where the foundation was built."
        />

        <div className="education-wrapper">
          <div className="education-cards">
            {educationData.map((edu, index) => (
              <div
                key={edu.id}
                className="education-card"
                style={{ "--card-index": index }}
              >
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" className="avatar-icon">
                    <path
                      d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09v6.91L12 23l-9-5v-7l9-5z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="card-content">
                  <div className="card-header-row">
                    <span className="card-dates">{edu.dates}</span>
                    <span className="card-location">{edu.location}</span>
                  </div>
                  <h3 className="card-role">{edu.degree}</h3>
                  <span className="card-company">{edu.institution}</span>
                  <ul className="card-bullets">
                    {edu.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="education-illustration">
            <iframe
              src="https://lottie.host/embed/4f0a20fe-5595-4aea-a2b3-ac3d05d4acc7/3uSZBF8q8e.lottie"
              style={{
                width: "350px",
                height: "350px",
                border: "none",
                borderRadius: "16px",
                filter: "drop-shadow(0 0 20px rgba(46, 230, 166, 0.3))",
              }}
              title="Education Animation"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
