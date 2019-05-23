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
  Resize
} from "@syncfusion/ej2-react-schedule";
import { addClass } from "@syncfusion/ej2-base";
import { extend } from "@syncfusion/ej2-base";
import { Ajax, L10n, loadCldr } from "@syncfusion/ej2-base";
import * as dataSource from "./datasource.json";
import * as numberingSystems from "cldr-data/supplemental/numberingSystems.json";
import * as gregorian from "cldr-data/main/es/ca-gregorian.json";
import * as numbers from "cldr-data/main/es/numbers.json";
import * as timeZoneNames from "cldr-data/main/es/timeZoneNames.json";

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);
/**
 * schedule resources group-custom-work-days sample
 */

export class Plan extends React.Component {
  constructor() {
    super(...arguments);
    this.data = extend([], dataSource.doctorData, null, true);
    this.resourceData = [
      {
        text: "Will Smith",
        id: 1,
        color: "#ea7a57",
        startHour: "08:00",
        endHour: "15:00"
      },
      {
        text: "Alice",
        id: 2,
        color: "rgb(53, 124, 210)",
        startHour: "08:00",
        endHour: "17:00"
      },
      {
        text: "Robson",
        id: 3,
        color: "#7fa900",
        startHour: "08:00",
        endHour: "16:00"
      }
    ];
  }

  getDoctorName(value) {
    return value.resourceData
      ? value.resourceData[value.resource.textField]
      : value.resourceName;
  }
  onActionBegin(args) {
    let isEventChange = args.requestType === "eventChange";
    if (
      (args.requestType === "eventCreate" && args.data.length > 0) ||
      isEventChange
    ) {
      let eventData = isEventChange ? args.data : args.data[0];
      let eventField = this.scheduleObj.eventFields;
      let startDate = eventData[eventField.startTime];
      let endDate = eventData[eventField.endTime];
      let resourceIndex = [1, 2, 3].indexOf(eventData.DoctorId);
      args.cancel = !this.isValidTime(startDate, endDate, resourceIndex);
      if (!args.cancel) {
        args.cancel = !this.scheduleObj.isSlotAvailable(
          startDate,
          endDate,
          resourceIndex
        );
      }
    }
  }
  isValidTime(startDate, endDate, resIndex) {
    let resource = this.scheduleObj.getResourcesByIndex(resIndex);
    let startHour = parseInt(
      resource.resourceData.startHour.toString().slice(0, 2),
      10
    );
    let endHour = parseInt(
      resource.resourceData.endHour.toString().slice(0, 2),
      10
    );
    return startHour <= startDate.getHours() && endHour >= endDate.getHours();
  }
  onPopupOpen(args) {
    if (args.target && args.target.classList.contains("e-work-cells")) {
      args.cancel = !args.target.classList.contains("e-work-hours");
    }
  }
  onRenderCell(args) {
    if (
      args.element.classList.contains("e-work-hours") ||
      args.element.classList.contains("e-work-cells")
    ) {
      addClass(
        [args.element],
        [parseInt(args.element.getAttribute("data-group-index"), 10)]
      );
    }
  }
  resourceHeaderTemplate(props) {
    return (
      <div className="template-wrap">
        <div className="resource-detail">
          <div className="resource-name">{this.getDoctorName(props)}</div>
          <div className="resource-designation" />
        </div>
      </div>
    );
  }

  onDragStart(args) {
    args.navigation.enable = true;
  }

  render() {
    return (
      <div className="schedule-control-section">
        <div className="col-lg-12 control-section">
          <div className="control-wrapper">
            <ScheduleComponent
              ref={schedule => (this.scheduleObj = schedule)}
              cssClass="custom-work-days"
              width="100%"
              height="650px"
              selectedDate={new Date(2018, 3, 1)}
              dragStart={this.onDragStart.bind(this)}
              currentView="WorkWeek"
              resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
              eventSettings={{
                dataSource: this.data,
                fields: {
                  subject: { title: "Service Type", name: "Subject" },
                  location: { title: "Patient Name", name: "Location" },
                  description: { title: "Summary", name: "Description" },
                  startTime: { title: "From", name: "StartTime" },
                  endTime: { title: "To", name: "EndTime" }
                }
              }}
              actionBegin={this.onActionBegin.bind(this)}
              popupOpen={this.onPopupOpen.bind(this)}
              renderCell={this.onRenderCell.bind(this)}
              group={{ resources: ["Doctors"] }}
            >
              <ResourcesDirective>
                <ResourceDirective
                  field="DoctorId"
                  title="Doctor Name"
                  name="Doctors"
                  dataSource={this.resourceData}
                  textField="text"
                  idField="id"
                  groupIDField="groupId"
                  colorField="color"
                  workDaysField="workDays"
                  startHourField="startHour"
                  endHourField="endHour"
                />
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option="WorkWeek" />
                <ViewDirective option="Month" />
              </ViewsDirective>
              <Inject services={[WorkWeek, Month, DragAndDrop, Resize]} />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default Plan;
