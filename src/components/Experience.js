import React from "react";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const experienceData = [
    {
      id: 1,
      dates: "(Apr 2023 - May 2025)",
      role: "IT Titan Tech CenterStudent Assistant",
      company: "CSUF Auxiliary Services Corporation",
      description:
        "At CSUF, I worked closely with the College of Education to design and maintain their website, making it more engaging and accessible for students, faculty, and staff. In addition to web development, I supported day-to-day technology needs, improved online resources, and helped streamline internal processes. My work contributed to creating a smoother digital experience for the college community while ensuring accurate information was easy to find and use.",
    },
    {
      id: 2,
      dates: "(Apr 2021 - Sep 2022)",
      role: "Full Stack Software Engineer",
      company: "Tata Elxsi Ltd.",
      client: "WhiteHat Jr",
      description:
        "At WhiteHat Jr, I was part of the team building the platform that delivers online coding lessons to students. Most of my work was split between the frontend and backend. On the frontend side, I helped build interactive learning modules and made sure the UI ran smoothly without glitches or delays. On the backend side, I worked on things like payment systems, login flows, and keeping everything secure. I also spent a lot of time fixing performance issues and preventing bugs from slipping into production. Whenever there were repetitive tasks that slowed the team down, I wrote scripts to automate them so we could focus on actual development.",
    },
    {
      id: 3,
      dates: "(Nov 2020 - Apr 2021)",
      role: "Software Engineer",
      company: "Tata Elxsi Ltd.",
      client: "Jaguar Land Rover",
      description:
        "At Jaguar Land Rover, I contributed to the infotainment systems used in their vehicles. My role involved developing features for the in-car display — everything from the way the screens looked to how the system responded when drivers interacted with it. I also worked on the backend logic that kept the UI updated in real time with what the car was doing. Beyond development, I helped set up automated pipelines so new versions could be tested and released with fewer errors. A big part of the job was also making sure the system was stable, testing it thoroughly, and fixing issues before they reached customers.",
    },
  ];

  return (
    <section id="experience">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Professional Journey"
          subtitle="Roles I've worked in over time."
        />

        <div className="experience-wrapper">
          {/* Left side: SVG/Lottie illustration container */}
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

          {/* Right side: Experience cards */}
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
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="card-content">
                  <span className="card-dates">{exp.dates}</span>
                  <h3 className="card-role">{exp.role}</h3>
                  <span className="card-company">{exp.company}</span>
                  {exp.client && (
                    <span className="card-client">Client: {exp.client}</span>
                  )}
                  <p className="card-description">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
