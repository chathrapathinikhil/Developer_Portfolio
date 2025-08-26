import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="container foot-row">
        <div className="brand" style={{ opacity: 0.9 }}>
          <span className="logo" aria-hidden />{" "}
        </div>
        <div>
          Made with <span className="heart">❤</span> by{" "}
          <strong>Chathrapathi Nikhil Kandagatla</strong>
        </div>
      </div>
    </footer>
  );
}
