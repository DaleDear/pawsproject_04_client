import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Paws and Relax Pet Sitting</h1>
      <p>Where every wiggly wag and perfect purr comes with peace of mind!</p>
      <div className="home-links">
        <span>
          <Link to="/login">Returning Client: Login   </Link>
          {'   |   '}
          <Link to="/register">   New Client: Register</Link>
        </span>
      </div>
    </div>
  );
};