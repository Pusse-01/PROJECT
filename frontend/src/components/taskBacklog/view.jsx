import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  WeekView,
  MonthView,
  DayView,
  Toolbar,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  DragDropProvider,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { owners } from './tasks';
import {resourcesData } from './resources';
import {appointments } from './resources';
import "./view.css"
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';




const styles = theme => ({
  container: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    justifyContent: 'flex-end',
  },
  text: {
    ...theme.typography.h6,
    marginRight: theme.spacing(3),
  },
});

export default class Calendar extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      data:appointments ,
      resources: [
        {
          fieldName: 'roomId',
          title: 'Room',
          instances: resourcesData,
        },
        {
          fieldName: 'members',
          title: 'Members',
          instances: owners,
          allowMultiple: true,
        },
      ],
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
        const Log ={
          id:data[startingAddedId].id,
          title:data[startingAddedId].title,
          roomId:data[startingAddedId].roomId,
          members:data[startingAddedId].members,
          startDate:data[startingAddedId].startDate,
          endDate:data[startingAddedId].endDate,
          rRule:data[startingAddedId].rRule,
          exDate:data[startingAddedId].exDate,
        }
        window.alert(data[startingAddedId].roomId);
        const ID = "616d5ba262a39205d8b4612a";
        axios.post('http://localhost:8070/api/calendarTaskBackLog/'+ID, Log)

      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }

      return { data };
    });
  }




  render() {
    const { data, resources } = this.state;

    return (
      <div>
 <Paper class="Paper">
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate="2018-05-25"
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <EditRecurrenceMenu />

          <MonthView />
          <WeekView />
          <DayView />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
          />
          <AppointmentForm />

          <Resources
            data={resources}
            mainResourceName="roomId"
          />
          <DragDropProvider />
        </Scheduler>
      </Paper>
      </div>
     
    );
  }
}
