import React, { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.07;
      currentY += (mouseY - currentY) * 0.07;
      glow.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`;
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
