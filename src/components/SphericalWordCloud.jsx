import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

const SphericalWordCloud = ({ words = [] }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.2, y: 0, z: 0 });
  const [hoveredWord, setHoveredWord] = useState(null);

  // Generate Fibonacci sphere points for uniform distribution
  const spherePoints = useMemo(() => {
    if (words.length === 0) return [];

    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

    for (let i = 0; i < words.length; i++) {
      const y = 1 - (i / (words.length - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      points.push({
        x,
        y,
        z,
        word: words[i],
        originalIndex: i,
      });
    }

    return points;
  }, [words]);

  // Canvas setup and animation
  const animate = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = containerRef.current.getBoundingClientRect();

    // Set canvas size
    canvas.width = rect.width;
    canvas.height = rect.height;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * 0.3;

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Apply rotation
    const cosX = Math.cos(rotationRef.current.x);
    const sinX = Math.sin(rotationRef.current.x);
    const cosY = Math.cos(rotationRef.current.y);
    const sinY = Math.sin(rotationRef.current.y);

    // Transform and project points
    const projectedPoints = spherePoints.map((point) => {
      // Apply rotation
      let x = point.x;
      let y = point.y;
      let z = point.z;

      // Rotate around X axis
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;

      // Rotate around Y axis
      const x2 = x * cosY + z1 * sinY;
      const z2 = -x * sinY + z1 * cosY;

      // Project to 2D
      const scale = radius / (radius + z2);
      const screenX = centerX + x2 * scale * radius;
      const screenY = centerY + y1 * scale * radius;

      return {
        ...point,
        screenX,
        screenY,
        scale,
        z: z2,
      };
    });

    // Sort by depth (back to front)
    projectedPoints.sort((a, b) => a.z - b.z);

    // Draw words
    projectedPoints.forEach((point) => {
      const { word, screenX, screenY, scale, z } = point;

      // Calculate font size based on weight and scale
      const baseSize = 12 + (word.weight || 0.5) * 16;
      const fontSize = Math.max(8, baseSize * scale);

      // Calculate opacity based on depth
      const opacity = Math.max(0.3, Math.min(1, (z + radius) / (radius * 2)));

      // Set font
      ctx.font = `${fontSize}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Helvetica, Arial`;

      // Check if mouse is over this word
      const mouseX = lastMousePos.x - rect.left;
      const mouseY = lastMousePos.y - rect.top;

      const textWidth = ctx.measureText(word.text).width;
      const textHeight = fontSize;

      const isHovered =
        !isDragging &&
        mouseX >= screenX - textWidth / 2 &&
        mouseX <= screenX + textWidth / 2 &&
        mouseY >= screenY - textHeight / 2 &&
        mouseY <= screenY + textHeight / 2;

      if (isHovered && !hoveredWord) {
        setHoveredWord(point);
      } else if (!isHovered && hoveredWord === point) {
        setHoveredWord(null);
      }

      // Calculate color based on state and depth
      let color;
      if (isHovered || hoveredWord === point) {
        color = "#2EE6A6"; // Active mint color
      } else {
        // Gradient based on Z position (depth)
        const normalizedZ = (z + radius) / (radius * 2); // 0 to 1
        if (normalizedZ < 0.33) {
          color = "#BFC5CF"; // Light gray in back
        } else if (normalizedZ < 0.66) {
          color = "#3BF9C2"; // Cyan in middle
        } else {
          color = "#2EE6A6"; // Mint in front
        }
      }

      // Set text properties
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;

      // Add glow effect for active words
      if (isHovered || hoveredWord === point) {
        ctx.shadowColor = "#2EE6A6";
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      } else {
        ctx.shadowBlur = 0;
      }

      // Draw text
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(word.text, screenX, screenY);

      // Reset shadow
      ctx.shadowBlur = 0;
    });

    // Update rotation for idle animation
    if (!isDragging) {
      rotationRef.current.y += 0.005;
    }

    // Continue animation
    animationRef.current = requestAnimationFrame(animate);
  }, [spherePoints, isDragging, lastMousePos, hoveredWord]);

  // Mouse event handlers
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMousePos.x;
        const deltaY = e.clientY - lastMousePos.y;

        rotationRef.current.x = Math.max(
          -Math.PI / 3,
          Math.min(Math.PI / 3, rotationRef.current.x + deltaY * 0.01)
        );
        rotationRef.current.y += deltaX * 0.01;

        setLastMousePos({ x: e.clientX, y: e.clientY });
      } else {
        setLastMousePos({ x: e.clientX, y: e.clientY });
      }
    },
    [isDragging, lastMousePos]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    if (hoveredWord?.word.href) {
      window.open(hoveredWord.word.href, "_blank", "noopener,noreferrer");
    }
  }, [hoveredWord]);

  // Start animation
  useEffect(() => {
    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className="spherical-word-cloud-container"
      style={{
        width: "100%",
        height: "600px",
        position: "relative",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default SphericalWordCloud;
