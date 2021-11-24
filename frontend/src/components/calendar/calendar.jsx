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
import { indigo, pink, purple, teal, amber, deepOrange } from '@material-ui/core/colors';


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
    </div>
  </Toolbar.RootProps>
))


const FlexibleSpace = withStyles(styles, { name: 'ToolbarRoot' })(({ classes, ...restProps }) => (
  <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <div className={classes.flexContainer}>
      <CalendarTodayTwoTone fontSize="large" htmlColor="#ffffff" />
      <Typography variant="subtitle2" style={{
        marginLeft: '10px', marginRight: '20px', font: "10px",
        color: "#FF0000"
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


export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    const loggedInUser = localStorage.getItem("user");
    const founduser = JSON.parse(loggedInUser);
    this.state = {
      currentViewName: 'Month',
      shadePreviousCells: true,
      shadePreviousAppointments: true,
      data: [],
      resources: [],
      name: founduser.employee.name,
      id: founduser.employee.id,
      email: founduser.employee.email,
      lastlog:[],
      currentDate: Date.now(),
      loading: false,
      loadinggetlogs: true,
      loadinggetprojects: true,
      changes: false,
      error: false
    };


    this.commitChanges = this.commitChanges.bind(this);

    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });

    };

  }
  componentWillMount() {
    this.getCalendarLogs()
    this.getProjecLogs()
  }
  componentDidMount() {
    document.title = "PROJECT Calendar"

    this.getCalendarLogs()
    this.getProjecLogs()

    if (this.state.changes) {
      // this.savesession();
      console.log('lol             lol            lol')

    }

    this.interval = setInterval(
      () => {

        if (this.state.changes) {
          this.savesession();
          this.setState({
            changes: false
          })
        }

        this.setState(() => {
          if (navigator.onLine) {
            this.setState({
              loading: false,
            });
          } else {
            this.setState({
              loading: true,
            });
          }
        })
      },
      1000
    );

    window.onbeforeunload = function () {
      return 'Are you sure you want to leave?';
    };
  }


  componentWillUnmount() {
    //if data connection lost after long session no new data will be saved
    this.savesession();
    clearInterval(this.interval);
  }

  getCalendarLogs = () => {
    const userID = this.state.id;
    axios.get('http://localhost:8070/api/calendarTaskBackLog/' + userID)
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
              startDate: response.data[i].calendarlog.startDate,
              notes: response.data[i].calendarlog.description,
              endDate: response.data[i].calendarlog.endDate,
              rRule: Rule,
              exDate: response.data[i].calendarlog.exDate,
            }
          ]
          tempData.push(tempOne[0])
        }
        this.setState({
          data: tempData,
          loadinggetlogs: false
        })
      })).catch(() => {
        this.setState({
          error: true
        })
      })
  }


  getProjecLogs = () => {
    const userEamil = this.state.email;
    var resources = [];
    var currentlog =[];
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

          if(i=== response.data.length-1){
            currentlog =[{
              title:response.data[i].name,
              duedate:((response.data[i].overdue).toString()).substring(0, 10),
              note:response.data[i].projectStatus,
            }]
            this.setState({lastlog:currentlog});
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

      })).then(() => {
        var memberslist = []
        for (var j = 0; j < resources.length; j++) {
          //console.log(resources[j].text);
          axios.get('http://localhost:8070/projects/list/' + resources[j].text) //http://localhost:8070/projects/list/'+userEamil
            .then((response) => {
              for (var i = 1; i < response.data.members.length; i++) {
                var member = [{
                  id: i,
                  text: response.data.members[i],
                }]
                memberslist.push(member[0]);
              }

              this.setState({
                resources: [
                  {
                    fieldName: 'roomId', //built in field name - just used as it is
                    title: 'Projects',
                    instances: resources,
                  },
                  {
                    fieldName: 'members',
                    title: 'Members',
                    allowMultiple: true,
                    instances: memberslist,
                  },
                ],
                loadinggetprojects: false,
              })
            })
        }
      })
      .catch(() => {
        this.setState({
          error: true
        })
      })
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        var maxID = 0;
        if (data.length === 0) {
          maxID = 0;
        } else if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            if (maxID < data[i].id) {
              maxID = data[i].id
            }
          }
        }
        data = [...data, { id: maxID + 1, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }



      this.setState({
        changes: true
      })
      return { data };
    });
  }


  //save session moved to constructor
  savesession = () => {
    const ID = this.state.id;
    const data = this.state.data;
    if (data.length > 0) {
      axios.delete('http://localhost:8070/api/calendarTaskBackLogdelete/' + ID, "deleted")
        .then(() => {
          try {
            for (var i = 0; i < data.length; i++) {
              const Log = {
                id: data[i].id,
                title: data[i].title,
                description: data[i].notes,
                roomId: data[i].roomId,
                members: data[i].members,
                startDate: data[i].startDate,
                endDate: data[i].endDate,
                rRule: data[i].rRule,
                exDate: data[i].exDate
              }
              axios.post('http://localhost:8070/api/calendarTaskBackLog/' + ID, Log)
                .then(() => {
                  console.log('session succesfully ended.')
                })
            }
          } catch (error) {
            this.setState({
              error: true
            })
          }
        });
    }
  }


  render() {
    const { data, currentViewName, resources, currentDate, lastlog } = this.state;




    if (this.state.loading) {
      return (
        <div>
          <div class="ring1">
            Loading
            <span class="span1"></span>
          </div>
          <div>

            <button class="loadingbuttonmain">
              Please check your network connection.
            </button>
          </div>
        </div>

      );
    }

    if (this.state.error) {
      return (
        <div>
          <div class="ring1">
            Loading
            <span class="span1"></span>
          </div>
          <div>
            <button class="loadingbuttonmain">
              Unexpected Error occurred.<br /> Please check your network connection
            </button>
          </div>
        </div>
      );
    }


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

<div>
<div>{lastlog.length > 0?
  <button class="changesmain">
  Last Assigned Project<br/><br/>

  Title : {lastlog[0].title}<br/>
  Due Date : {lastlog[0].duedate}<br/>
  Status : {lastlog[0].note}<br/>
</button>: <button class="changesmain">
  No Projects have assigned!<br/>
</button>
}
      
      </div>
</div>


        <div>
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
