export function loadMovies() {
  const data = localStorage.getItem("movies");
  return data ? JSON.parse(data) : [];
}

export function saveMovies(movies) {
  localStorage.setItem("movies", JSON.stringify(movies));
}