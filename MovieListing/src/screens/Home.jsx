import React, { useEffect, useState } from "react";
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const TMDB_API_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

const TMDB_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjViMmM5MzIzNmZjMGFjNmUxZTA4NWExNTg2OTFmNSIsIm5iZiI6MTc0ODM1MzM2Mi40MzI5OTk4LCJzdWIiOiI2ODM1YzE1MmUzZDRjYWE3ZTg0MTQ4ZDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CgsXJQb-OgTxW1uipzRTjFLngDitUXevKROFn3stjxg";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const fetchPopularMovies = async () => {
    try {
      const res = await fetch(TMDB_API_URL, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: TMDB_TOKEN,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.status_message || "API error");
      }

      const data = await res.json();
      return data.results;
    } catch (err) {
      console.error("Fetch Error:", err.message);
      setError(err.message || "Failed to fetch movies.");
      return [];
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      const results = await fetchPopularMovies();
      setMovies(results);
    };
    loadMovies();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>🎬 Popular Movies</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
