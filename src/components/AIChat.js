import React, { useState, useRef, useEffect } from "react";

const SUGGESTED_QUESTIONS = [
  "What's your current role?",
  "Tell me about your AI projects",
  "What's your tech stack?",
  "Are you open to opportunities?",
];

function getResponse(input) {
  const msg = input.toLowerCase();

  if (
    msg.includes("hello") ||
    msg.includes("hi ") ||
    msg === "hi" ||
    msg.includes("hey")
  ) {
    return "Hey! I'm Nikhil's AI assistant. Ask me anything about his experience, projects, skills, or how to get in touch. What would you like to know?";
  }

  if (msg.includes("open to") || msg.includes("available") || msg.includes("looking") || msg.includes("hire") || msg.includes("opportunity") || msg.includes("opportunities")) {
    return "Yes — Nikhil is actively looking for his next role. He's open to full-stack, backend, or AI-focused positions. Based in Georgia but open to locations across the US. Best way to reach him is kcnikhil2898@gmail.com or via LinkedIn at linkedin.com/in/chathrapathinikhil/.";
  }

  if (msg.includes("current") || msg.includes("now") || msg.includes("staples") || msg.includes("latest job")) {
    return "Nikhil is currently contracting at Staples (Mar 2026–Present) as a Software Developer in Boston, MA. He's improved inventory sync accuracy by 40%, automated reporting workflows saving 20–30 hours/week, and cut deployment setup time by 50% using Jenkins, Docker, Kubernetes, and Kafka.";
  }

  if (msg.includes("dentalscan") || msg.includes("dental") || msg.includes("gpt cost") || msg.includes("inference cost") || msg.includes("retell") || msg.includes("voice agent")) {
    return "At DentalScan (Sep–Dec 2025), Nikhil built AI-powered scheduling using Retell AI voice agents and GPT-4o. He reduced GPT-4 API calls by ~70% through smart intent classification (regex + OpenAI fallback), saving ~$2,400/month in inference costs. He also cut scheduling response time from 300+ seconds to under 60 seconds.";
  }

  if (msg.includes("tata") || msg.includes("elxsi") || msg.includes("whitehat") || msg.includes("edtech") || msg.includes("jaguar") || msg.includes("land rover")) {
    return "At Tata Elxsi (Nov 2020–Sep 2022), Nikhil worked as a Full Stack Developer. He built animations in React + Three.js that boosted dwell time by 25–35 seconds, shipped React Native features that contributed to 150K+ app downloads, and fixed live classroom sync failures (WebSocket + Redux) reducing complaints by 70%.";
  }

  if (msg.includes("csuf") || msg.includes("appstream") || msg.includes("california state") || msg.includes("fullerton")) {
    return "At CSUF Auxiliary Services Corp (Apr 2023–May 2025), Nikhil migrated ~150 virtual desktop environments to AWS AppStream — cutting provisioning time by ~70%. He also automated SQL backups with Jenkins pipelines and redesigned service pages used by ~1,000 students and staff.";
  }

  if (
    msg.includes("experience") ||
    msg.includes("work history") ||
    msg.includes("career") ||
    msg.includes("background")
  ) {
    return "Nikhil has 4+ years of experience across: \n\n• Staples (2026–now) — Spring Boot, Kafka, Kubernetes, Azure \n• DentalScan (2025) — OpenAI, Retell AI, Twilio, Next.js \n• CSUF (2023–2025) — AWS AppStream, Jenkins, SQL \n• Tata Elxsi (2020–2022) — React, Node.js, GraphQL, React Native \n\nWant details on any specific role?";
  }

  if (msg.includes("multimodal") || msg.includes("clip") || msg.includes("blip") || msg.includes("product catalog") || msg.includes("pgvector") || msg.includes("semantic search")) {
    return "The Multimodal Product Catalog is one of his standout projects — it uses CLIP and BLIP models for visual attribute extraction and semantic similarity search via pgvector. Images go to AWS S3, metadata to Supabase PostgreSQL. You can search by image OR text. Deployed on Render with a React + FastAPI stack. Live on HuggingFace Spaces.";
  }

  if (msg.includes("instacap") || msg.includes("caption") || msg.includes("instagram")) {
    return "InstaCaptioner is a caption generation service for Instagram using Gemini API. You give it an image, it generates contextually accurate captions through prompt-engineered LLM workflows. Live on HuggingFace Spaces — worth checking out if you want to see how he structures AI prompts.";
  }

  if (msg.includes("hiresignal") || msg.includes("h1b") || msg.includes("sponsorship") || msg.includes("extension") || msg.includes("chrome")) {
    return "HireSignal is a Chrome extension that overlays H-1B sponsorship history and hiring trends directly on LinkedIn job pages in real time. Built with Node.js, MongoDB, Firebase, and Chart.js. There's a demo on YouTube — link is in the Projects section.";
  }

  if (msg.includes("citysail") || msg.includes("evacuation") || msg.includes("leaflet") || msg.includes("map")) {
    return "CitySail is an evacuation route optimizer built on OpenStreetMap with Leaflet.js. It uses pathfinding algorithms and real-time GeoJSON data to help with emergency response planning. Clean React + Firebase stack. Live at citysail.netlify.app.";
  }

  if (msg.includes("project") || msg.includes("built") || msg.includes("made") || msg.includes("portfolio project")) {
    return "Nikhil's notable projects: \n\n• Multimodal Product Catalog — CLIP/BLIP + pgvector semantic search \n• InstaCaptioner — Gemini-powered Instagram captions \n• HireSignal — Chrome extension for H-1B sponsorship insights \n• CitySail — OpenStreetMap evacuation route planner \n• Workodoro — cross-device Pomodoro productivity app \n\nWhich one would you like to dig into?";
  }

  if (msg.includes("ai") || msg.includes("machine learning") || msg.includes("llm") || msg.includes("gpt") || msg.includes("gemini") || msg.includes("artificial intelligence") || msg.includes("openai")) {
    return "Nikhil has hands-on AI experience: \n\n• Cut GPT-4 inference costs by 70% at DentalScan using intent classification \n• Built voice + SMS AI agents with Retell AI and GPT-4o \n• Multimodal search with CLIP/BLIP + pgvector \n• Caption generation with Gemini API \n• Tools: OpenAI, Gemini API, Retell AI, prompt engineering, LLM workflows, Gen AI";
  }

  if (
    msg.includes("react") ||
    msg.includes("frontend") ||
    msg.includes("next.js") ||
    msg.includes("ui") ||
    msg.includes("javascript")
  ) {
    return "Frontend is Nikhil's comfort zone — React, Next.js, TypeScript, Redux, Three.js, Framer Motion, React Native, Tailwind. He's shipped production UIs from animated landing pages (Tata Elxsi) to multi-screen React Native apps with 150K+ downloads.";
  }

  if (
    msg.includes("backend") ||
    msg.includes("node") ||
    msg.includes("java") ||
    msg.includes("spring") ||
    msg.includes("api") ||
    msg.includes("server")
  ) {
    return "On the backend: Node.js, Express.js, Java, Spring Boot, Python, FastAPI, Flask. He's built REST APIs, GraphQL services, Kafka pipelines, and Microservices. Currently using Spring Boot + Kafka + PostgreSQL at Staples for high-throughput inventory sync.";
  }

  if (
    msg.includes("cloud") ||
    msg.includes("aws") ||
    msg.includes("azure") ||
    msg.includes("docker") ||
    msg.includes("kubernetes") ||
    msg.includes("devops") ||
    msg.includes("ci/cd")
  ) {
    return "Nikhil is comfortable in cloud and DevOps: AWS (AppStream, Lambda, S3, API Gateway), Azure (Event Hubs, Blob Storage), Docker, Kubernetes, Helm, Jenkins, GitHub Actions. He's currently running K8s deployments with Helm charts at Staples.";
  }

  if (
    msg.includes("skill") ||
    msg.includes("tech") ||
    msg.includes("stack") ||
    msg.includes("language") ||
    msg.includes("know")
  ) {
    return "Nikhil's stack spans: \n\n• Frontend: React, Next.js, TypeScript, Three.js \n• Backend: Node.js, Java, Spring Boot, Python, FastAPI \n• AI: OpenAI, Gemini, Retell AI, CLIP/BLIP \n• Cloud: AWS, Azure, Docker, K8s \n• DBs: PostgreSQL, MongoDB, Kafka, Firebase \n\nFull list is in the Skills section above.";
  }

  if (
    msg.includes("education") ||
    msg.includes("degree") ||
    msg.includes("school") ||
    msg.includes("university") ||
    msg.includes("ms") ||
    msg.includes("master")
  ) {
    return "Nikhil has an MS in Computer Science from California State University Fullerton (Jan 2023 – May 2025). Before that, a B.Tech in Electronics and Communication Engineering from VNR VJIET, Hyderabad (2016–2020).";
  }

  if (
    msg.includes("contact") ||
    msg.includes("email") ||
    msg.includes("reach") ||
    msg.includes("get in touch") ||
    msg.includes("message")
  ) {
    return "You can reach Nikhil at: \n\n📧 kcnikhil2898@gmail.com \n📞 678-855-9957 \n💼 linkedin.com/in/chathrapathinikhil/ \n\nOr just fill out the contact form at the bottom of this page — he checks it regularly.";
  }

  if (msg.includes("resume") || msg.includes("cv") || msg.includes("download")) {
    return "You can view Nikhil's full resume using the \"View Resume\" button at the top of this page. It has the complete work history, skills, and project details.";
  }

  if (msg.includes("location") || msg.includes("where") || msg.includes("based") || msg.includes("georgia") || msg.includes("remote")) {
    return "Nikhil is based in Georgia, USA and open to locations across the US — remote, hybrid, or on-site. Relocation is on the table for the right opportunity.";
  }

  if (msg.includes("thank")) {
    return "Happy to help! Feel free to reach out directly at kcnikhil2898@gmail.com if you want to have a real conversation.";
  }

  return "I can tell you about Nikhil's experience, projects, skills, education, or how to reach him. Try asking something like \"What's his tech stack?\" or \"Tell me about his AI work\" — or click one of the suggestions below.";
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: "assistant",
      text: "Hey! I'm Nikhil's AI assistant. I know everything about his experience, projects, and skills. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages]);

  const sendMessage = (text) => {
    const userText = text || input.trim();
    if (!userText) return;

    setInput("");
    const userMsg = { id: Date.now(), role: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const delay = 700 + Math.random() * 600;
    setTimeout(() => {
      const response = getResponse(userText);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", text: response },
      ]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        className={`ai-chat-fab ${hasUnread && !isOpen ? "has-unread" : ""}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Open AI assistant"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
          </svg>
        )}
        {hasUnread && !isOpen && <span className="fab-unread-dot" />}
      </button>

      {isOpen && (
        <div className="ai-chat-panel">
          <div className="ai-chat-header">
            <div className="ai-chat-header-info">
              <div className="ai-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <div>
                <div className="ai-chat-name">Portfolio AI</div>
                <div className="ai-chat-status">
                  <span className="status-dot" />
                  Ask me anything about Nikhil
                </div>
              </div>
            </div>
            <button className="ai-chat-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-message ai-message--${msg.role}`}>
                {msg.role === "assistant" && (
                  <div className="ai-message-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                )}
                <div className="ai-message-bubble">
                  {msg.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < msg.text.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message ai-message--assistant">
                <div className="ai-message-avatar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div className="ai-message-bubble ai-typing-indicator">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && (
            <div className="ai-suggestions">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button key={i} className="ai-suggestion-chip" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="ai-chat-input-area">
            <input
              ref={inputRef}
              type="text"
              className="ai-chat-input"
              placeholder="Ask about skills, projects, experience..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button
              className="ai-send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
