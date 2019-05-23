import React from "react";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.User = new UserService();
    this.state = {
      usuarios: [],
      isLoaded: false,
      error: null
    };
  }

  componentDidMount() {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    headers["Authorization"] = "Bearer " + this.Auth.getToken();

    fetch("/api/usuarios", { headers })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            usuarios: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  // Home o perfil del usuari
  render() {
    const { error, isLoaded, usuarios } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {usuarios.map(item => (
            <li key={item.Usuario}>
              {item.Usuario} {item.Rango}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default Home;
