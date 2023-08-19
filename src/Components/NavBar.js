import './navbar.css';
import { useContext, useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";


const NavBar = () => {

  const [loggedIn, setLoggedIn] = useContext(AppContext);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);




  const handleLogoClick = () => {
    navigate(`/`);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/movie/${suggestion.id}`);
    setSuggestions([]);
  };

  const handleLogoutClick = () => {

    const data = {
      'refreshToken': localStorage.getItem('refreshToken'),
    };


    // send a request to the server to invalidate the refresh token
    fetch('http://sefdb02.qut.edu.au:3000/user/logout', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.message);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
        console.error(error);
      });

    setLoggedIn(false);
    // remove tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpiration');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshTokenExpiration');

  };




  const getSearchSuggestions = async (searchValue) => {
    const response = await fetch(
      'http://sefdb02.qut.edu.au:3000/movies/search?title=' + searchValue
    );
    const data = await response.json();

    /* data is an object with a key called "data" that contains an array of objects */

    return data;
  };

  
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  
    if (value) {
      getSearchSuggestions(value).then((data) => {
        const suggestions = data.data.map((item) => ({ id: item.imdbID, title: item.title }));
        setSuggestions(suggestions.slice(0, 10));
      });
    } else {
      setSuggestions([]);
    }
  };

  const navigate = useNavigate();
  

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchValue) {
      navigate(`/search?title=${searchValue}`);
    }
    setSearchValue("");
    setSuggestions([]);
  };

  return (
    <div className="NavBar">
      <h1 id='logo-text' onClick={handleLogoClick}>CINEMAX SEARCH</h1>
      <div className="dropdown-lang">
        <button className="lang cinematic-button">Language</button>
      </div>

      {/* searh bar */}
      <div className="search-bar">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search for a movie, tv show, person..."
        />

        <button className="search-btn" onClick={handleSearchSubmit}>
          Search
        </button>


        {suggestions.length > 0 && (
          <ul className="suggestions-list">
          {suggestions.map((item) => (
          <li key={item.id} onClick={() => handleSuggestionClick(item)}>{item.title}</li>
          ))}
          </ul>
        )}

      </div>
      {/* end of search bar */}

      {loggedIn ? (
        <div className="dropdown">

            <button className='account-btn cinematic-button' onClick={() => navigate('/account')}>Account</button>
            <button className='logout-btn cinematic-button' onClick={handleLogoutClick}>Logout</button>
        </div>
      ) : (
        <div className="login-and-signup">
          <button className="login cinematic-button" onClick={handleLoginClick}>
            Login
          </button>
          <button className="sign-up cinematic-button" onClick={handleSignupClick}>
            Sign Up
          </button>
        </div>
      )}

      {showLoginModal && <LoginModal onClose={handleCloseModal}  />}
      {showSignupModal && <SignupModal onClose={handleCloseModal} />}
    </div>
  );
};

export default NavBar;
