import React from "react";
import AuthService from "../../services/AuthService";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  // Home o perfil del usuari
  render() {
    return (
      <div>
        <h1>Bienvenid@ {this.Auth.getProfile().unique_name}</h1>
      </div>
    );
  }
}

export default Home;
