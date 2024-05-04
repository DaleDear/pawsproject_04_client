/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import "./App.css"; 
import { BrowserRouter as Router } from "react-router-dom";
import { ApplicationViews } from "./components/ApplicationViews";
import { NavBar } from "./components/nav/NavBar";

function App() {
 return (
    <Router>
      <div className="App">
       <NavBar /> 
       <ApplicationViews />
      </div>
    </Router>
  );
}

export default App;