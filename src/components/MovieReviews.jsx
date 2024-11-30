import PropTypes from 'prop-types';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Styles from './MovieReviews.module.css'
const MovieReviews = ({movieId}) => {
    console.log(movieId);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const API_KEY = "644b79412dfd2adb3be93f1d9c6093ec";
    const BASE_URL = "https://api.themoviedb.org/3";
  
    useEffect(() => {
      const fetchReview = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
            params: { api_key: API_KEY },
          });
          setReviews(response.data.results || []); // Ensure it's an array
          setLoading(false);
        } catch (error) {
          console.error(error);
          setError("Failed to fetch cast.");
          setLoading(false);
        }
      };
  
      fetchReview();
    }, [movieId]);
  
    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>{error}</p>;
  
    return (
      <div className={Styles.reviews}>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id} className={Styles.reviewItem}>
                <p><strong>Author:</strong> {review.author}</p>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews available for this movie.</p>
        )}
      </div>
    );
  };
  
  MovieReviews.propTypes = {
    movieId: PropTypes.string.isRequired, // Updated to string
  };
  
export default MovieReviews
