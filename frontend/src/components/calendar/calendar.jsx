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
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
//import { owners } from './tasks';
//import { resourcesData } from './resources';
//import { appointments } from './resources';
import "./calendarStyles.css"
import "./calendarAnimatedbackground.css"
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CalendarTodayTwoTone from '@material-ui/icons/CalendarTodayTwoTone';
import Grid from "@material-ui/core/Grid";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import {indigo, pink, purple, teal, amber, deepOrange } from '@material-ui/core/colors';


const theme = createTheme({ palette: { type: "dark", primary: indigo } });


//theme style of schedular components
const styles = theme => ({
  flexibleSpace: {
    flex: 'none',
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
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

})




// customizations of the schedulaer components


/**********************************************
Function: Tool bar customization
**********************************************/
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

/**********************************************
Function: Appointment tool tip customization
**********************************************/
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
/**********************************************
Function: Appointment view customization
**********************************************/
const AppointmentContent = withStyles(styles, {
  name: "AppointmentContent"
})(({ classes, ...restProps }) => (
  <Appointments.AppointmentContent
    {...restProps}
    className={classes.apptContent}
    style={{ whiteSpace: "normal !important", lineHeight: 1.2 }}
  />
));


const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.placeholder === "Title") {
    if(props.title === null || props.title === "") {
        
    }
  }
  return <AppointmentForm.TextEditor {...props} />;
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    const loggedInUser = localStorage.getItem("user");
    const founduser = JSON.parse(loggedInUser);
    this.state = {
      currentViewName: 'Month',
      shadePreviousCells: true,
      shadePreviousAppointments: true,
      name: founduser.employee.name,
      id: founduser.employee.id,
      email: founduser.employee.email,
      data: [],
      resources: [],
      currentDate: Date.now(),
    };
    this.commitChanges = this.commitChanges.bind(this);

    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });


    };

  }






  componentDidMount() {
    document.title = "PROJECT Calendar"
    this.getCalendarLogs()
    this.getProjecLogs()
  }

  getCalendarLogs = () => {
    axios.get('http://localhost:8070/api/calendarTaskBackLog')
      .then((response => {
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
    const userEamil = this.state.email;
    var resources = [];
    axios.get('http://localhost:8070/employee/projects/' + userEamil)
      .then((response => {
        var color;
        for (var i = 0; i < response.data.length; i++) {
          if (i % 7 === 0) {
            color = amber;
          } else if (i % 5 === 0) {
            color = teal;
          }
          else if (i % 3 === 0) {
            color = pink;
          }
          else if (i % 2 === 0) {
            color = purple;
          }
          else {
            color = deepOrange
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
        //console.log(resources)

      })).then(() => {
        var memberslist = []
        for (var j = 0; j < resources.length; j++) {
          //console.log(resources[j].text);
          axios.get('http://localhost:8070/projects/list/' + resources[j].text) //http://localhost:8070/projects/list/'+userEamil
            .then((response) => {
              for (var i = 1; i < response.data.members.length; i++) {
                console.log(response.data.members[i])
                var member = [{
                  id: i,
                  text: response.data.members[i],
                }]

                console.log(typeof response.data.members[i])
                memberslist.push(member[0]);
                console.log(member[0].text)
              }

              this.setState({
                resources: [
                  {
                    fieldName: 'roomId', //built in field name - just used as it is
                    title: 'Project',
                    instances: resources,
                  },
                  {
                    fieldName: 'members',
                    title: 'Members',
                    allowMultiple: true,
                    instances: memberslist,
                  },
                ],
              })
            })
        }
      })
      .catch(() => {
        alert('error');
      })
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      let hold = data;
      let success = false;


      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];

        if (data[startingAddedId].title === "") {
          alert('Title required!');
        }

        else if (!(changed || deleted)) {
          success = true;
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
          const ID = this.state.id;
          axios.post('http://localhost:8070/api/calendarTaskBackLog/' + ID, Log)
        }
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
        let Index = hold.length - 1;
        if (!(added || deleted)) {
          success = true;
          for (var i = 0; i < data.length; i++) {
            if (!(data[i].id === hold[i].id && data[i].title === hold[i].title && data[i].members === hold[i].members &&
              data[i].roomId === hold[i].roomId && data[i].rRule === hold[i].rRule && data[i].startDate === hold[i].startDate &&
              data[i].endDate === hold[i].endDate && data[i].exDate === hold[i].exDate && data[i].notes === hold[i].notes)) {
              Index = i;
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
          }
        }

      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
        if (!(changed || added)) {
          success = true;
          let Index = hold.length - 1;
          for (var i = 0; i < data.length; i++) {
            //for(var j = i; i < data.length; j++) {
            if (!(data[i].id === hold[i].id)) {
              Index = i;
            }
          }
          axios.delete('http://localhost:8070/API/calendarTaskBackLog/' + hold[Index].id, "");


        }//http://localhost:8070/api/calendarTaskBackLogdelete
      }
      if ((success === false) && (changed || added || deleted)) {
        var ID = this.state.id;
        var holddata = data;
        axios.delete('http://localhost:8070/api/calendarTaskBackLogdelete/' + ID, "deleted");
        if(holddata.length === 0){
          for (i = 0; i < holddata.length; i++) {
            try {
              const Log = {
                id: holddata[i].id,
                title: holddata[i].title,
                description: holddata[i].notes,
                roomId: holddata[i].roomId,
                members: holddata[i].members,
                startDate: holddata[i].startDate,
                endDate: holddata[i].endDate,
                rRule: holddata[i].rRule,
                exDate: holddata[i].exDate
              }
              const ID = this.state.id;
              axios.post('http://localhost:8070/api/calendarTaskBackLog/' + ID, Log)
            } catch (error) {
              alert('Error occurred while posting.\nPlease delete the appointment at once.')
            }
  
          }
        }

      }
      return { data };
    });
  }


  render() {
    const { data, currentViewName, resources, currentDate } = this.state;

    return (
      <div>
        <div>
          <ul class="background">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>

          <ul class="background1">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <MuiThemeProvider theme={theme}>
          <Paper class="Paper">

            <Scheduler
              data={data}
            >
              <ViewState

                defaultCurrentDate={currentDate}
                currentViewName={currentViewName}
                onCurrentViewNameChange={this.currentViewNameChange}
                defaultCurrentViewName="Month"
              />
              <Toolbar flexibleSpaceComponent={FlexibleSpace} toolbarComponent={ToolBar} />
              <DateNavigator />
              <TodayButton />
              <ViewSwitcher />
              <EditingState
                onCommitChanges={this.commitChanges}
              />
              <EditRecurrenceMenu />


              <MonthView />
              <WeekView />
              <DayView />
              <Appointments className="appointment"
                appointmentContentComponent={AppointmentContent}
              />
              <AppointmentTooltip
                contentComponent={Content}
                showCloseButton
                showDeleteButton
                showOpenButton
              />
              <AppointmentForm />
              
              <Resources
                data={resources}
              />
              <AllDayPanel />
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
