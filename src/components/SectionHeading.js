import React from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}) {
  return (
    <div className={className}>
      <div className="section-eyebrow">
        <div className="eyebrow-divider"></div>
        <span className="star-badge">★</span>
        <span className="eyebrow-text">{eyebrow}</span>
        <div className="eyebrow-divider"></div>
      </div>
      {title && <h2 className="section-title">{title}</h2>}
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </div>
  );
}
