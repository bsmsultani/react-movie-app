import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import NavBar from "./NavBar";
import LeftNav from "./LeftNav";
import "./person.css";
import { AppContext } from "../AppContext";
import BarChart from "./RatingBarGraph";
import Card from "./Card";

const Person = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [personData, setPersonData] = useState(null);
  const [loggedIn, setLoggedIn] = useContext(AppContext);
  

  /* get token from local storage */
  const token = localStorage.getItem("accessToken");

  const getUser = async (userId) => {
    const response = await fetch(`http://sefdb02.qut.edu.au:3000/people/${userId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      alert(`Error: ${response.status} ${response.message}`);
    }
    
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const person = await getUser(userId);
        setPersonData(person);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, [userId]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };


  return (
    <div className="page">
      <NavBar />
      <LeftNav />


      <div className="person-content">
        {personData && loggedIn && (
          <div>
            <h1>{personData.name}</h1>
            <p>Birth Year: {personData.birthYear}</p>
            {personData.deathYear && <p>Death Year: {personData.deathYear}</p>}
            {personData.roles && (
              <div>
                <h3>Roles</h3>
                <div className="roles">
                {personData.roles.map((role) => (
                  <Card
                    id={role.movieId}
                    title={role.movieName}
                    info={role.category}
                    footer={role.characters}
                    onClick={handleMovieClick}
                  />
                ))}
                </div>

                {personData.roles && personData.roles.length > 4 && (
                  <div>
                    <h2 style={{ textAlign: 'center' }}>Movies Rating Distribution</h2>
                    <BarChart data={personData} />
                  </div>
                )}                
              </div>
            )}
          </div>
        )}
        {!loggedIn && (
          <div>
            <h1> Login to see information about the person </h1>
          </div>)}
      </div>
    </div>
  );
};

export default Person;
