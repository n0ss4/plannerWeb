import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GroupIcon from "@material-ui/icons/Group";
import BusinessIcon from "@material-ui/icons/BusinessCenter";
import LocationIcon from "@material-ui/icons/LocationOn";
import WarningIcon from "@material-ui/icons/Warning";
import ViewListIcon from "@material-ui/icons/ViewList";
import HomeIcon from "@material-ui/icons/Home";
import ExitIcon from "@material-ui/icons/ExitToApp";
import classNames from "classnames";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AuthService from "../../services/AuthService";
import "./css/nav.css";
import Chip from "@material-ui/core/Chip";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../HomeComponent/Home";
import Mapa from "../MapComponent/Map";
import Clientes from "../ClientComponent/Client";
import Planificador from "../PlanComponent/Plan";
import Usuarios from "../UserComponent/User";
import Incidencias from "../WarningComponent/Warning";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#0cac4d",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  chip: {
    margin: theme.spacing.unit,
    marginLeft: "auto",
    marginRight: "15px",
    borderColor: "white",
    color: "white",
    fontSize: "15px"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  salir: {
    marginTop: "auto"
  }
});

class NavContent extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.restricciones = this.restricciones.bind(this);
    this.Auth = new AuthService();
  }

  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  restricciones() {
    const isLoggedIn = this.props.isLoggedIn;
    if (isLoggedIn) {
    }
  }

  // Salir
  logout() {
    this.Auth.logout();
    this.props.history.push("/");
  }

  // NavBar
  render() {
    const { classes, theme } = this.props;
    const role = this.Auth.getProfile().role;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <MenuIcon />
            </IconButton>
            <h1 className="typography">Plan X</h1>
            <Chip
              label={role}
              className={classes.chip}
              justify="flex-end"
              variant="outlined"
            />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component="a" href="/inicio/" key={"Inicio"}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Inicio"} />
            </ListItem>
            {(role === "Administrador" ||
              role === "Responsable" ||
              role === "Trabajador") && (
              <ListItem
                button
                component="a"
                href="/planificador/"
                key={"Planificador"}
              >
                <ListItemIcon>
                  <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary={"Planificador"} />
              </ListItem>
            )}
            {(role === "Cliente" || role === "Administrador") && (
              <ListItem
                button
                component="a"
                href="/incidencias/"
                key={"Incidencias"}
              >
                <ListItemIcon>
                  <WarningIcon />
                </ListItemIcon>
                <ListItemText primary={"Incidencias"} />
              </ListItem>
            )}
            {(role === "Trabajador" ||
              role === "Administrador" ||
              role === "Responsable") && (
              <ListItem
                button
                component="a"
                href="/geolocalizador/"
                key={"Geolocalizador"}
              >
                <ListItemIcon>
                  <LocationIcon />
                </ListItemIcon>
                <ListItemText primary={"Geolocalizador"} />
              </ListItem>
            )}
          </List>
          {role === "Administrador" && <Divider />}
          {role === "Administrador" && (
            <List>
              <ListItem button component="a" href="/usuarios/" key={"Usuarios"}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary={"Usuarios"} />
              </ListItem>
              <ListItem button component="a" href="/clientes/" key={"Clientes"}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary={"Clientes"} />
              </ListItem>
            </List>
          )}
          <List className={classes.salir}>
            <ListItem button key={"Salir"} onClick={this.logout}>
              <ListItemIcon>
                <ExitIcon />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Router>
            <Route path="/inicio/" exact component={Home} />
            <Route path="/planificador/" component={Planificador} />
            <Route path="/incidencias/" component={Incidencias} />
            <Route path="/geolocalizador/" component={Mapa} />
            <Route path="/usuarios/" component={Usuarios} />
            <Route path="/clientes/" component={Clientes} />
          </Router>
        </main>
      </div>
    );
  }
}

NavContent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(NavContent);
