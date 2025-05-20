import React, { useState, useEffect } from "react";

const STORAGE_KEY = "movies";

function App() {
  const [movies, setMovies] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  }, [movies]);

  function handleAddMovie(e) {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const numericGrade = parseInt(grade);

    if (!trimmedTitle || isNaN(numericGrade) || numericGrade < 1 || numericGrade > 5) {
      alert("Du måste fylla i både titel och ett betyg mellan 1 och 5.");
      return;
    }

    if (movies.some(m => m.title.toLowerCase() === trimmedTitle.toLowerCase())) {
      alert("Denna film finns redan i listan.");
      return;
    }

    const newMovie = { title: trimmedTitle, grade: numericGrade };
    setMovies([...movies, newMovie]);
    setTitle("");
    setGrade("");
  }

  function handleDelete(titleToDelete) {
    setMovies(movies.filter(m => m.title !== titleToDelete));
  }

  function orderAlphabetic() {
    const sorted = [...movies].sort((a, b) =>
      a.title.localeCompare(b.title, "sv", { sensitivity: "base" })
    );
    setMovies(sorted);
  }

  function orderByGrade() {
    const sorted = [...movies].sort((a, b) => b.grade - a.grade);
    setMovies(sorted);
  }

  return (
    <div className="container mt-4">
      <h1>Min filmlista</h1>

      <form onSubmit={handleAddMovie} className="mb-3">
        <div className="mb-2">
          <label htmlFor="title-field" className="form-label">
            Filmtitel
          </label>
          <input
            id="title-field"
            className="form-control"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Skriv filmtitel"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="rating-field" className="form-label">
            Betyg (1-5)
          </label>
          <select
            id="rating-field"
            className="form-select"
            value={grade}
            onChange={e => setGrade(e.target.value)}
          >
            <option value="">Välj betyg</option>
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Spara film
        </button>
      </form>

      <div className="mb-3">
        <button
          className="btn btn-secondary me-2"
          onClick={orderAlphabetic}
          type="button"
        >
          Sortera alfabetiskt
        </button>
        <button
          className="btn btn-secondary"
          onClick={orderByGrade}
          type="button"
        >
          Sortera efter betyg
        </button>
      </div>

      <ul className="list-group" id="movie-list">
        {movies.length === 0 && (
          <li className="list-group-item">Inga filmer tillagda.</li>
        )}
        {movies.map(movie => (
          <li
            key={movie.title}
            data-grade={movie.grade}
            data-title={movie.title}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              {movie.title}{" "}
              {[...Array(movie.grade)].map((_, i) => (
                <img
                  key={i}
                  src="/star.png"
                  alt="Star"
                  className="star-icon"
                  style={{ width: 20, height: 20, marginLeft: 4 }}
                />
              ))}
            </div>

            <img
              src="/delete.png"
              alt="Delete movie"
              className="delete-movie"
              style={{ cursor: "pointer", width: 20, height: 20 }}
              onClick={() => handleDelete(movie.title)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
