import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PeopleIcon from "@material-ui/icons/People";
import BusinessIcon from "@material-ui/icons/BusinessCenter";
import BuildIcon from "@material-ui/icons/Build";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3),
    backgroundColor: "#0cac4d",
    color: "white"
  },
  trabajadores: {},
  icon: {
    fontSize: "2em",
    marginRight: "10px"
  },
  iconContainer: {
    display: "flex",
    alignItems: "center"
  },
  slave: {
    padding: theme.spacing(1, 2),
    marginLeft: "auto"
  }
}));

function Home() {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Paper className={classes.root}>
            <Typography
              variant="h5"
              component="h3"
              className={classes.iconContainer}
            >
              <PeopleIcon className={classes.icon} />
              Usuarios
              <Paper className={classes.slave}>10</Paper>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.root}>
            <Typography
              variant="h5"
              component="h3"
              className={classes.iconContainer}
            >
              <BusinessIcon className={classes.icon} />
              Clientes
              <Paper className={classes.slave}>10</Paper>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={`${classes.root} ${classes.trabajadores}`}>
            <Typography
              variant="h5"
              component="h3"
              className={classes.iconContainer}
            >
              <BuildIcon className={classes.icon} />
              Trabajadores
              <Paper className={classes.slave}>10</Paper>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
