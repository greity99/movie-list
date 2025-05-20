import React, { useState } from "react";

export default function AddMovieForm({ onAddMovie }) {
  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const parsedGrade = parseInt(grade);

    if (!trimmedTitle || isNaN(parsedGrade) || parsedGrade === 0) {
      alert("Du måste fylla i både titel och betyg.");
      return;
    }

    onAddMovie({ title: trimmedTitle, grade: parsedGrade });
    setTitle("");
    setGrade("");
  };

  return (
    <form onSubmit={handleSubmit} id="add-movie-form">
      <input
        id="title-field"
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        id="rating-field"
        type="number"
        placeholder="Betyg"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        min="1"
        max="5"
      />
      <button type="submit">Lägg till</button>
    </form>
  );
}