import React from "react";

export default function ProjectCard({ title, desc, img }) {
  return (
    <article className="card">
      <img className="thumb" src={img} alt="Project thumbnail" />
      <div className="card-body">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </article>
  );
}
