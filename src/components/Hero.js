import React from "react";

export default function Hero() {
  return (
    <div className="hero">
      <div className="grid-bg" aria-hidden="true">
        <div className="gradient"></div>
      </div>
      <div
        className="hero-content"
        style={{ textAlign: "center", maxWidth: "1400px", margin: "-10vh" }}
      >
        <h1 className="hero-main-title">Full Stack Software Engineer</h1>
        <p>
          Hi! I'm{" "}
          <span className="hero-name">Chathrapathi Nikhil Kandagatla</span>, a
          computer science graduate with experience in React, JavaScript,
          Node.js, Python, TypeScript, and full-stack development. I enjoy
          building practical, user-focused applications and continue to expand
          my skills as a software engineer.
        </p>
        <div className="hero-actions">
          <a
            href="https://vyp6vvtab5.ufs.sh/f/xzzOTH34MFXnrtcVOcusBxa4eWnE13cKLTF0HOGqIQd8kYPM"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="resume-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            View Resume
          </a>
        </div>
      </div>
    </div>
  );
}
