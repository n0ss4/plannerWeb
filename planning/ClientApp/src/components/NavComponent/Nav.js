import React from "react";
import NavContent from "./NavContent";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  // NavBar
  render() {
    const history = this.props.history;
    return <NavContent history={history} />;
  }
}

export default NavBar;
