import React from "react";

export default function Movie({ title, grade, onDelete }) {
  const stars = Array.from({ length: grade }, (_, i) => <span key={i} className="star">★</span>);

  return (
    <li data-title={title}>
      <span>{title} – {stars}</span>
      <button onClick={onDelete} className="delete-movie">❌</button>
    </li>
  );
}