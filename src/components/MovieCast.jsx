import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "644b79412dfd2adb3be93f1d9c6093ec";
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
          params: { api_key: API_KEY },
        });
        setCast(response.data.cast);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch cast.");
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Cast</h3>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

MovieCast.propTypes={
    movieId:PropTypes.number.isRequired
}

export default MovieCast;
