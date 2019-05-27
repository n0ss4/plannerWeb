import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import WarningIcon from "@material-ui/icons/Warning";
import es from "date-fns/locale/es";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    maxHeight: "80vh",
    overflowY: "auto"
  },
  listItem: {
    border: "1px solid #0cac4d",
    borderRadius: "28px",
    marginTop: "10px"
  },
  button: {
    backgroundColor: "#0cac4d"
  }
}));

function Warning(props) {
  const classes = useStyles();

  // Función y variables para la descripción.
  const [descripcion, setDescripcion] = useState("");
  function descripcionChange(e) {
    setDescripcion(e.target.value);
  }

  // Función y variables para la fecha inicial.
  const [fechaInicial, setfechaInicial] = useState(new Date());
  function fechaInicialChange(e) {
    setfechaInicial(e);
  }

  // Función y variables para la fecha final.
  const [fechaFinal, setfechaFinal] = useState(new Date());
  function fechaFinalChange(e) {
    setfechaFinal(e);
  }

  // Función y variables para el cliente.
  const [cliente, setCliente] = useState(0);
  function clienteChange(e) {
    setCliente(e.target.value);
  }

  // Variables que usaré para recoger las variables al hacer peticiones a la API.
  const [dataCliente, setDataCliente] = useState({ clientes: [] });

  // Función y variables para el trabajador.
  const [trabajador, setTrabajador] = useState(0);
  function trabajadorChange(e) {
    setTrabajador(e.target.value);
  }

  // Variables que usaré para recoger las variables al hacer peticiones a la API.
  const [dataTrabajador, setDataTrabajador] = useState({ trabajadores: [] });

  // Función y variables para el Estado.
  const [estado, setEstado] = useState(1);
  function estadoChange(e) {
    setEstado(e.target.value);
  }

  // Los diferentes encabezados para poder recuperar los datos.
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  // Muy importante este encabezado ya que es el TOKEN que nos dejara recuperar los datos.
  headers["Authorization"] = "Bearer " + localStorage.getItem("id_token");

  // GET: Recoger los trabajadores.
  function getTrabajadores() {
    fetch("/api/trabajadores", { headers })
      .then(response => response.json())
      .then(trabajadores => setDataTrabajador(trabajadores))
      .catch(err => console.log(err.message));
  }

  // GET: Recoger los clientes.
  function getClientes() {
    fetch("/api/clientes", { headers })
      .then(response => response.json())
      .then(clientes => setDataCliente(clientes))
      .catch(err => console.log(err.message));
  }

  // POST: Añadir una nueva incidencia.
  function postIncidencia(e) {
    e.preventDefault();
    fetch("/api/incidencia", {
      method: "POST",
      body: JSON.stringify({
        descripcion: descripcion,
        inicial: fechaInicial,
        final: fechaFinal,
        trabajador: trabajador,
        cliente: cliente
      }),
      headers
    })
      .then(res => console.log(res))
      .catch(error => console.error("Error: ", error))
      .then(getIncidencias());
  }

  const [incidencias, setIncidencias] = useState([]);

  function getIncidencias() {
    fetch("/api/trabajadores/localizaciones", { headers })
      .then(response => response.json())
      .then(incidencia => {
        if (
          incidencia !== null &&
          incidencia !== undefined &&
          incidencia.length !== null &&
          incidencia.length > 0
        ) {
          setIncidencias([incidencia]);
        }
      })
      .catch(err => console.log(err.message));
  }

  // Función para ejecutar los GET's.
  useEffect(() => {
    getTrabajadores();
    getClientes();
    getIncidencias();
  }, []);

  // TODO el contenido de la WEB.
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6}>
          <form onSubmit={postIncidencia}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="cliente">Cliente</InputLabel>
              <Select value={cliente} onChange={clienteChange}>
                <MenuItem value="0">Selecciona un cliente...</MenuItem>
                {dataCliente.length > 0 &&
                  dataCliente.map(cliente => (
                    <MenuItem key={cliente.Id} value={cliente.Id}>
                      {cliente.Nombre}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="trabajador">Trabajador</InputLabel>
              <Select value={trabajador} onChange={trabajadorChange}>
                <MenuItem value="0">Selecciona un trabajador...</MenuItem>
                {dataTrabajador.length > 0 &&
                  dataTrabajador.map(trabajador => (
                    <MenuItem key={trabajador.Id} value={trabajador.Id}>
                      {trabajador.Nombre + " " + trabajador.Apellidos}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
              <DateTimePicker
                label="Fecha Inicial"
                value={fechaInicial}
                onChange={fechaInicialChange}
                format="yyyy-MM-dd HH:mm"
                required
                margin="normal"
                fullWidth
              />
              <DateTimePicker
                label="Fecha Final"
                value={fechaFinal}
                onChange={fechaFinalChange}
                format="yyyy-MM-dd HH:mm"
                required
                margin="normal"
                fullWidth
              />
            </MuiPickersUtilsProvider>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="descripcion">Descripción</InputLabel>
              <Input
                id="descripcion"
                value={descripcion}
                onChange={descripcionChange}
                multiline={true}
                rows={2}
                rowsMax={4}
                autoFocus
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="estado">Estado</InputLabel>
              <Select value={estado} onChange={estadoChange}>
                <MenuItem value={0}>Cerrada</MenuItem>
                <MenuItem value={1}>Abierta</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              className={classes.button}
              fullWidth
              variant="contained"
              color="primary"
            >
              Enviar
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} md={1} />
        <Grid item xs={12} md={4}>
          <List className={classes.root}>
            {incidencias !== undefined &&
              incidencias.map(incidencia =>
                incidencia.map(x => (
                  <ListItem key={x.id} className={classes.listItem}>
                    <Grid>
                      <ListItemText primary={x.id + " - " + x.nombre} />
                      <ListItemText secondary={x.descripcion} />
                      <ListItemText secondary={x.trabajador} />
                    </Grid>
                  </ListItem>
                ))
              )}
            {incidencias[0] === undefined && (
              <ListItem>
                <Grid>
                  <ListItemAvatar>
                    <Avatar>
                      <WarningIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="No hay incidencias..."
                    secondary="¿A que esperas a crear tu primera incidencia?"
                  />
                </Grid>
              </ListItem>
            )}
          </List>
        </Grid>
        <Grid item xs={12} md={1} />
      </Grid>
    </div>
  );
}

export default Warning;
