import { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import axios from 'axios';
import Styles from './MovieDetailsPage.module.css';
import MovieCast from '../components/MovieCast';
import MovieReviews from '../components/MovieReviews';


const MovieDetailsPage = () => {
  const { movieId } = useParams(); // Get movieId from the URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state
  const [selectedTab, setSelectedTab] = useState(null);

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
          <li className={Styles.linkCast}>
            <Link to="#"  className={`${Styles.link} ${selectedTab === "cast" ? Styles.active : ""}`}
              onClick={() => setSelectedTab("cast")}>
              Cast
            </Link>
          </li>
          <li className={Styles.linkReviews}>
            <Link to="#" className={`${Styles.link} ${selectedTab === "reviews" ? Styles.active : ""}`}
              onClick={() => setSelectedTab("reviews")} >
              Reviews
            </Link>
          </li>
        </ul>

      </div>
      <div className={Styles.tabContent}>
        {selectedTab === "cast" && <MovieCast movieId={movieId} />}
        {selectedTab === "reviews" && <MovieReviews movieId={movieId} />}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
