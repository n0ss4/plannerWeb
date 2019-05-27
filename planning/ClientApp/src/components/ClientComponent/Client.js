import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  div: {
    display: "flex",
    position: "relative",
    alignItems: "center"
  },
  marginLeftAuto: {
    marginLeft: "auto"
  }
});

function Client(props) {
  const { classes } = props;

  const [clientes, setClientes] = useState([]);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  // Muy importante este encabezado ya que es el TOKEN que nos dejara recuperar los datos.
  headers["Authorization"] = "Bearer " + localStorage.getItem("id_token");

  function getClientes() {
    fetch("/api/clientes", {
      headers
    })
      .then(response => response.json())
      .then(clientes => setClientes(clientes))
      .catch(err => console.log(err.message));
  }

  // Función para ejecutar los GET's.
  useEffect(() => {
    getClientes();
  }, []);

  return (
    <div>
      <div className={classes.div}>
        <h4>Clientes</h4>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab && classes.marginLeftAuto}
        >
          <AddIcon />
        </Fab>
      </div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Código</TableCell>
              <TableCell align="right">Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map(cliente => (
              <TableRow key={cliente.id}>
                <TableCell component="th" scope="row">
                  {cliente.Id}
                </TableCell>
                <TableCell align="right">{cliente.Nombre}</TableCell>
                <TableCell align="right">{cliente.CodigoPostal}</TableCell>
                <TableCell align="right">
                  <EditIcon />
                </TableCell>
              </TableRow>
            ))}
            {clientes[0] === undefined && (
              <p style={{ padding: "10px", width: "100%" }}>
                No hay información...
              </p>
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

Client.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Client);
