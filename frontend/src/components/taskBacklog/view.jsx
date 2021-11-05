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
import { withStyles } from '@material-ui/core/styles';
import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import CalendarTodayTwoTone from '@material-ui/icons/CalendarTodayTwoTone';

const getBorder = theme => (`0px solid ${
  theme.palette.type === 'main'
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : darken(fade(theme.palette.divider, 1), 0.68)
}`);

const DayScaleCell = props => (
  <MonthView.DayScaleCell {...props} style={{ textAlign: 'center', fontWeight: 'bold'}} />
);

const styles = theme => ({
  cell: {
    color: '#78909C!important',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    '&:first-child': {
      borderLeft: 'none',
    },
    '&:last-child': {
      paddingRight: 0,
    },
    'tr:last-child &': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  text: {
    padding: '0.5em',
    textAlign: 'center',
  },
  opacity: {
    opacity: '0.8',
  },
  appointment: {
    fontWeight: 'bold',
    opacity: .4,
    backgroundColor: '#000080',
    borderRadius: '6px',
    '&:hover': {
      opacity: 0.5,
    },
  },
  apptContent: {
    '&>div>div': {
      whiteSpace: 'normal !important',
      lineHeight: 1.2,
    },
  },
  flexibleSpace: {
    flex: 'none',
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  tooltipContent: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    width: '400px',
  },
  tooltipText: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  icon: {
    color: theme.palette.action.active,
    verticalAlign: 'middle',
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super',
  },
  textCenter: {
    textAlign: 'center',
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
});



const Appointment = withStyles(styles, { name: 'Appointment' })(({ classes, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    className={classes.appointment}
  />
));

const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(({ classes, ...restProps }) => (
  <Appointments.AppointmentContent {...restProps} className={classes.apptContent} />
));

const FlexibleSpace = withStyles(styles, { name: 'ToolbarRoot' })(({ classes, ...restProps }) => (
  <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <div className={classes.flexContainer}>
      <CalendarTodayTwoTone fontSize="large" htmlColor="#000080" />
      <Typography variant="h5" style={{ marginLeft: '10px', marginRight: '20px' }}>C A L E N D A R</Typography>
    </div>
  </Toolbar.FlexibleSpace>
));


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
      <div zindex="10">
 <Paper class="Paper">
        <Scheduler class="hidescrollbar"
          data={data}
        >
          <ViewState

          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <EditRecurrenceMenu />

          <MonthView 
                      dayScaleCellComponent={DayScaleCell}/>
          <WeekView dayScaleCellComponent={DayScaleCell}/>
          <DayView dayScaleCellComponent={DayScaleCell} />
          <Toolbar flexibleSpaceComponent={FlexibleSpace}/>
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
          <Appointments class="appointment"
                      appointmentComponent={Appointment}
                      appointmentContentComponent={AppointmentContent}/>
          <AppointmentTooltip
                        showCloseButton
                        showDeleteButton
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
