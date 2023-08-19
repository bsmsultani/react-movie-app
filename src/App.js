import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Components/Home';
import Movies from './Components/Movies';
import SearchResults from './Components/SearchResults';
import Movie from './Components/Movie';
import Person from './Components/Person';
import { AppContext } from './AppContext';

function App() {
  const [loggedIn, setLoggedIn] = useContext(AppContext);

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem('accessToken');
      const expiration = localStorage.getItem('accessTokenExpiration');
      const currentTime = Math.floor(Date.now() / 1000);

      if (token && expiration && currentTime < expiration) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };

    checkTokenValidity();

    const tokenCheckInterval = setInterval(checkTokenValidity, 1000); // Check token validity every second

    return () => {
      clearInterval(tokenCheckInterval); // Clean up the interval on component unmount
    };
  }, [setLoggedIn]);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await fetch('http://sefdb02.qut.edu.au:3000/user/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken,
          }),
        });
        const data = await response.json();

        if (data.error) {
          alert(data.message);
        } else {
          const accessTokenExpiration = Math.floor(Date.now() / 1000) + data.bearerToken.expires_in;
          const accessToken = data.bearerToken.token;
          const refreshTokenExpiration = Math.floor(Date.now() / 1000) + data.refreshToken.expires_in;

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('accessTokenExpiration', accessTokenExpiration.toString());
          localStorage.setItem('refreshToken', data.refreshToken.token);
          localStorage.setItem('refreshTokenExpiration', refreshTokenExpiration.toString());
          setLoggedIn(true);
          console.log('Refreshed token');
        }
      } catch (error) {
        console.error(error);
        setLoggedIn(false);
      }
    };

    console.log('Checking token');

    const token = localStorage.getItem('accessToken');
    const expiration = localStorage.getItem('accessTokenExpiration');
    const currentTime = Math.floor(Date.now() / 1000);

    if (token && expiration && currentTime >= expiration) {
      refreshAccessToken();
    }
  }, [loggedIn, setLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movie/:imdbID" element={<Movie />} />
        <Route path="/person/:userId" element={<Person />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
