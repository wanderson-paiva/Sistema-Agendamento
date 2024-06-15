import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Paciente } from "../pages/Pacientes";
import { Medico } from "../pages/Medico";
import { Home } from "../pages/Home";
import { PrivateRoute } from "./privateRoutes";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/paciente" element={<Paciente />} />
        <Route path="/medico" element={<Medico />} />

        <Route path="/home" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};