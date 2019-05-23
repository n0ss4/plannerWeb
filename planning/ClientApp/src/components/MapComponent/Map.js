import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Map(props) {
  const TOKEN =
    "pk.eyJ1Ijoibm9zc2EiLCJhIjoiY2p2dHI2NDdoM2RqMDQ4cGI5OWV3bTJndiJ9.dmRBwZAkQeF3x5ZyPp1bwg";
  const [fecha, setFecha] = useState(new Date());
  function fechaChange(e) {
    setFecha(e);
  }

  const [trabajador, setTrabajador] = useState(0);
  function trabajadorChange(e) {
    setTrabajador(e.target.value);
  }

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "60vh",
    latitude: 41.9735221,
    longitude: 2.1278038,
    zoom: 7
  });

  function viewportChange(e) {
    setViewport(e);
  }

  const [dataTrabajador, setDataTrabajador] = useState({ trabajadores: [] });

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

  const [postal, setPostal] = useState("");

  const [dataLocation, setDataLocation] = useState(new Array());

  function getLocation(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      fetch(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          data[i].codigo +
          ".json" +
          "?access_token=pk.eyJ1Ijoibm9zc2EiLCJhIjoiY2p2dHI2NDdoM2RqMDQ4cGI5OWV3bTJndiJ9.dmRBwZAkQeF3x5ZyPp1bwg" +
          "&country=es"
      )
        .then(response => response.json())
        .then(localizaciones => {
          dataLocation.push({
            id: i,
            longitud: localizaciones.features[0].center[0],
            latitud: localizaciones.features[0].center[1],
            nombre: data[i].nombre,
            descripcion: data[i].descripcion
          });
        })
        .catch(err => console.log(err.message));
    }
  }

  const [trabajadorLocalizacion, setTrabajadorLocalizacion] = useState([]);

  function getTrabajadorLocalizacion(e) {
    e.preventDefault();
    fetch(
      "/api/trabajador/localizacion?Id=" +
        trabajador +
        "&fecha=" +
        fecha.toDateString() +
        "",
      {
        headers
      }
    )
      .then(response => response.json())
      .then(data => getLocation(data))
      .catch(err => console.log(err.message));
  }

  useEffect(() => {
    getTrabajadores();
  }, []);

  return (
    <div>
      <form
        style={{ width: "100%", paddingBottom: "4vh", paddingTop: "4vh" }}
        onSubmit={getTrabajadorLocalizacion}
      >
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item md={4} xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                label="Fecha"
                value={fecha}
                onChange={fechaChange}
                format="yyyy-MM-dd"
                required
                margin="normal"
                style={{ margin: "0", width: "80%" }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl
              margin="normal"
              required
              style={{ margin: "0", width: "80%" }}
            >
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
          </Grid>
          <Grid item md={4} xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Buscar
            </Button>
          </Grid>
        </Grid>
      </form>
      <ReactMapGL
        mapboxApiAccessToken={TOKEN}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewportChange}
      >
        {dataLocation.length > 0 &&
          dataLocation.map(l => (
            <Popup
              key={l.id}
              latitude={l.latitud}
              longitude={l.longitud}
              closeButton={false}
              anchor="top"
            >
              <div>
                <p style={{ fontWeight: "bold" }}>{l.nombre}</p>
                {l.descripcion}
              </div>
            </Popup>
          ))}
      </ReactMapGL>
    </div>
  );
}

export default Map;
