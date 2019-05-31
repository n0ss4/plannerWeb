import React from "react";
import NavContent from "./NavContent";

/**
 * Layout del Proyecto
 */

class NavBar extends React.Component {
  // Componente padre del NavBar.
  render() {
    const history = this.props.history;
    return <NavContent history={history} />; // <-- Componente Hijo
  }
}

export default NavBar;
