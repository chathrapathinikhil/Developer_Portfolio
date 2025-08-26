import React, { useState, useEffect, useRef } from "react";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [detailsRevealed, setDetailsRevealed] = useState(false);
  const [formRevealed, setFormRevealed] = useState(false);

  const detailsRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === detailsRef.current) {
              setDetailsRevealed(true);
            } else if (entry.target === formRef.current) {
              setFormRevealed(true);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (detailsRef.current) {
      observer.observe(detailsRef.current);
    }
    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Temporary debugging
      console.log("Environment variable check:");
      console.log(
        "- WEB3FORMS_ACCESS_KEY (process.env):",
        process.env.WEB3FORMS_ACCESS_KEY
      );
      console.log(
        "- WEB3FORMS_ACCESS_KEY (import.meta.env):",
        import.meta.env?.WEB3FORMS_ACCESS_KEY
      );
      console.log("- Type:", typeof process.env.WEB3FORMS_ACCESS_KEY);
      console.log(
        "- Length:",
        process.env.WEB3FORMS_ACCESS_KEY
          ? process.env.WEB3FORMS_ACCESS_KEY.length
          : 0
      );
      console.log(
        "- All env vars:",
        Object.keys(process.env).filter((key) => key.includes("WEB3FORMS"))
      );
      console.log("- All process.env keys:", Object.keys(process.env));
      console.log(
        "- All import.meta.env keys:",
        Object.keys(import.meta.env || {})
      );

      // Check if environment variable is available (try both methods)
      const accessKey =
        process.env.WEB3FORMS_ACCESS_KEY ||
        import.meta.env?.WEB3FORMS_ACCESS_KEY;

      if (!accessKey) {
        throw new Error(
          "Web3Forms access key not configured. Please add WEB3FORMS_ACCESS_KEY to your .env file and restart the development server."
        );
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();
      console.log("Web3Forms response:", result);

      if (result.success) {
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        alert("Message sent successfully! I'll get back to you soon.");
      } else {
        throw new Error(
          `Web3Forms error: ${result.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);

      // Show more specific error messages
      let errorMessage = "Failed to send message. ";
      if (error.message.includes("Web3Forms access key not configured")) {
        errorMessage +=
          "Configuration error: Please add WEB3FORMS_ACCESS_KEY to your .env file and restart the development server.";
      } else if (error.message.includes("fetch")) {
        errorMessage += "Network error: Please check your internet connection.";
      } else if (error.message.includes("Web3Forms error")) {
        errorMessage += `API error: ${error.message}`;
      } else {
        errorMessage +=
          "Please try again or contact me directly at kchathrapathinikhil@gmail.com";
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="Get in Touch"
          subtitle="Have a question or want to work together? Drop me a message!"
          className="contact-heading"
        />

        <div className="contact-wrapper">
          {/* Left Column: Contact Details */}
          <div
            ref={detailsRef}
            className={`contact-details ${detailsRevealed ? "revealed" : ""}`}
          >
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="contact-content">
                  <div className="contact-label">Email</div>
                  <div className="contact-value">
                    kchathrapathinikhil@gmail.com
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="contact-content">
                  <div className="contact-label">Location</div>
                  <div className="contact-value">
                    Fullerton, California, United States of America
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="contact-social">
              <a
                href="https://linkedin.com/in/chathrapathinikhilk/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="https://github.com/chathrapathinikhil"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link github"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* <a
                href="mailto:kchathrapathinikhil@gmail.com"
                className="social-link gmail"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.819L12 13.09l9.545-9.269h.819c.904 0 1.636.732 1.636 1.636z" />
                </svg>
              </a> */}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div
            ref={formRef}
            className={`contact-form ${formRevealed ? "revealed" : ""}`}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={errors.subject ? "error" : ""}
                />
                {errors.subject && (
                  <div className="error-message">{errors.subject}</div>
                )}
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={errors.message ? "error" : ""}
                />
                {errors.message && (
                  <div className="error-message">{errors.message}</div>
                )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
