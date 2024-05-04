import { NavLink, useNavigate } from "react-router-dom"
import "./Navbar.css"

export const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("paws_token") !== null;

  const handleLogout = () => {
    localStorage.removeItem("paws_token");
    navigate("/");
  };

  return (
    <nav className="bg-[#372772] py-4 px-6 text-white flex justify-between items-center">
      <ul className="flex space-x-8">
        <li className="navbar__item">
          <NavLink
            className="hover:text-[#A1E8AF] transition-colors duration-300"
            to="/bios"
          >
            Home
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className="hover:text-[#A1E8AF] transition-colors duration-300"
            to="/bios"
          >
            Paws Bio
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className="hover:text-[#A1E8AF] transition-colors duration-300"
            to="/reviews"
          >
            Client Reviews
          </NavLink>
        </li>
        {!isLoggedIn && (
          <>
            <li className="navbar__item">
              <NavLink
                className="hover:text-[#A1E8AF] transition-colors duration-300"
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink
                className="hover:text-[#A1E8AF] transition-colors duration-300"
                to="/register"
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {isLoggedIn && (
        <div>
          <button
            className="hover:text-[#3A2449] transition-colors duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};