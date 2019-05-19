import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import AuthService from "../../services/AuthService";
import "./css/style.css";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: "#0cac4d"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: "#0cac4d"
  }
});

class LoginContent extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper} style={{ backgroundColor: "#0cac4d" }}>
          <Typography className="typography" component="h1" variant="h3">
            Plan X
          </Typography>
        </Paper>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Acceder
          </Typography>
          <form className={classes.form} onSubmit={this.handleFormSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Usuario</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="email"
                onChange={this.handleChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                onChange={this.handleChange}
                autoComplete="current-password"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Acceder
            </Button>
          </form>
        </Paper>
      </main>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // Cuándo te logeas.

  handleFormSubmit(e) {
    e.preventDefault();
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.push("/inicio");
      })
      .catch(err => {
        console.log(err);
      });
  }
}

// Escribir los state's [username, password]

LoginContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginContent);
