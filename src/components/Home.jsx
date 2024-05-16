import { Link } from "react-router-dom";

export const Home = () => {
  return (
  <div className="home">
    <h1>Welcome to Paws and Relax Pet Sitting</h1>
    <p>Where every wiggly wag and perfect purr comes with peace of mind!</p>
    <br />
    <br />
    <br />
    <div className="home-links">
      <span>
        <Link to="/login">Returning Client: Login</Link>
        {' | '}
        <Link to="/register">New Client: Register</Link>
      </span>
    </div>
    <div className="flex justify-center mt-8">
      <img src="/images/PawsLogo-image.jpg" alt="Paws and Relax Logo" className="w-40 h-auto" />
    </div>
  </div>
);
};