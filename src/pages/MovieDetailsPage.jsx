import { useEffect, useState, Link } from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Styles from './MovieDetailsPage.module.css';
import MovieCast from '../components/MovieCast';
import MovieReviews from '../components/MovieReviews';

const MovieDetailsPage = () => {
  const { movieId } = useParams(); // Get movieId from the URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state
 // const [reviewFilm, setReviewFilm] = useState("");
  console.log(movieId)
  const API_KEY = "644b79412dfd2adb3be93f1d9c6093ec";
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: { api_key: API_KEY },
        });
        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setError("Failed to fetch movie details.");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;


  return (
    <div className={Styles.movieDetails}>
      <div className={Styles.ımageSection}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
        alt={movieDetails.title}
        className={Styles.poster}
      />
      <div className={Styles.details}>
        <h1 className={Styles.filmTitle}>{movieDetails.title}</h1>
        <p><strong>User Score:</strong> {movieDetails.vote_average * 10}%</p>
        <div className={Styles.overview}>
          <h2>Overview</h2>
          <p>{movieDetails.overview}</p>
        </div>
        <div className={Styles.genres}>
          <h2>Genres</h2>
          <p>
            {movieDetails.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
        <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
      </div>
      </div>
      <div className={Styles.additional}>
        <h2>Additional Information</h2>
        <ul>
          <li>
            <Link to={`cast`} className={Styles.linkFilm}>
              Cast
            </Link>
          </li>
          <li>
            <Link to={`reviews`} className={Styles.linkFilm}>
              Reviews
            </Link>
          </li>
        </ul>

        {/* Routes for Cast and Reviews */}
        <Routes> 
          <Route path="cast" element={<MovieCast movieId={movieId} />} />
          <Route path="reviews" element={<MovieReviews movieId={movieId} />} />
        </Routes>
        
      </div>
    </div>
  );
};

export default MovieDetailsPage;
