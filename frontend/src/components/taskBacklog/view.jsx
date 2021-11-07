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
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';
//import { owners } from './tasks';
//import { resourcesData } from './resources';
//import { appointments } from './resources';
import "./view.css"
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import CalendarTodayTwoTone from '@material-ui/icons/CalendarTodayTwoTone';
import {
  indigo,
} from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { pink, purple, teal, amber, deepOrange } from '@material-ui/core/colors';

//{/*#8a99a5;*/}


const getBorder = theme => (`0px solid ${theme.palette.type === 'main'
  ? lighten(fade(theme.palette.divider, 1), 0.88)
  : darken(fade(theme.palette.divider, 1), 0.68)
  }`);

const DayScaleCell = props => (
  <WeekView.DayScaleCell {...props} style={{ textAlign: 'center', fontWeight: 'bold' }} />
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

  appointment: {
    opacity: .9,
    backgroundColor: '#4b5ccd',
    borderRadius: '6px',
    '&:hover': {
      opacity: 0.5,
    },
  },
  apptContent: {
    '&>div>div': {
      whiteSpace: 'normal !important',
      lineHeight: 1.2,
      color: '#FFFFFF'
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


/*
const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === "multilineTextEditor") {
    return null;
  }
  if (props.placeholder === "Title") {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

const BooleanEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.label === "All Day" || props.label === "Repeat") {
    return null;
  }
  return <AppointmentForm.BooleanEditor {...props} />;
};
const messages = {
  moreInformationLabel: ""
};
const Label = (props) => {
  if (props.text === "Details") {
    return null;
  }
  return <AppointmentForm.Label {...props} />;
};


let newTitle = "";
const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onNameFieldChange = (nextValue) => {
    newTitle = nextValue;
    onFieldChange({ customField: nextValue });
  };
  const onPhoneFieldChange = (nextValue) => {
    onFieldChange({ phoneField: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label text="Customer Name" type="title" />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onNameFieldChange}
        placeholder="Customer name"
      />
      <AppointmentForm.Label text="Customer Phone" type="title" />
      <AppointmentForm.TextEditor
        value={appointmentData.phoneField}
        onValueChange={onPhoneFieldChange}
        type="numberEditor"
        placeholder="Customer Phone"
      />
    </AppointmentForm.BasicLayout>
  );
};
*/
/////

////
const Appointment = withStyles(styles, { name: 'Appointment' })(({ classes, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    className={classes.appointment}
  />
));

const AppointmentContent = withStyles(styles, {
  name: "AppointmentContent"
})(({ classes, ...restProps }) => (
  <Appointments.AppointmentContent
    {...restProps}
    className={classes.apptContent}
    style={{ whiteSpace: "normal !important", lineHeight: 1.2 }}
  />
));

const ToolBar = withStyles(styles, { name: 'ToolbarRoot' })(({ classes, ...restProps }) => (
  <Toolbar.RootProps {...restProps} className={classes.flexibleSpace}>
    <div className={classes.flexContainer}>
      <CalendarTodayTwoTone fontSize="large" htmlColor="#FFFFFF" />
      <Typography variant="subtitle2" style={{
        marginLeft: '10px', marginRight: '20px', font: "25px Georgia",
        color: "#f9a825"
      }}>C A L E N D A R</Typography>
    </div>
  </Toolbar.RootProps>
))


const FlexibleSpace = withStyles(styles, { name: 'ToolbarRoot' })(({ classes, ...restProps }) => (
  <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <div className={classes.flexContainer}>
      <CalendarTodayTwoTone fontSize="large" htmlColor="#f9a825" />
      <Typography variant="subtitle2" style={{
        marginLeft: '10px', marginRight: '20px', font: "25px Georgia",
        color: "#f9a825"
      }}>C  A  L  E  N  D A  R</Typography>
    </div>
  </Toolbar.FlexibleSpace>
));

const Content = withStyles({ name: "Content" })(
  ({ children, appointmentData, classes, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <Grid
        container
        alignItems="stretch"
        direction="column"
        justify="flex-start"
      >
        <Grid item xs={2} className={classes.textCenter}>
        </Grid>
        <span><br></br>{appointmentData.notes}</span>
      </Grid>
    </AppointmentTooltip.Content>
  )
);
//{appointmentData.notes}

const theme = createTheme({ palette: { type: "dark", primary: indigo } });

////


///
export default class Calendar extends React.PureComponent {

  constructor(props) {

    super(props);
    this.state = {
      currentViewName: 'work-week',
      increasing: false,
      data: [],
      resources: [
        {
          fieldName: 'roomId',
          title: 'Project',
          instances: [],
        },
      ],
    }

    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.commitChanges = this.commitChanges.bind(this);
  }


  componentDidMount() {
    this.interval = setInterval(this.getCalendarLogs(), 15000);
    this.interval = setInterval(this.getProjecLogs(), 15000);

  }

  getCalendarLogs = () => {
    axios.get('http://localhost:8070/api/calendarTaskBackLog')
      .then((response => {
        const data = response.data;
        /*
        console.log('data recieved')
        console.log(response.data.length)
        console.log(response.data[0].calendarlog.title)
        console.log(response.data[1].calendarlog.title)
        console.log((parseInt((response.data[1].calendarlog.startDate).slice(0, 4))))
        console.log((parseInt((response.data[1].calendarlog.startDate).slice(5, 7))))
        console.log((parseInt((response.data[1].calendarlog.startDate).slice(8, 10))))
        console.log((parseInt((response.data[1].calendarlog.startDate).slice(11, 13))))
        console.log((parseInt((response.data[1].calendarlog.startDate).slice(14, 16))))
        */
        var tempData = []
        var Rule;
        for (var i = 0; i < response.data.length; i++) {
          if ((response.data[i].calendarlog.rRule === undefined)) {
            Rule = null;
          }
          else {
            Rule = response.data[i].calendarlog.rRule;
          }
          var tempOne = [

            {
              id: response.data[i].calendarlog.id,
              title: response.data[i].calendarlog.title,
              roomId: response.data[i].calendarlog.roomId,
              members: response.data[i].calendarlog.members,
              startDate: new Date((parseInt((response.data[i].calendarlog.startDate).slice(0, 4))),
                (parseInt((response.data[i].calendarlog.startDate).slice(5, 7))) - 1,
                (parseInt((response.data[i].calendarlog.startDate).slice(8, 10))),
                (parseInt((response.data[i].calendarlog.startDate).slice(11, 13))),
                (parseInt((response.data[i].calendarlog.startDate).slice(14, 16)))),
              notes: response.data[i].calendarlog.description,
              endDate: new Date(
                (parseInt((response.data[i].calendarlog.endDate).slice(0, 4))),
                (parseInt((response.data[i].calendarlog.endDate).slice(5, 7)) - 1),
                (parseInt((response.data[i].calendarlog.endDate).slice(8, 10))),
                (parseInt((response.data[i].calendarlog.endDate).slice(11, 13))),
                (parseInt((response.data[i].calendarlog.endDate).slice(14, 16)))),
              rRule: Rule,
            }
          ]
          tempData.push(tempOne[0])

        }
        this.setState({
          data: tempData
        })
      })).catch(() => {
        alert('error');
      })


  }

  getProjecLogs = () => {
    axios.get('http://localhost:8070/employee/projects/yasodhyapereras@gmail.com')
      .then((response => {
        const data = response;
        var resources = [];
        var color
        for (var i = 0; i < response.data.length; i++) {
          console.log(response.data[i].name)
          if (i % 4 === 0) {
            color = amber;
          } else if (i % 3 === 0) {
            color = teal;
          }
          else if (i % 2 === 0) {
            color = deepOrange;
          }
          else {
            color = teal
          }


          var resourcesData = [
            {
              text: response.data[i].name,
              id: i,
              color: color,
            }
          ]
          resources.push(resourcesData[0]);
        }

        this.setState({
          resources: [
            {
              fieldName: 'roomId',
              title: 'Project',
              instances: resources,
            },
          ],
        })
      })).catch(() => {
        alert('error');
      })
  }




  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      let hold = data;
      let value = true;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
        console.log(data[startingAddedId].startDate)
        const Log = {
          id: data[startingAddedId].id,
          title: data[startingAddedId].title,
          description: data[startingAddedId].notes,
          roomId: data[startingAddedId].roomId,
          members: data[startingAddedId].members,
          startDate: data[startingAddedId].startDate,
          endDate: data[startingAddedId].endDate,
          rRule: data[startingAddedId].rRule,
          exDate: data[startingAddedId].exDate,
        }

        value = false;
        if (data[startingAddedId].startDate == data[startingAddedId].endDate) {
          window.alert('h,,,,')
        }
        else {
          const ID = "616d5ba262a39205d8b4612a";
          axios.post('http://localhost:8070/api/calendarTaskBackLog/' + ID, Log)
        }
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        ));
        let Index = -1;
        if (value === true) {
          for (var i = 0; i < data.length; i++) {
            if (!(data[i].id === hold[i].id && data[i].title === hold[i].title && data[i].members === hold[i].members &&
              data[i].roomId === hold[i].roomId && data[i].rRule === hold[i].rRule && data[i].startDate === hold[i].startDate &&
              data[i].endDate === hold[i].endDate && data[i].exDate === hold[i].exDate && data[i].notes === hold[i].notes)) {
              Index = i;
            }
          }
        }
        else {
          for (var i = 0; i < data.length - 1; i++) {
            if (!(data[i].id === hold[i].id && data[i].title === hold[i].title && data[i].members === hold[i].members &&
              data[i].roomId === hold[i].roomId && data[i].rRule === hold[i].rRule && data[i].startDate === hold[i].startDate &&
              data[i].endDate === hold[i].endDate && data[i].exDate === hold[i].exDate && data[i].notes === hold[i].notes)) {
              Index = i;
            }
          }
        }
        const LogPut = {
          id: data[Index].id,
          title: data[Index].title,
          description: data[Index].notes,
          roomId: data[Index].roomId,
          members: data[Index].members,
          startDate: data[Index].startDate,
          endDate: data[Index].endDate,
          rRule: data[Index].rRule,
          exDate: data[Index].exDate,
        }
        axios.put('http://localhost:8070/api/calendarTaskBackLog/' + hold[Index].id, LogPut)


      }
      if (deleted !== undefined) {
        data = data.filter(appointment => (appointment.id !== deleted));

        let Index = hold.length - 1;
        for (var i = 0; i < data.length; i++) {
          //for(var j = i; i < data.length; j++) {
          if (!(data[i].id === hold[i].id)) {
            Index = i;
            window.alert(data[Index].id)
          }
        }
        axios.delete('http://localhost:8070/API/calendarTaskBackLog/' + hold[Index].id, "")

        //}
      }
      return { data };
    });
  }




  render() {
    const { data, resources,currentViewName } = this.state;

    return (


      <div>
        <div zindex="0">

        </div>
        <MuiThemeProvider theme={theme}>
          <Paper class="Paper">
            <Scheduler
              data={data}
            >
              <ViewState
                currentViewName={currentViewName}
                onCurrentViewNameChange={this.currentViewNameChange}
              />
              <EditingState
                onCommitChanges={this.commitChanges}

              />
              <EditRecurrenceMenu />
              <WeekView />
              <MonthView />

              <WeekView dayScaleCellComponent={DayScaleCell}
                name="work-week"
                displayName="Work Week"
                excludedDays={[0, 6]}
                startDayHour={0}
                endDayHour={24}
              />
              <DayView dayScaleCellComponent={DayScaleCell} />
              <Toolbar flexibleSpaceComponent={FlexibleSpace} toolbarComponent={ToolBar} />
              <ViewSwitcher />
              <DateNavigator />
              <TodayButton />
              <Appointments class="appointment"
                appointmentComponent={Appointment}
                appointmentContentComponent={AppointmentContent} />
              <AppointmentTooltip
                contentComponent={Content}
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
              <CurrentTimeIndicator
                shadePreviousCells={true}
                shadePreviousAppointments={true}
                updateInterval={10000}
              />
            </Scheduler>
          </Paper>
        </MuiThemeProvider>
      </div>

    );
  }
}
