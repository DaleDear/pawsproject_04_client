import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized.jsx";
import { Login } from "./auth/Login.jsx";
// import App from "../App.jsx";
import { Register } from "./auth/Register.jsx";
import { Home } from "./Home.jsx";
import { VisitRequestForm } from "./forms/VisitRequestForm.jsx";
/* import { GameForm } from "./games/GameForm.jsx"
import { GameList } from "./games/GameList.jsx"
import { GameDetails } from "./games/GameDetails.jsx"
import { ReviewForm } from "./reviews/ReviewForm.jsx" */

export const ApplicationViews = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/visit-request" element={<VisitRequestForm />} /> 
          {/* <Route path="/games" element={<GameList />} />
          <Route path="/games/new" element={<GameForm />} />
          <Route path="/games/:id" element={<GameDetails />} />
          <Route path="/games/:id/edit" element={<GameForm />} />
          <Route path="/games/:id/review" element={<ReviewForm />} /> */}
        </Route>
    </Routes>
  )
}