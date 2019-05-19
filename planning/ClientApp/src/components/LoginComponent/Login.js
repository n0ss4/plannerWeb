import React from "react";
import LoginContent from "./LoginContent";
import AuthService from "../../services/AuthService";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  // NavBar
  render() {
    const history = this.props.history;
    return <LoginContent history={history} />;
  }

  // Cuándo ya estas logeado.

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.push("/inicio");
    }
  }
}

export default Login;
