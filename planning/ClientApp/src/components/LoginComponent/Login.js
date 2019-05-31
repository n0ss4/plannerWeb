import React from "react";
import LoginContent from "./LoginContent";
import AuthService from "../../services/AuthService";

// Componente LOGIN dónde introducimos el usuario y contraseña para acceder.

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  // NavBar
  render() {
    const history = this.props.history;
    return <LoginContent history={history} />; // <-- Llamando a componente hijo pasando un atributo.
  }

  // Si ya estas logeado, dependiendo del rango que tienes iras a un sitio o otro.
  componentWillMount() {
    if (this.Auth.loggedIn()) {
      if (
        this.Auth.getProfile().role === "Trabajador" ||
        this.Auth.getProfile().role === "Responsable"
      ) {
        this.props.history.push("/planificador");
      } else {
        this.props.history.push("/inicio");
      }
    }
  }
}

export default Login;
