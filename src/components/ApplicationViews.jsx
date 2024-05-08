import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized.jsx";
import { Login } from "./auth/Login.jsx";
import { Register } from "./auth/Register.jsx";
import { Home } from "./Home.jsx";
import { VisitRequestForm } from "./forms/VisitRequestForm.jsx";
import { UserVisits } from "./userManagement/UserVisits.jsx";
//import UpdateVisitTypeForm from "./userVisits/UpdateVisitTypeForm";
//import UpdateVisitFrequencyForm from "./userVisits/UpdateVisitFrequencyForm";
//import UpdatePetTypeForm from "./userVisits/UpdatePetTypeForm";
//import UpdateActionsForm from "./userVisits/UpdateActionsForm";
import { EditVisitDetails } from "./userVisits/EditVisitDetails.jsx";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Authorized />}>
        <Route path="/visit-request" element={<VisitRequestForm />} />
        <Route path="/user-visits" element={<UserVisits />} />
        <Route path="/user-visits/:visitId/edit" element={<EditVisitDetails />} />
        {/* <Route path="/user-visits/:visitId/update-visit-frequency" element={<UpdateVisitFrequencyForm />} />
        <Route path="/user-visits/:visitId/update-pet-type" element={<UpdatePetTypeForm />} />
        <Route path="/user-visits/:visitId/update-actions" element={<UpdateActionsForm />} /> */}
      </Route>
    </Routes>
  );
};