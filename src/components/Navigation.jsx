import {Route, Routes, NavLink} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MovieDetailsPage from '../pages/MovieDetailsPage'
import NotFoundPage from '../pages/NotFoundPage'
import MoviesPage from '../pages/MoviesPage'
import Styles from './Navigation.module.css'
import PropTypes from 'prop-types';


const Navigation = ({trendMovies}) => {
  return (
    <div>
        <nav className={Styles.navBox}>
            <NavLink to='/home' className={Styles.home}>Home</NavLink>
            <NavLink to='/movies' className={Styles.movies}>Movies</NavLink>
        </nav>
        <Routes>
            <Route path='/home' element={<HomePage trendMovies={trendMovies}/>}></Route>
            <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
            <Route path='/movies' element={<MoviesPage trendMovies={trendMovies} />}></Route>
            <Route path='/*'  element={<NotFoundPage/>}></Route>
        </Routes>
    </div>
  )
}

Navigation.propTypes = {
  trendMovies: PropTypes.array.isRequired, // Correct placement of PropTypes.
};

export default Navigation