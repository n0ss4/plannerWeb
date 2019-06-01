import * as React from "react";
import { useState, useEffect } from "react";
import {
  WorkWeek,
  Month,
  ScheduleComponent,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  DragAndDrop,
  Resize,
  Day,
  Week,
  Agenda
} from "@syncfusion/ej2-react-schedule";
import { DataManager, WebApiAdaptor, UrlAdaptor } from "@syncfusion/ej2-data";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import AuthService from "../../services/AuthService";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { DateTimePicker } from "@syncfusion/ej2-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

/**
 * Syncfusion EJ2: REACT
 */

export class Plan extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      FechaFinal: new Date(),
      FechaInicial: new Date(),
      Descripcion: "",
      estado: null,
      trabajador: null,
      client: null
    };
    this.fields = { text: "Nombre", value: "Id" };
    this.Auth = new AuthService();
    this.dataClients = new DataManager({
      url: "/api/clientes",
      adaptor: new WebApiAdaptor(),
      headers: [
        { Authorization: "Bearer " + localStorage.getItem("id_token") }
      ],
      crossDomain: true
    });
    this.dataManger = new DataManager({
      url: "/api/incidencias",
      crudUrl: "/api/crud",
      adaptor: new UrlAdaptor(),
      headers: [
        { Authorization: "Bearer " + localStorage.getItem("id_token") }
      ],
      crossDomain: true
    });
    this.resourceData = null;
    if (this.Auth.getProfile().role === "Trabajador") {
      this.resourceData = new DataManager({
        url: "/api/trabajador/" + this.Auth.getProfile().nameid + "",
        adaptor: new WebApiAdaptor(),
        headers: [
          { Authorization: "Bearer " + localStorage.getItem("id_token") }
        ],
        crossDomain: true
      });
    } else {
      this.resourceData = new DataManager({
        url: "/api/trabajadores",
        adaptor: new WebApiAdaptor(),
        headers: [
          { Authorization: "Bearer " + localStorage.getItem("id_token") }
        ],
        crossDomain: true
      });
    }
  }
  getTrabajadorNombre(value) {
    return value.resourceData
      ? value.resourceData[value.resource.textField]
      : value.resourceName;
  }

  resourceHeaderTemplate(props) {
    return (
      <div className="template-wrap">
        <div className="resource-detail">
          <div className="resource-name">{this.getTrabajadorNombre(props)}</div>
        </div>
      </div>
    );
  }

  // Como se van a mostrar los datos en el calendario jugando con EJ2 SYNCFUSIÓN.
  onDataBinding(e) {
    let items = e.result;
    let scheduleData = [];
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        let event = items[i];
        let when = event.FechaInicial;
        let start = event.FechaInicial;
        let end = event.FechaFinal;
        if (!when) {
          when = event.FechaInicial;
          start = event.FechaInicial;
          end = event.FechaFinal;
        }
        scheduleData.push({
          Id: event.Id,
          Subject: event.Descripcion,
          StartTime: new Date(start),
          EndTime: new Date(end),
          FechaInicial: new Date(start),
          FechaFinal: new Date(end),
          Description: event.Descripcion,
          Location: "Barcelona",
          Estado: event.Estado,
          IdTrabajador: event.IdTrabajador,
          IdCliente: event.IdCliente,
          IsAllDay: !event.FechaInicial
        });
      }
    }
    e.result = scheduleData;
  }

  onPopupOpen(args) {
    if (args.target && args.target.classList.contains("e-work-cells")) {
      args.cancel = !args.target.classList.contains("e-work-hours");
    }
    if (args.type === "Editor") {
      args.data.FechaInicial = args.data.StartTime;
      args.data.Descripcion = args.data.Subject;
      args.data.FechaFinal = args.data.EndTime;

      let estado = args.element.querySelector("#estado");
      let dropDownListEstado = new DropDownList({
        dataSource: [
          {
            text: "Abierta",
            value: false
          },
          { text: "Cerrada", value: true }
        ],
        fields: { text: "text", value: "value" },
        value: args.data.Estado,
        floatLabelType: "Always",
        placeholder: "Estado"
      });
      dropDownListEstado.appendTo(estado);

      let trabajador = args.element.querySelector("#IdTrabajador");
      let dropDownListTrabajador = new DropDownList({
        dataSource: this.resourceData,
        fields: { text: "Nombre", value: "Id" },
        value: args.data.IdTrabajador,
        floatLabelType: "Always",
        placeholder: "Trabajador"
      });
      dropDownListTrabajador.appendTo(trabajador);

      let clientes = args.element.querySelector("#IdCliente");
      let dropDownListCliente = new DropDownList({
        dataSource: this.dataClients,
        fields: { text: "Nombre", value: "Id" },
        value: args.data.IdCliente,
        floatLabelType: "Always",
        placeholder: "Cliente"
      });
      dropDownListCliente.appendTo(clientes);

      let fechaInicial = args.element.querySelector("#FechaInicial");
      let dateTimePickerInicial = new DateTimePicker({
        value: args.data.FechaInicial,
        floatLabelType: "Always",
        placeholder: "De",
        value:
          args.data.FechaInicial.toLocaleDateString("en-US") +
          " " +
          args.data.FechaInicial.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
          })
      });
      dateTimePickerInicial.appendTo(fechaInicial);

      let fechaFinal = args.element.querySelector("#FechaFinal");
      let dateTimePickerFinal = new DateTimePicker({
        value: args.data.FechaFinal,
        floatLabelType: "Always",
        placeholder: "Hasta",
        value:
          args.data.FechaFinal.toLocaleDateString("en-US") +
          " " +
          args.data.FechaFinal.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
          })
      });
      dateTimePickerFinal.appendTo(fechaFinal);

      let descripcion = args.element.querySelector("#Descripcion");
      if (args.data.Descripcion !== undefined) {
        descripcion.value = args.data.Descripcion;
      }
    }
  }

  editorTemplate(props) {
    return (
      <table
        className="custom-event-editor"
        style={{ width: "100%", cellpadding: "5" }}
      >
        <tbody>
          <tr>
            <td>
              <input
                id="FechaInicial"
                className="e-field e-input"
                name="FechaInicial"
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                id="FechaFinal"
                className="e-field e-input"
                name="FechaFinal"
              />
            </td>
          </tr>
          <tr>
            <td>
              <textarea
                id="Descripcion"
                className="e-field e-input"
                name="Descripcion"
                rows={3}
                cols={50}
                style={{
                  width: "100%",
                  height: "60px !important",
                  resize: "vertical"
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                id="IdTrabajador"
                className="e-field e-input"
                name="IdTrabajador"
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                id="IdCliente"
                className="e-field e-input"
                name="IdCliente"
              />
            </td>
          </tr>
          <tr>
            <input id="estado" className="e-field e-input" name="estado" />
          </tr>
        </tbody>
      </table>
    );
  }

  onActionBegin(args) {
    if (args.requestType === "eventChange") {
      if (args.data.EndTimezone === undefined) {
        args.data.Descripcion = args.data.Subject;
        args.data.FechaInicial = args.data.StartTime;
        args.data.FechaFinal = args.data.EndTime;
      }
    }
  }

  onDragStart(args) {
    args.navigation.enable = true;
  }

  change(args) {
    this.scheduleObj.selectedDate = args.value;
    this.scheduleObj.dataBind();
  }

  heightAuto() {
    var height = window.innerHeight - 120;
    return height;
  }

  onEventRendered(args) {
    if (args.data.Estado) {
      args.element.style.backgroundColor = "#026329";
    } else {
      args.element.style.backgroundColor = "#0cac4d";
    }
  }

  render() {
    var variable = false;
    if (this.Auth.getProfile().role === "Trabajador") {
      variable = true;
    }
    return (
      <div className="schedule-control-section">
        <div className="control-section">
          <div className="control-wrapper">
            <ScheduleComponent
              ref={schedule => (this.scheduleObj = schedule)}
              cssClass="custom-work-days"
              currentView="Day"
              width="100%"
              height={this.heightAuto() + "px"}
              selectedDate={new Date()}
              eventSettings={{
                dataSource: this.dataManger
              }}
              dataBinding={this.onDataBinding.bind(this)}
              popupOpen={this.onPopupOpen.bind(this)}
              readonly={false}
              editorTemplate={this.editorTemplate.bind(this)}
              showQuickInfo={false}
              dragStart={this.onDragStart.bind(this)}
              actionBegin={this.onActionBegin.bind(this)}
              change={this.change.bind(this)}
              eventRendered={this.onEventRendered.bind(this)}
              resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
              group={{ resources: ["Trabajadores"] }}
              readonly={variable}
            >
              <ResourcesDirective>
                <ResourceDirective
                  field="IdTrabajador"
                  title="Nombre del trabajador"
                  name="Trabajadores"
                  dataSource={this.resourceData}
                  textField="Nombre"
                  idField="Id"
                  groupIDField="groupId"
                  colorField="color"
                  workDaysField="workDays"
                  startHourField="startHour"
                  endHourField="endHour"
                />
              </ResourcesDirective>
              <Inject
                services={[
                  Day,
                  Week,
                  WorkWeek,
                  Month,
                  Agenda,
                  Resize,
                  DragAndDrop
                ]}
              />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default Plan;
