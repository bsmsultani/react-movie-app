import React, { useState, useContext, useEffect } from 'react';
import Modal from './Modal';
import './loginmodal.css';
import { AppContext } from '../AppContext';


const LoginModal = ({ onClose, onSubmit }) => {
  const [loggedIn, setLoggedIn] = useContext(AppContext); 

  const setTokens = (expiration, accessToken, refreshToken, refreshTokenExpiration) => { 
    localStorage.setItem('accessToken', accessToken); 
    localStorage.setItem('accessTokenExpiration', expiration);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('refreshTokenExpiration', refreshTokenExpiration);
  };


  const handleSubmit = (target) => {
    const formData = {
      email: target.email.value,
      password: target.password.value,
      longExpiry: target.longExpiry.checked,
    };

    fetch('http://sefdb02.qut.edu.au:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.message);
          
        } else {
          const expiration = new Date().getTime() / 1000 + data.bearerToken.expires_in;
          const accessToken = data.bearerToken.token;
          const refreshToken = data.refreshToken.token;
          const refreshTokenExpiration = new Date().getTime() / 1000 + data.refreshToken.expires_in;
          setTokens(expiration, accessToken, refreshToken, refreshTokenExpiration);
          setLoggedIn(true);
          onClose();
        }
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
        console.error(error);
      });
  };

  return (
    <Modal title="Login" onClose={onClose} onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" placeholder="Enter your email" />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="Enter your password" />
      <div className="checkbox-container">
        <input
          type="checkbox"
          id="longExpiry"
          name="longExpiry"
          value="true"
          className="checkbox-input"
        />
        <label htmlFor="longExpiry" className="checkbox-label">
          Remember me
        </label>
      </div>
    </Modal>
  );
};

export default LoginModal;
