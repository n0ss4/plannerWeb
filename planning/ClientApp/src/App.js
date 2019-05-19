import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/NavComponent/Nav";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/LoginComponent/Login";
import Mapa from "./components/MapComponent/Map";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/inicio/" component={Nav} />
      <PrivateRoute path="/geolocalizador/" component={Nav} />
      <PrivateRoute path="/clientes/" component={Nav} />
      <PrivateRoute path="/usuarios/" component={Nav} />
      <PrivateRoute path="/incidencias/" component={Nav} />
      <PrivateRoute path="/planificador/" component={Nav} />
    </Router>
  );
}

export default App;
