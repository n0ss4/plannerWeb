import { render } from "react-dom";
import * as React from "react";
import {
  WorkWeek,
  Month,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  DragAndDrop,
  Resize,
  Day,
  Week,
  Agenda,
  RecurrenceEditorComponent
} from "@syncfusion/ej2-react-schedule";
import { addClass } from "@syncfusion/ej2-base";
import { extend } from "@syncfusion/ej2-base";
import { Ajax, L10n, loadCldr } from "@syncfusion/ej2-base";
import * as dataSource from "./datasource.json";
import * as numberingSystems from "cldr-data/supplemental/numberingSystems.json";
import * as gregorian from "cldr-data/main/es/ca-gregorian.json";
import * as numbers from "cldr-data/main/es/numbers.json";
import * as timeZoneNames from "cldr-data/main/es/timeZoneNames.json";
import { DataManager, WebApiAdaptor, UrlAdaptor } from "@syncfusion/ej2-data";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);
/**
 * schedule resources group-custom-work-days sample
 */

export class Plan extends React.Component {
  constructor() {
    super(...arguments);
    this.data = extend([], dataSource.doctorData, null, true);
    this.state = {
      FechaFinal: new Date(),
      FechaInicial: new Date(),
      Descripcion: ""
    };
    this.dataManger = new DataManager({
      url: "/api/incidencias",
      crudUrl: "/api/crud",
      adaptor: new UrlAdaptor(),
      headers: [
        { Authorization: "Bearer " + localStorage.getItem("id_token") }
      ],
      crossDomain: true
    });
    this.resourceData = new DataManager({
      url: "/api/trabajadores",
      adaptor: new WebApiAdaptor(),
      headers: [
        { Authorization: "Bearer " + localStorage.getItem("id_token") }
      ],
      crossDomain: true
    });
  }

  getTrabajadorNombre(value) {
    console.log(value);
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

      let fechaInicial = args.element.querySelector("#FechaInicial");
      fechaInicial.value =
        args.data.FechaInicial.toLocaleDateString("en-US") +
        " " +
        args.data.FechaInicial.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        });
      let fechaFinal = args.element.querySelector("#FechaFinal");
      fechaFinal.value =
        args.data.FechaFinal.toLocaleDateString("en-US") +
        " " +
        args.data.FechaFinal.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        });
      let descripcion = args.element.querySelector("#Descripcion");
      if (args.data.Descripcion != undefined) {
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
            <td className="e-textlabel">De</td>
            <td style={{ colspan: "4" }}>
              <DateTimePickerComponent
                className="e-field e-input"
                name="FechaInicial"
                id="FechaInicial"
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Hasta</td>
            <td style={{ colspan: "4" }}>
              <DateTimePickerComponent
                className="e-field e-input"
                name="FechaFinal"
                id="FechaFinal"
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Descripción</td>
            <td style={{ colspan: "4" }}>
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
        </tbody>
      </table>
    );
  }

  onActionBegin(args) {
    if (args.requestType == "eventChange") {
      args.data.FechaInicial = args.data.StartTime;
      args.data.Descripcion = args.data.Subject;
      args.data.FechaFinal = args.data.EndTime;
    }
    if (args.requestType == "eventCreate") {
      args.data[0].FechaInicial = args.data[0].StartTime;
      args.data[0].Descripcion = args.data[0].Subject;
      args.data[0].FechaFinal = args.data[0].EndTime;
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
    console.log(args);
    /*var categoryColor = args.data.Color;
    if (!args.element || !categoryColor) {
      return;
    }*/

    if (args.data.Estado) {
      args.element.style.backgroundColor = "#026329";
    } else {
      args.element.style.backgroundColor = "#0cac4d";
    }
  }

  render() {
    return (
      <div className="schedule-control-section">
        <div className="control-section">
          <div className="control-wrapper">
            <ScheduleComponent
              ref={schedule => (this.scheduleObj = schedule)}
              cssClass="custom-work-days"
              currentView="WorkWeek"
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
              showQuickInfo={true}
              dragStart={this.onDragStart.bind(this)}
              actionBegin={this.onActionBegin.bind(this)}
              change={this.change.bind(this)}
              eventRendered={this.onEventRendered.bind(this)}
              resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
              //renderCell={this.onRenderCell.bind(this)}
              group={{ resources: ["Trabajadores"] }}
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
