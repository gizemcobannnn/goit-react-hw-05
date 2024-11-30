import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import Styles from './MovieCast.module.css';

const MovieCast = ({ movieId }) => {
  const [castt, setCast] = useState([]);
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
        setCast(response.data.cast || []);
        console.log(castt);
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
      <h3 style={{textAlign:"start"}}>Cast</h3>
      <ul className={Styles.listOfCast}>
      {castt.map((member) => (
          <li key={member.id} className={Styles.elementCast}> 
            {member.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200/${member.profile_path}`}
                alt={member.name}
                style={{ width: "50px", height: "75px", objectFit: "cover" }}
              />
            ) : (
              <p>No Image</p>
            )}
            <p><strong>Name:</strong> {member.name}</p>
            <p><strong>Character:</strong> {member.character || "Not Available"}</p>
          </li>
        ))}
      </ul>
 
    </div>
  );
};

MovieCast.propTypes={
  movieId: PropTypes.string.isRequired,
}

export default MovieCast;
