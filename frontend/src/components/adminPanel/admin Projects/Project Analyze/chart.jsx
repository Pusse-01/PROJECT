import React from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import './AnalyzeStyles.css'
import Visibility from "@material-ui/icons/Visibility";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import AnalyzeProjectEmployees from './EmployeesContribution'
const tempData = [
  {
    date_of_interest: "2020-03-05",
    project1: "20",
    project2: "21",
  },
  {
    date_of_interest: "2020-03-06",
    project1: "10",
    project2: "21",
  },
  {
    date_of_interest: "2020-03-07",
    project1: "15",
    project2: "21",
  },
];

export default class Projectperformancecharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: tempData,
      MAX_PAGES: 0,
      gridData: [],
      PageCount: 0,
      loading: true,
      loadingdata: true
    };
  }
  componentDidMount() {
    this.getAllProjectsAndWorking()
  }

  getAllProjectsAndWorking() {
    let GridStructure = [];

    axios.get("http://localhost:8070/projects").then((response) => {
      var projectData = [];
      projectData = response.data;

      this.setState({
        MAX_PAGES: projectData.length - 1,
      });

      if(this.state.MAX_PAGES===0){    
        this.setState({
          loadingdata: true,
        });
      }else{
        this.setState({
          loadingdata: false,
        });
      }

      for (let i = 0; i < projectData.length; i++) {
        let workingData = [];
        axios
          .get(
            "http://localhost:8070/dashboard/gettotaltimeofproject/" +
            projectData[i].name
          )
          .then((response) => {
            workingData = response.data;
          })
          .then(() => {
            let ID = { project_id: projectData[i]._id };
            let taskData = [];
            let allTasks = [];
            axios
              .post("http://localhost:8070/task/getTasksOfProject", ID)
              .then((response) => {
                taskData = response.data.response;
                let totalTimeProject = { hrs: 0, mins: 0, secs: 0 };
                for (let z = 0; z < taskData.length; z++) {
                  var taskLog = [];
                  let Time = { hrs: 0, mins: 0, secs: 0 };
                  for (var y = 0; y < workingData.length; y++) {
                    if (
                      taskData[z].task_name === workingData[y][2] &&
                      taskData[z].project_name === workingData[y][1]
                    ) {
                      taskLog.push(workingData[y]);
                      Time.hrs += parseInt(workingData[y][5].substring(0, 2));
                      Time.mins += parseInt(workingData[y][5].substring(3, 5));
                      Time.secs += parseInt(workingData[y][5].substring(6, 8));
                    }
                  }
                  let aTask = {
                    taskName: taskData[z].task_name,
                    taskStatus: taskData[z].task_status,
                    tasktime: Time,
                    taskWorking: taskLog,
                  };
                  totalTimeProject.hrs = totalTimeProject.hrs + Time.hrs;
                  totalTimeProject.mins = totalTimeProject.mins + Time.mins;
                  totalTimeProject.secs = totalTimeProject.secs + Time.secs;

                  allTasks.push(aTask);
                }

                let Structure = [
                  {
                    p_totalTime: totalTimeProject,
                    p_details: projectData[i],
                    t_details: allTasks,
                  },
                ];
                GridStructure.push(Structure[0]);
                if (GridStructure.length - 1 === this.state.MAX_PAGES) {


                  this.setState({
                    gridData: GridStructure,
                  });
                  console.log(this.state.gridData);
                  this.setState({
                    loading: false,
                  });
                }
                else {
                  this.setState({
                    loading: true,
                  });
                }
              });
          });
      }
    });
  }

  addTracers() {
    if (!this.state.loading) {
      let chartData = [];
      let GridStructure = this.state.gridData
      console.log('grid' + GridStructure);
      let monthinNumber = "";
      for (let k = 0; k < GridStructure.length; k++) {
        let year
        let date
        let month
        let fill
        let mode
        let name
        let date_of_interest
        let xAxis = []
        let yAxis = []
        for (let l = 0; l < GridStructure[k].t_details.length; l++) {
          for (let m = 0; m < GridStructure[k].t_details[l].taskWorking.length; m++) {
            for (let n = m; n < GridStructure[k].t_details[l].taskWorking.length; n++) {

              if (GridStructure[k].t_details[l].taskWorking[m][3] === GridStructure[k].t_details[l].taskWorking[n][3]) {

                year = GridStructure[k].t_details[l].taskWorking[m][3].substring(8, 12);
                date = GridStructure[k].t_details[l].taskWorking[m][3].substring(5, 7);
                month = GridStructure[k].t_details[l].taskWorking[m][3].substring(1, 4);

                switch (month) {
                  case "Jan":
                    monthinNumber = "01";
                    break;
                  case "Feb":
                    monthinNumber = "02";
                    break;
                  case "Mar":
                    monthinNumber = "03";
                    break;
                  case "Apr":
                    monthinNumber = "04";
                    break;
                  case "May":
                    monthinNumber = "05";
                    break;
                  case "Jun":
                    monthinNumber = "06";
                    break;
                  case "Jul":
                    monthinNumber = "07";
                    break;
                  case "Aug":
                    monthinNumber = "08";
                    break;
                  case "Sep":
                    monthinNumber = "09";
                    break;
                  case "Oct":
                    monthinNumber = "10";
                    break;
                  case "Nov":
                    monthinNumber = "11";
                    break;
                  case "Dec":
                    monthinNumber = "12";
                    break;
                  default:
                    console.log("error occurred", month.length, monthinNumber);
                }
                date_of_interest = year + "-" + monthinNumber + "-" + date
                let alreadyin = false
                for (let z = 0; z < xAxis.length; z++) {
                  if (xAxis[z] === date_of_interest) {
                    alreadyin = true
                    let thistime = parseInt(GridStructure[k].t_details[l].taskWorking[n][5].substring(0, 2)) * 3600 + parseInt(GridStructure[k].t_details[l].taskWorking[n][5].substring(3, 5)) * 60 + parseInt(GridStructure[k].t_details[l].taskWorking[n][5].substring(6, 8))
                    yAxis[z] = yAxis[z] + thistime / 60
                  }
                }
                if (!alreadyin) {
                  let totalTime = 0
                  totalTime = totalTime + parseInt(GridStructure[k].t_details[l].taskWorking[n][5].substring(0, 2)) * 3600 + parseInt(GridStructure[k].t_details[l].taskWorking[n][5].substring(3, 5)) * 60 + parseInt(GridStructure[k].t_details[l].taskWorking[n][5].substring(6, 8))
                  yAxis.push(totalTime / 60)
                  xAxis.push(date_of_interest)
                }

              }

            }
          }


        }


        mode = 'lines+markers'
        name = GridStructure[k].p_details.name

        let aData = [{ x: xAxis, y: yAxis, mode: mode, name: name }]
        chartData.push(aData[0])
      }

      for (let a = 0; a < chartData.length; a++) {
        for (let b = 0; b < chartData.length; b++) {
          let yValue = chartData[a].y[b]
          if (yValue === undefined) {
            chartData[a].y[b] = '00'
          } else {
            chartData[a].y[b] = yValue.toString()
          }
        }
      }
      return chartData
    }

  }


  Statuschart() {
    let chartData = [];
    let GridStructure = this.state.gridData
    let onGoing = 0
    let Completed = 0
    let Pending = 0
    let NotStarted = 0
    let overDue = 0
    let xAxis = []
    let yAxis = []
    for (let i = 0; i < GridStructure.length; i++) {
      switch (GridStructure[i].p_details.projectStatus) {
        case 'Pending':
          Pending++
          break
        case 'Not Started':
          NotStarted++
          break
        case 'Completed':
          Completed++
          break
        case 'On going':
          onGoing++
          break
        case 'Overdue':
          overDue++
          break
        default:
          console.log('error occurred', i)
      }
      xAxis.push(GridStructure[i].p_details.name)
    }
    yAxis = [Pending, NotStarted, Completed, onGoing, overDue]

    chartData = [{
      values: yAxis,
      labels: ['Pending', 'Not Started', 'Completed', 'On Going', 'Overdue'],
      type: 'pie'
    }]
    return chartData
  }

  taskStatus() {
    let chartData = [];
    let GridStructure = this.state.gridData

    for (let i = 0; i < GridStructure.length; i++) {
      let Inprogress = 0
      let ToDo = 0
      let Done = 0
      let Bugs = 0
      let Review = 0
      let Notasks = 0
      let yAxis = []
      for (let j = 0; j < GridStructure[i].t_details.length; j++) {
        switch (GridStructure[i].t_details[j].taskStatus) {
          case 'Done':
            Done++
            break
          case 'Bugs/Issues':
            Bugs++
            break
          case 'In Progress':
            Inprogress++
            break
          case 'To Do':
            ToDo++
            break
          case 'Review':
            Review++
            break
          default:
            console.log('error')
        }
      }

      //yAxis = [Bugs, Inprogress, Done, ToDo, Review, Notasks]
      yAxis = [Bugs, Inprogress, Done, ToDo, Review, Notasks]
      let OnechartData = [{
        x: ['Bugs/Issues', 'In Progress', 'Done', 'To Do', 'Review'],
        y: yAxis,
        name: GridStructure[i].p_details.name,
        type: 'bar'
      }]
      if (GridStructure[i].t_details.length !== 0) {
        chartData.push(OnechartData[0])
      }

    }
    return chartData
  }


  gridPageChangeNext = (event) => {
    let id = this.state.PageCount;
    if (id < 3) {
      this.setState({
        PageCount: id + 1,
      });
    }
  };

  gridPageChangePrev = (event) => {
    let id = this.state.PageCount;
    if (id - 1 >= 0) {
      this.setState({
        PageCount: id - 1,
      });
    }
  };



  render() {
    const { PageCount } = this.state

    return (
      <div
        style={{
          content: "middle",
        }}
      >
        <Grid container>

          <Box row style={{ backgroundColor: "#525252", marginLeft: '20px', marginBottom: '20px', marginTop: '10px', width: '80%' }}>
            <Grid container>
              <Grid item style={{ width: '60%', marginLeft: '20px', marginTop: '20px' }}>
                {PageCount === 0 ?
                  <h4 style={{ marginLeft: '30px', marginTop: '20px' }}>Daily Project Activity Chart<span style={{ marginLeft: '50px' }}>  <h6 style={{ marginLeft: '30px', marginTop: '20px' }}>Next : Projects And There Current Status</h6> </span></h4> : null}
                {PageCount === 1 ?
                  <h4 style={{ marginLeft: '30px', marginTop: '20px' }}>Projects And There Current Status<span style={{ marginLeft: '50px' }}>  <h6 style={{ marginLeft: '30px', marginTop: '20px' }}>Next : Tasks And There Status</h6> </span></h4> : null}
                {PageCount === 2 ?
                  <h4 style={{ marginLeft: '30px', marginTop: '20px' }}>Tasks And There Status<span style={{ marginLeft: '50px' }}>  <h6 style={{ marginLeft: '30px', marginTop: '20px' }}>Next : Employee Contribution and performance</h6> </span></h4> : null}
                {PageCount === 3 ?
                  <h4 style={{ marginLeft: '30px', marginTop: '20px' }}>Employee Contribution and performance<span style={{ marginLeft: '50px' }}>  <h6 style={{ marginLeft: '30px', marginTop: '20px' }}>Next : END</h6> </span></h4> : null}


              </Grid>

              <Grid item style={{ marginLeft: "70%", marginTop: "0px", marginBottom: '10px' }}>
                <button class="directionButtons"
                  type="submit"
                  style={{ marginLeft: "20px", marginTop: "5px" }}
                  onClick={this.gridPageChangePrev}
                >
                  Prev Chart
                </button>
                <button class="directionButtons"
                  type="submit"
                  style={{ marginLeft: "20px", marginTop: "5px", marginBottom: '10px' }}
                  onClick={this.gridPageChangeNext}
                >
                  Next Chart
                </button>
                <br />
              </Grid>
            </Grid>

          </Box>
        </Grid>

        {PageCount === 0 ?
          <Grid style={{ marginLeft: "30px", content: "middle" }}>
            <Plot
              data={this.addTracers()}
              layout={{
                width: 1100,
                height: 500,
                title: {
                  text: 'Total Time Spend For Projects In Each Day',
                  font: {
                    family: 'Courier New, monospace',
                    size: 20
                  },
                  xref: 'paper',
                  x: 0.05,
                },
                xaxis: {
                  title: {
                    text: 'Date',
                    font: {
                      family: 'Courier New, monospace',
                      size: 18,
                      color: '#7f7f7f'
                    }
                  },
                },
                yaxis: {
                  title: {
                    text: 'Time in minutes',
                    font: {
                      family: 'Courier New, monospace',
                      size: 18,
                      color: '#7f7f7f'
                    }
                  }
                }
              }}
            />
          </Grid> : null}

        {PageCount === 1 ?



          <Grid style={{ marginLeft: '30px' }}>
            <Plot
              data={this.Statuschart()}
              layout={{
                width: 1100,
                height: 500,
                title: {
                  text: 'All Projects And There Current Status',
                  font: {
                    margin: 100,
                    family: 'Courier New, monospace',
                    size: 15
                  },
                  xref: 'paper',
                  x: 0.05,
                },
              }} />
          </Grid> : null
        }
        {PageCount === 2 ?
          <Grid style={{ marginLeft: '30px' }}>
            <Plot
              data={this.taskStatus()}
              layout={{
                width: 1100,
                height: 500,
                title: {
                  text: 'All Tasks And There Current Status',
                  font: {
                    family: 'Courier New, monospace',
                    size: 20
                  },
                  xref: 'paper',
                  x: 0.05,
                },
                xaxis: {
                  title: {
                    text: 'Task Status',
                    font: {
                      family: 'Courier New, monospace',
                      size: 18,
                      color: '#7f7f7f'
                    }
                  },
                },
                yaxis: {
                  title: {
                    text: 'Task Count',
                    font: {
                      family: 'Courier New, monospace',
                      size: 18,
                      color: '#7f7f7f'
                    }
                  }
                }
              }} />

          </Grid> : null}
        {PageCount === 3 ? <AnalyzeProjectEmployees /> : null}
        <div>
          <div class="bodyappear1analyze">
            <a href="http://localhost:3000/createproject">
              <button class="buttonanalyze">
                <AddCircleOutlineOutlinedIcon
                  fontSize="large"
                  htmlColor="#ffffff"
                />
                Create Project
                <br />
                <p class="p">create your new project</p>
              </button>
            </a>
          </div>
          <div class="bodyappear2analyze">
            <a href="http://localhost:3000/viewtasks">
              <button class="buttonanalyze">
                {" "}
                <Visibility fontSize="large" htmlColor="#ffffff" />
                Show Tasks
                <br />
                <p class="p">view a summary all tasks</p>
              </button>
            </a>
          </div>
          <div class="bodyappear3analyze">
            <a href="http://localhost:3000/viewprojects">
              <button class="buttonanalyze">
                {" "}
                <Visibility fontSize="large" htmlColor="#ffffff" />
                Show Projects
                <br />
                <p class="p">view a summary all projects</p>
              </button>
            </a>
          </div>
        </div>

      </div>
    );
  }
}