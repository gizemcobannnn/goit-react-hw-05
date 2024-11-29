import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [search, setSearch] = useState(""); // State for search query
  const [movieList, setMovieList] = useState([]); // State for movie list
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const API_KEY = "644b79412dfd2adb3be93f1d9c6093ec";
  const BASE_URL = "https://api.themoviedb.org/3";

  const handleFetchMovies = async () => {
    if (!search.trim()) {
      setError("Please enter a valid search query.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: { api_key: API_KEY, query: search },
      });

      setMovieList(response.data.results);
      setLoading(true);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movie details.");
      setLoading(true);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className={Styles.searchBox}>
      <div>
        {/* Search Input */}
        <input
          className={Styles.inputSearch}
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Search Button */}
        <button className={Styles.searchButton} onClick={handleFetchMovies}>
          Search
        </button>
      </div>

      {/* Loading Message */}
      {loading && <p>Loading movie details...</p>}

      {/* Error Message */}
      {error && <p className={Styles.errorMessage}>{error}</p>}

      {/* Movie List or No Results */}
      <div>
        {movieList.length > 0  ? (
          <ul className={Styles.listOfSearch}>
            {movieList.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} className={Styles.movieLink}>
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          !loading && !error &&  <p>No movies found. Try a different search.</p>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
