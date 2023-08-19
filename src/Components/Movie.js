import './movie.css';
import NavBar from './NavBar';
import LeftNav from './LeftNav';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

const Movie = () => {

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(AppContext);
  const { imdbID } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);

  const getMovie = async (imdbID) => {
    const response = await fetch(`http://sefdb02.qut.edu.au:3000/movies/data/${imdbID}`);
    if (!response.ok) {
      alert(`Error: ${response.message}`);
    }
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movie = await getMovie(imdbID);
        setMovieData(movie);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [imdbID]);

  
  const formatDollars = (number) => {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };
  

  const handleCardClick = (castId) => {
    navigate(`/person/${castId}`);
  };

  return (
    <div className='movie'>
      <NavBar />
      <LeftNav />

      <div class="movie-content">
        {error && <p>{error}</p>}
        {movieData && (
        <div>
          <h1 className="movie-info">{movieData.title}</h1>
          <p className="movie-info">Duration: {movieData.runtime} minutes</p>
          <p className="movie-info">Year Released: {movieData.year}</p>
          <p className="movie-info">IMDB Rating: {movieData.ratings[0].value}</p>
          <p className="movie-info">Genres: {movieData.genres.join(', ')}</p>
          <p className="movie-info">boxoffice: {formatDollars(movieData.boxoffice)}</p>
          <p className="movie-info">Plot: {movieData.plot}</p>
          <img className="movie-poster" src={movieData.poster} alt={movieData.title} />
        </div>
        )}

        {loggedIn && movieData && (

          <div>
            <button class="add-to-watchlist-btn cinematic-button">Add to Watchlist</button>
            <h2>Movie Crew</h2>
            <div className='cast-cards-container'>
              {movieData.principals.map((principal) => (
              <Card key={principal.id} title={principal.name} info={principal.category} footer={principal.characters} id={principal.id} onClick={handleCardClick}/>
            ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Movie;
