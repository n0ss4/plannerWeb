import React from "react";
import NavContent from "./NavContent";

class NavBar extends React.Component {
  // Componente padre del NavBar.
  render() {
    const history = this.props.history;
    return <NavContent history={history} />;
  }
}

export default NavBar;
