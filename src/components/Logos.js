import React from "react";

export default function Logos() {
  return (
    <div className="logos container">
      <div className="logos-row">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="logo-pill">
            Logop ipsum
          </div>
        ))}
      </div>
    </div>
  );
}
