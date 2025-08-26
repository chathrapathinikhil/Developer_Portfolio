import React from "react";
import SectionHeading from "./SectionHeading";

export default function Education() {
  const educationData = [
    {
      id: 1,
      degree: "Master of Science in Computer Science",
      institution: "California State University, Fullerton",
      dates: "Jan 2023 - May 2025",
      description:
        "At CSU Fullerton, I pursued my master’s in computer science. My focus was on advanced topics like algorithms, databases, and machine learning, but what stood out most was the hands-on work. I built projects involving web applications, cloud services, and even AI/LLM workflows. Working in teams was a big part of the program, and it gave me the chance to practice taking ideas from design through to deployment.",
    },
    {
      id: 2,
      degree:
        "Bachelor of Technology in Electronics and Communication Engineering",
      institution: "VNR Vignana Jyothi Institute of Engineering and Technology",
      dates: "Aug 2020 - Sep 2022",
      description:
        "For my undergraduate studies, I majored in electronics and communication engineering. While the program was rooted in hardware and communications, I gravitated toward programming and software projects. This is where I built my foundation in coding and problem-solving, picking up C and Java as my first serious programming languages. Being in a technical environment helped me transition smoothly into software engineering as a career.",
    },
  ];

  return (
    <section id="education">
      <div className="container">
        <SectionHeading
          eyebrow="Education"
          title="Educational Journey"
          subtitle="Academic achievements and learning path."
        />

        <div className="education-wrapper">
          {/* Left side: Education cards */}
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
                  <span className="card-dates">{edu.dates}</span>
                  <h3 className="card-role">{edu.degree}</h3>
                  <span className="card-company">{edu.institution}</span>
                  <p className="card-description">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side: Lottie animation container */}
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
