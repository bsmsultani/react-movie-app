import React from 'react';

import './home.css';
import NavBar from './NavBar';
import LeftNav from './LeftNav';

function HomePage() {
  return (

    <div className='HomePage'>
      <NavBar />
      <LeftNav />

      <div className='home-header'>
      <section
        className="home-section"
      >
        <div className="home-content">
          <h1>Welcome to our Movie Search Platform!</h1>
          <p>
            Are you tired of scrolling through endless pages of movies on multiple streaming platforms? Look no further,
            because we have the solution for you! Our platform offers a one-stop-shop for all your movie search needs.
          </p>
        </div>
      </section>

      <section
        className="home-section"
        
      >
        <div className="home-content">
          <p>
            Our extensive movie database includes the latest releases, all-time classics, and hidden gems that you won't
            find anywhere else. With our user-friendly interface, you can easily search and filter movies by genre,
            rating, year, and more.
          </p>
        </div>
      </section>

      <section
        className="home-section"
        
      >
        <div className="home-content">
          <p>
            But what really sets us apart is our personalized recommendation system. Based on your viewing history and
            preferences, we suggest movies that we think you'll love. Say goodbye to wasting time on movies that aren't
            your cup of tea!
          </p>
        </div>
      </section>

      <section
        className="home-section"
        
      >
        <div className="home-content">
          <p>
            Our platform also offers convenient links to stream or rent movies directly from popular providers like
            Netflix, Amazon Prime Video, and Hulu. Plus, we keep you updated with the latest news and reviews in the
            movie industry.
          </p>
        </div>
      </section>

      <section
        className="home-section"
        
      >
        <div className="home-content">
          <p>
            So, why waste your time searching for movies when you can find them all in one place? Join our community
            today and elevate your movie-watching experience!
          </p>
        </div>
      </section>

      </div>


    </div>

  );
}

export default HomePage;
