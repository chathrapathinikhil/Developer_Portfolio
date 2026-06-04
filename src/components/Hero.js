import React, { useState, useEffect, useRef } from "react";

const TYPED_STRINGS = [
  "Full Stack Engineer",
  "AI Integration Developer",
  "React & Node.js Expert",
  "Cloud & Backend Engineer",
];

const STATS = [
  { value: "4+",    raw: 4,   suffix: "+",  label: "Years Experience"     },
  { value: "70%",   raw: 70,  suffix: "%",  label: "GPT-4 Cost Cut"       },
  { value: "40%",   raw: 40,  suffix: "%",  label: "Inventory Sync Boost" },
  { value: "150K+", raw: 150, suffix: "K+", label: "App Downloads"        },
];

function StatCounter({ raw, suffix, label, index, isVisible }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1400;
    const start = Date.now() + index * 160;

    const tick = () => {
      const now = Date.now();
      if (now < start) { requestAnimationFrame(tick); return; }
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * raw));
      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isVisible, raw, index]);

  return (
    <div className="hero-stat" style={{ "--i": index }}>
      <span className="stat-value">{display}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Typing animation
  useEffect(() => {
    if (isPaused) return;
    const current = TYPED_STRINGS[phraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
        } else {
          setIsPaused(true);
          setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 2200);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((i) => (i + 1) % TYPED_STRINGS.length);
        }
      }
    }, isDeleting ? 45 : 90);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, isPaused]);

  // Stats reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hero">
      <div className="grid-bg" aria-hidden="true">
        <div className="gradient"></div>
      </div>

      <div className="hero-spacer" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Open to new opportunities
        </div>

        <h1 className="hero-main-title">
          <span className="typed-text">{displayText}</span>
          <span className="typing-cursor">|</span>
        </h1>

        <p>
          Hey, I'm <span className="hero-name">Nikhil</span> — a full-stack
          developer with 4+ years of building things that actually ship. From
          cutting GPT-4 costs by 70% at a health-tech startup to keeping live
          classrooms in sync for 150K+ students, I like problems that come with
          real numbers on the other side.
        </p>

        <div
          ref={statsRef}
          className={`hero-stats ${statsVisible ? "visible" : ""}`}
        >
          {STATS.map((s, i) => (
            <StatCounter
              key={i}
              raw={s.raw}
              suffix={s.suffix}
              label={s.label}
              index={i}
              isVisible={statsVisible}
            />
          ))}
        </div>

        <div className="hero-actions">
          <a
            href="https://vyp6vvtab5.ufs.sh/f/xzzOTH34MFXnH53LuGdnW8yMgzDImuJVl9i2o35OaChLKpF7"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn magnetic-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="resume-icon">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            View Resume
          </a>
          <a href="#contact" className="cta-outline-btn magnetic-btn">
            Let's Talk
          </a>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-label="Scroll down">
        <span className="scroll-hint-text">Scroll</span>
        <svg className="scroll-hint-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}
