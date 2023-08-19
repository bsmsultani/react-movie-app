
import './leftnav.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../AppContext';

export default function LeftNav() {

    const [loggedIn, setLoggedIn] = useContext(AppContext);

    const navigate = useNavigate();

    function handleHomeClick() {
        navigate('/');
    }

    function handleMoviesClick() {
        navigate('/movies');
    }

    return (
    <nav class="nav">
        <ul>
            <li><a onClick={handleHomeClick} href="#">Home</a></li>
            <li><a onClick={handleMoviesClick} href="#">Movies</a></li>
            {loggedIn && <li><a href="#">My Watchlist</a></li>}
        </ul>
    </nav>
    );
}