import PropTypes from 'prop-types';
import Styles from './HomePage.module.css';
//import MovieDetailsPage from './MovieDetailsPage';
import { Link } from 'react-router-dom';
const HomePage = ({trendMovies}) => {



  return (
    <div>
      <p className={Styles.trendHeader}>Trending today</p>
      <ul className={Styles.listOfFilms}>
        {trendMovies.map((trendFilm, index) => (
          <li className={Styles.trendFilmItem} key={index}>
             <Link to={`/movie/${trendFilm.id}`} className={Styles.linkFilm}>{trendFilm.title} </Link>
             {/*<MovieDetailsPage  trendFilm={trendFilm}></MovieDetailsPage>*/}
          </li>
        ))}
      </ul>
    </div>
  )
}
HomePage.propTypes = {
  trendMovies: PropTypes.array.isRequired, // Correct placement of PropTypes.
};
export default HomePage