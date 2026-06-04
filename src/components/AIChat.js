import React, { useState, useRef, useEffect } from "react";

// ─── Gemini system prompt ─────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an AI assistant embedded in Nikhil Kandagatla's developer portfolio at buildwithnikhil.com.
Your role: answer questions about Nikhil's professional background in a warm, direct, developer-to-developer tone.
Keep answers concise — 2 to 4 sentences unless a technical deep-dive is requested. No bullet walls unless the user asks for a list.

NIKHIL'S PROFILE
─────────────────
Location: Georgia, USA. Open to full-time roles across the US (remote or onsite).
Contact (public): kcnikhil2898@gmail.com | linkedin.com/in/chathrapathinikhil/ | github.com/chathrapathinikhil

EXPERIENCE
• Staples — Software Developer (Contract), Mar 2026–Present, Boston MA
  Stack: Spring Boot, Kafka, PostgreSQL, Azure Event Hubs, Docker, Kubernetes, Helm, Jenkins
  - Improved inventory sync accuracy by 40%
  - Automated reporting workflows, eliminating 20–30 hrs/week of manual work
  - Cut QA deployment setup time by 50%

• DentalScan — Software Developer Intern, Sep–Dec 2025, Venice FL
  Stack: Next.js, OpenAI GPT-4o, Retell AI, Twilio, PostgreSQL, Prisma
  - Reduced GPT-4 API calls by ~70% via two-layer intent classification → saved ~$2,400/month
  - Cut scheduling response time from 300+ seconds to under 60 seconds using Retell AI voice + SMS agents
  - Built Prisma/PostgreSQL schema for AI agent lifecycle management

• CSUF Auxiliary Services Corp — Application Support Engineer, Apr 2023–May 2025, Fullerton CA
  Stack: AWS AppStream, Jenkins, SQL, Omni CMS
  - Migrated ~150 virtual desktops to AWS AppStream, cutting provisioning time by ~70%
  - Automated SQL backups with Jenkins pipelines across 5 databases
  - Redesigned service pages supporting ~1,000 student/staff requests

• Tata Elxsi — Full Stack Developer, Nov 2020–Sep 2022, Bangalore India
  Stack: React, Three.js, Framer Motion, Node.js, GraphQL, MongoDB, React Native, WebSocket, Redux
  - Built homepage animations increasing session dwell time by 25–35 seconds
  - Contributed to 150K+ app downloads via React Native
  - Dropped live session sync complaints by 70% with WebSocket + Redux resync logic

EDUCATION
• MS Computer Science — California State University Fullerton (Jan 2023–May 2025)
• B.Tech Electronics & Communication Engineering — VNR VJIET, Hyderabad (Aug 2016–Sep 2020)

SKILLS
Frontend: React, Next.js, TypeScript, JavaScript, React Native, Three.js, Framer Motion, Tailwind, Redux
Backend: Node.js, Express.js, Java, Spring Boot, Python, FastAPI, Flask, Django, GraphQL, gRPC, Microservices
AI/ML: OpenAI GPT-4o, Gemini API, Retell AI, CLIP/BLIP, LangChain, HuggingFace, RAG, pgvector, Prompt Engineering, LLM Workflows
Databases: PostgreSQL, MongoDB, Firebase, Redis, Kafka, Azure Event Hubs, Prisma, Supabase, Elasticsearch
Cloud: AWS (AppStream, Lambda, S3), Azure, Docker, Kubernetes, Helm, Jenkins, GitHub Actions, CI/CD, Linux
Languages: JavaScript, TypeScript, Python, Java, C++, Go, Bash/Shell, SQL, YAML

PROJECTS
• Multimodal Product Catalog — CLIP + BLIP visual attribute extraction, pgvector semantic search, FastAPI + React, AWS S3 + Supabase. Live on HuggingFace Spaces.
• InstaCaptioner — Instagram caption generator powered by Gemini API and prompt-engineered LLM workflows. Live on HuggingFace Spaces.
• HireSignal — Chrome extension that overlays H-1B sponsorship history on LinkedIn job pages in real time. Node.js + MongoDB + Firebase + Chart.js. Demo on YouTube.
• CitySail — OpenStreetMap evacuation route optimizer. Leaflet.js + React + Firebase. Live at citysail.netlify.app.
• Workodoro — Cross-device Pomodoro app with task tracking and motivational streaks. React + Node + MongoDB.

INSTRUCTIONS
─────────────
- Speak warmly and directly — like a knowledgeable colleague, not a corporate bot
- If you don't know something, say so honestly rather than guessing
- If asked for an opinion on his work: be confident and specific, referencing actual metrics
- PRIVACY RULE: Never share Nikhil's phone number or home address under any circumstances
- PRIVACY RULE: If asked about personal life (relationships, health, daily routine, finances, family): say something like "I keep things professional here — happy to talk about Nikhil's work, projects, or skills though!"
- PRIVACY RULE: If asked anything inappropriate or harmful: politely decline and redirect
- Stay focused on professional topics. For unrelated questions: "I'm here to talk about Nikhil's work — is there anything about his experience or projects I can help with?"`;

const SUGGESTED_QUESTIONS = [
  "What's your current role?",
  "Tell me about your AI projects",
  "What's your tech stack?",
  "Are you open to opportunities?",
];

// ─── Fallback for when Gemini API key isn't configured ───────────────────────
function getFallbackResponse(input) {
  const msg = input.toLowerCase();
  if (msg.includes("current") || msg.includes("staples")) return "Currently contracting at Staples (Mar 2026–Present) as a Software Developer — improving inventory sync, automating workflows, and building out K8s CI/CD pipelines.";
  if (msg.includes("ai") || msg.includes("llm") || msg.includes("gpt") || msg.includes("gemini")) return "Nikhil has hands-on AI experience: cut GPT-4 costs by 70% at DentalScan, built Retell AI voice agents, and shipped multimodal search using CLIP/BLIP + pgvector. He's comfortable going from prompt engineering all the way to production deployment.";
  if (msg.includes("stack") || msg.includes("tech") || msg.includes("skill")) return "Full-stack, so both ends: React/Next.js/TypeScript on the frontend, Java/Spring Boot/Node.js on the backend, PostgreSQL/Kafka/Redis for data, and OpenAI/Gemini/Retell for AI integrations. Full list is in the Skills section.";
  if (msg.includes("open") || msg.includes("hire") || msg.includes("available") || msg.includes("opportunit")) return "Yes — actively looking. Open to full-stack, backend, or AI-focused roles. Reach him at kcnikhil2898@gmail.com or on LinkedIn.";
  if (msg.includes("project")) return "Top projects: Multimodal Product Catalog (CLIP/BLIP + pgvector), InstaCaptioner (Gemini API), HireSignal Chrome extension, and CitySail OSM map. Links in the Projects section above.";
  if (msg.includes("contact") || msg.includes("email") || msg.includes("reach")) return "Best way to reach Nikhil: kcnikhil2898@gmail.com or LinkedIn at linkedin.com/in/chathrapathinikhil/";
  return "Ask me about Nikhil's experience, projects, skills, or how to reach him — I'll do my best to help.";
}

// ─── Gemini API call ──────────────────────────────────────────────────────────
async function callGemini(apiKey, history, userMessage) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  // Build contents array: must alternate user/model, starting with user
  const contents = history.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.text }],
  }));
  contents.push({ role: "user", parts: [{ text: userMessage }] });

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: {
        temperature: 0.75,
        maxOutputTokens: 350,
        topP: 0.9,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini");
  return text.trim();
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AIChat() {
  const apiKey = process.env.GEMINI_API_KEY || "";
  const hasApiKey = apiKey.length > 10;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: "assistant",
      text: hasApiKey
        ? "Hey! I'm Nikhil's AI assistant — I know his full background and can have a real conversation about his work. What would you like to know?"
        : "Hey! I'm Nikhil's portfolio assistant. Ask me about his experience, projects, skills, or how to reach him.",
    },
  ]);
  const [apiHistory, setApiHistory] = useState([]); // keeps only user/assistant turns for Gemini context
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText) return;

    setInput("");
    setError(null);
    const userMsg = { id: Date.now(), role: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Build trimmed history (last 8 turns) for context
    const trimmedHistory = apiHistory.slice(-8);

    try {
      let responseText;
      if (hasApiKey) {
        responseText = await callGemini(apiKey, trimmedHistory, userText);
      } else {
        // Simulate thinking delay for fallback
        await new Promise((r) => setTimeout(r, 700 + Math.random() * 500));
        responseText = getFallbackResponse(userText);
      }

      const assistantMsg = { id: Date.now() + 1, role: "assistant", text: responseText };
      setMessages((prev) => [...prev, assistantMsg]);

      // Update API history (only user+assistant pairs, no system)
      setApiHistory((prev) => [
        ...prev,
        { role: "user", text: userText },
        { role: "assistant", text: responseText },
      ]);
    } catch (err) {
      console.error("AI chat error:", err);
      const errMsg = "Sorry, I hit a snag. You can reach Nikhil directly at kcnikhil2898@gmail.com";
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", text: errMsg },
      ]);
      setError(err.message);
    } finally {
      setIsTyping(false);
    }
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
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
                <div className="ai-chat-name">Portfolio AI {hasApiKey && <span className="ai-powered-badge">Gemini</span>}</div>
                <div className="ai-chat-status">
                  <span className="status-dot" />
                  {hasApiKey ? "AI-powered · knows everything about Nikhil" : "Ask me anything about Nikhil"}
                </div>
              </div>
            </div>
            <button className="ai-chat-close" onClick={() => setIsOpen(false)} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
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
                  {msg.text.split("\n").map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
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
              placeholder={hasApiKey ? "Ask anything about Nikhil..." : "Ask about skills, projects, experience..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button
              className="ai-send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              aria-label="Send"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

          {!hasApiKey && (
            <div className="ai-no-key-note">
              Add <code>GEMINI_API_KEY</code> to <code>.env</code> to enable full AI
            </div>
          )}
        </div>
      )}
    </>
  );
}
