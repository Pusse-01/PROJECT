import React from "react";
import "./showprojectStyles.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
//Table
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { InputBase } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
//icons
import BeenhereIcon from "@mui/icons-material/Beenhere";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import PendingIcon from "@mui/icons-material/Pending";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import TrendingUp from "@material-ui/icons/TrendingUp";

import { Helmet } from 'react-helmet'

const TITLE ='Project View'
//styleset
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));




export default class ShowProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridData: [],
      gridDataSave: [],
      projectData: [],
      workingData: [],
      taskData: [],
      pageCount: 0,
      MAX_PAGES: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this.getAllProjectsAndWorking();
  }



  getAllProjectsAndWorking() {
    let GridStructure = [];


    axios.get("http://localhost:8070/projects")
      .then((response) => {
        var projectData = []
        projectData = response.data;

        this.setState({
          MAX_PAGES: projectData.length - 1,
        });

        for (let i = 0; i < projectData.length; i++) {
          let workingData = [];
          axios.get("http://localhost:8070/dashboard/gettotaltimeofproject/" + projectData[i].name)
            .then((response) => {
              workingData = response.data
            }).then(() => {
              let ID = { project_id: projectData[i]._id };
              let taskData = [];
              let allTasks = [];
              axios.post("http://localhost:8070/task/getTasksOfProject", ID)
                .then((response) => {
                  taskData = response.data.response;
                  let totalTimeProject = { hrs: 0, mins: 0, secs: 0 }
                  for (let z = 0; z < taskData.length; z++) {
                    var taskLog = [];
                    let Time = { hrs: 0, mins: 0, secs: 0 };
                    for (var y = 0; y < workingData.length; y++) {
                      if (taskData[z].task_name === workingData[y][2] && taskData[z].project_name === workingData[y][1]) {
                        taskLog.push(workingData[y]);
                        Time.hrs += parseInt((workingData[y][5]).substring(0, 2))
                        Time.mins += parseInt((workingData[y][5]).substring(3, 5))
                        Time.secs += parseInt((workingData[y][5]).substring(6, 8))
                      }

                    }
                    let aTask = {
                      taskName: taskData[z].task_name,
                      taskStatus: taskData[z].task_status,
                      tasktime: Time,
                      taskWorking: taskLog,
                    };
                    totalTimeProject.hrs = totalTimeProject.hrs + Time.hrs
                    totalTimeProject.mins = totalTimeProject.mins + Time.mins
                    totalTimeProject.secs = totalTimeProject.secs + Time.secs

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

                  console.log(this.state.gridData.length, this.state.MAX_PAGES)
                  if (GridStructure.length - 1 === this.state.MAX_PAGES) {

                    this.setState({
                      gridData: GridStructure,
                      gridDataSave: GridStructure,
                      loading: false
                    });
                    console.log(this.state.gridData);
                  } else {
                    this.setState({
                      loading: true
                    });
                  }

                })
            })

        }



      })
  }


  cellDoubleClick = (event) => {
    console.log(event);
  };

  gridPageChangeNext = (event) => {
    let id = this.state.pageCount;
    if (id < this.state.MAX_PAGES) {
      this.setState({
        pageCount: id + 1,
      });
    }
  };

  gridPageChangePrev = (event) => {
    let id = this.state.pageCount;
    if (id - 1 >= 0) {
      this.setState({
        pageCount: id - 1,
      });
    }
  };


  Click = (event) => {
    console.log(this.state.gridData[this.state.pageCount].t_details[0].taskName)
  }


  filterProjects = (event) => {
    var value = event.target.value;
    console.log(value);
    var searchPage = 0;
    for (var i = 0; i < this.state.gridData.length; i++) {
      if (
        this.state.gridData[i].p_details.name.toLowerCase().includes(value.toLowerCase())) {
        searchPage = i;
      }
    }
    this.setState({
      pageCount: searchPage
    });
  };


  deleteProject = (event) => {
    let ID =this.state.gridData[this.state.pageCount].p_details._id
    axios.delete('http://localhost:8070/employee/projectdelete/'+ ID)
    .then((response) => {
      console.log(response)
      axios.delete('http://localhost:8070/task/deleteallTaskofthisproject/'+ID)
      .then((response)=>{
        console.log(response)
        window.location.reload(false);
      })
    }).catch((error)=>{
      console.log(error)
    })
  }


  render() {
    const { gridData, pageCount, loading } = this.state;

    if (!loading) {
      return (
        <div>
          <Box style={{ backgroundColor: "#525252", marginLeft: '20px', marginRight: '200px', marginTop: '0px' }}>
            <Grid container>
              <Grid
                item
                style={{
                  backgroundColor: "#525252",
                  padding: "0px",
                  marginLeft: "40%",
                  width: "400px",
                  marginRight: "80px",
                  marginTop: "0px",
                  marginBottom: "10px",
                }}
              >

              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "0px" }}>
              <Grid
                item
                style={{
                  backgroundColor: "transparent",
                  opacity: 0.8,
                  marginLeft: "20px",
                  borderRadius: "8px",
                  borderwidth: "1px",
                  border: "5px solid black",
                  alignItems: "center",
                  width: "400px",
                }}
              >
                <h1
                  style={{
                    color: "#000000",
                    font: "30px Helvetica",
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
                  {gridData[pageCount].p_details.name}
                </h1>
              </Grid>
              <Grid>
                {gridData[pageCount].p_details.projectStatus === "On going" ?
                  <Grid
                    item
                    style={{ backgroundColor: "trasnparent", padding: "0px", width: '100px' }}
                  >
                    <Typography
                      variant="h5"
                      style={{
                        marginLeft: "20px",
                        marginRight: "10px",
                        marginBottom: "0px",
                        paddingTop: "10px",
                        color: "#FFFF00",
                      }}
                    >
                      <MoreTimeIcon fontSize="small" htmlColor="#000000" />
                    </Typography>
                    <Typography
                      variant="h7"
                      style={{
                        marginLeft: "10px",
                        font: "5px",
                        marginTop: "0px",
                        color: "#FFFF00",
                      }}
                    >
                      {" "}
                      {gridData[pageCount].p_details.projectStatus}{" "}
                    </Typography>
                  </Grid>
                  : null}
                {gridData[pageCount].p_details.projectStatus === "Completed" ?
                  <Grid
                    item
                    style={{ backgroundColor: "trasnparent", padding: "0px", width: '100px' }}
                  >
                    <Typography
                      variant="h5"
                      style={{
                        marginLeft: "20px",
                        marginRight: "10px",
                        marginBottom: "0px",
                        paddingTop: "10px",
                        color: "#FFFF00",
                      }}
                    >
                      <AssignmentTurnedInIcon fontSize="small" htmlColor="#000000" />
                    </Typography>
                    <Typography
                      variant="h7"
                      style={{
                        marginLeft: "10px",
                        font: "5px",
                        marginTop: "0px",
                        color: "#00FF00",
                      }}
                    >
                      {" "}
                      {gridData[pageCount].p_details.projectStatus}{" "}
                    </Typography>
                  </Grid>
                  : null}
                {gridData[pageCount].p_details.projectStatus === "Over due" ?
                  <Grid
                    item
                    style={{ backgroundColor: "trasnparent", padding: "0px", width: '100px' }}
                  >
                    <Typography
                      variant="h5"
                      style={{
                        marginLeft: "20px",
                        marginRight: "10px",
                        marginBottom: "0px",
                        paddingTop: "10px",
                        color: "#FFFF00",
                      }}
                    >
                      <BeenhereIcon fontSize="small" htmlColor="#000000" />
                    </Typography>
                    <Typography
                      variant="h7"
                      style={{
                        marginLeft: "10px",
                        font: "5px",
                        marginTop: "0px",
                        color: "#FF0000",
                      }}
                    >
                      {" "}
                      {gridData[pageCount].p_details.projectStatus}{" "}
                    </Typography>
                  </Grid>
                  : null}
                {gridData[pageCount].p_details.projectStatus === "Pending" || gridData[pageCount].p_details.projectStatus === "Not Started" ?
                  <Grid
                    item
                    style={{ backgroundColor: "trasnparent", padding: "0px", width: '100px' }}
                  >
                    <Typography
                      variant="h5"
                      style={{
                        marginLeft: "20px",
                        marginRight: "10px",
                        marginBottom: "0px",
                        paddingTop: "10px",
                        color: "#FFFF00",
                      }}
                    >
                      <PendingIcon fontSize="small" htmlColor="#000000" />
                    </Typography>
                    <Typography
                      variant="h7"
                      style={{
                        marginLeft: "10px",
                        font: "5px",
                        marginTop: "0px",
                        color: "#0000FF",
                      }}
                    >
                      {" "}
                      {gridData[pageCount].p_details.projectStatus}{" "}
                    </Typography>
                  </Grid>
                  : null}
              </Grid>
              <Grid>  <Box style={{ width: '200px' }}>
                <p row style={{ color: "#e8e8e8", opacity: '0.8', fontSize: '20PX' }}>Project Description : <span row style={{ color: "#969696", fontSize: '18PX' }}>
                  {gridData[pageCount].p_details.discription}
                </span>{" "}</p>

              </Box></Grid>
              <Grid>
                <Box style={{ marginLeft: '100px' }}>
                  <SearchIcon fontSize="large" htmlColor="#000000" />
                  <InputBase style={{ borderBottom: "2px solid black", marginTop: "10px" }}

                    placeholder="Search for project name....."
                    onChange={this.filterProjects}
                  ></InputBase>

                  <Grid style={{ marginLeft: "0px", marginTop: "10px" }}>
                    <button class="directionButtons"
                      type="submit"
                      style={{ marginLeft: "20px", marginTop: "5px" }}
                      onClick={this.gridPageChangePrev}
                    >
                      Prev Project
                    </button>
                    <button class="directionButtons"
                      type="submit"
                      style={{ marginLeft: "20px", marginTop: "5px" }}
                      onClick={this.gridPageChangeNext}
                    >
                      Next Project
                    </button>
                    <br />
                    <p style={{ marginLeft: '30px' }}>  Page {pageCount + 1} of {gridData.length}</p>
                    <button type="submit" onClick={this.deleteProject} style={{ backgroundColor: "transparent", border: "1px solid black", marginLeft: '20px' }}>< DeleteForeverIcon />Delete Project</button>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                style={{
                  marginLeft: "20px",
                  marginTop: "20px",
                  width: "100%",
                }}
              >
                <p style={{ font: "15px Helvetica", color: "#000000" }}>
                  End Date&ensp; :&emsp;
                  {(gridData[pageCount].p_details.overdue).substring(0, 10)} &emsp;&emsp; Total
                  Time spent&ensp; :&emsp;
                  {gridData[pageCount].p_totalTime.hrs} Hrs  {gridData[pageCount].p_totalTime.mins} Mins {gridData[pageCount].p_totalTime.secs} Secs
                </p>
              </Grid>
            </Grid>

          </Box>


          <Box>
            <Grid container item>
              <Grid style={{ marginLeft: "30px", marginTopt: "30px" }}>

                : null
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Grid conatiner
              item
              style={{
                backgroundColor: "trasnparent",
                padding: "0px",
                marginTop: "0px",
              }}
            >
              <Grid style={{ marginLeft: "30px", marginTop: "10px", marginBottom: "0px",color: '#dec8ab', fontSize: '10px'}}><h6>Team Members</h6></Grid>
              <Grid container style={{ marginLeft: "30px"}}>
                {gridData[pageCount].p_details.members.map((members, memberindex) => (
                  <Grid> <p style={{ marginLeft: "20px", marginTopt: "0px", border: 'none', color: '#eadbc8', fontSize: '10px' }}>{memberindex+1}.{members}</p>
                  </Grid>







                ))}

              </Grid>

              <Paper style={{ marginLeft: '30px', marginRight: '200px' }}>
                <TableContainer sx={{ maxHeight: 580 }}>
                  {gridData[pageCount].t_details.map((tasks, index) => (
                    <Table style={{ backgroundColor: '#525252' }}>
                      <TableHead  >
                        <StyledTableRow style={{ border: 'none' }} value={index}>
                          <TableCell style={{ border: 'none', color: 'black', fontSize: '18px' }}>Task Name :</TableCell>
                          <TableCell style={{ border: 'none', color: '#080808', fontSize: '16px' }} align='left'>{tasks.taskName}</TableCell>
                          <TableCell style={{ border: 'none', color: 'black', fontSize: '18px' }}>Task Status :</TableCell>
                          <TableCell style={{ border: 'none', color: '#080808', fontSize: '16px' }} >{tasks.taskStatus}</TableCell>
                          <TableCell style={{ border: 'none', color: 'black', fontSize: '18px' }}>Total Time Spent :</TableCell>
                          <TableCell style={{ border: 'none', color: '#080808', fontSize: '16px' }}>{tasks.tasktime.hrs} Hrs {tasks.tasktime.mins} Mins {tasks.tasktime.secs} Secs</TableCell>
                          <TableCell style={{ border: 'none' }}></TableCell>

                        </StyledTableRow>
                      </TableHead  >
                      <StyledTableRow style={{ border: 'none' }}>
                        <TableCell colSpan={1} style={{ border: 'none', color: 'black', fontSize: '16px' }}>Employee Name :</TableCell>
                        <TableCell colSpan={2} style={{ border: 'none', color: 'black', fontSize: '16px' }}>Task Start Time :</TableCell>
                        <TableCell style={{ border: 'none', color: 'black', fontSize: '16px' }}>Task End Time :</TableCell>
                        <TableCell colSpan={3} style={{ border: 'none', color: 'black', fontSize: '16px' }}>Total Time :</TableCell>
                      </StyledTableRow>
                      {tasks.taskWorking.map((taskwork, indextask) => (
                        <StyledTableRow>
                          <TableCell colSpan={1} style={{ border: 'none', color: '#1b1b1b', fontSize: '14px' }}>{taskwork[0]}</TableCell>
                          <TableCell colSpan={2} style={{ border: 'none', color: '#1b1b1b', fontSize: '14px' }}>{taskwork[3]}</TableCell>
                          <TableCell style={{ border: 'none', color: '#1b1b1b', fontSize: '14px' }}>{taskwork[4]}</TableCell>
                          <TableCell colSpan={3} style={{ border: 'none', color: '#1b1b1b', fontSize: '14px' }}>{taskwork[5]}</TableCell>

                        </StyledTableRow>
                      ))}
                      <StyledTableRow />
                    </Table>
                  ))}
                </TableContainer>
                <Grid>
                  <Box style={{ backgroundColor: '#a99a86', width: '100%', textAlign: 'center' }}>End of Rows</Box>
                </Grid>
              </Paper>


            </Grid>
          </Box>
          <div>
            <div class="bodyappear3viewproject">
              <a href="http://localhost:3000/createproject">
                <button class="buttonviewproject">
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
            <div class="bodyappear4viewproject">
              <a href="http://localhost:3000/viewtasks">
                <button class="buttonviewproject">
                  {" "}
                  <Visibility fontSize="large" htmlColor="#ffffff" />
                  Show Tasks
                  <br />
                  <p class="p">view a summary all tasks</p>
                </button>
              </a>
            </div>
            <div class="bodyappear5viewproject">
              <a href="http://localhost:3000/viewanalysis">
                <button class="buttonviewproject">
                  {" "}
                  <TrendingUp fontSize="large" htmlColor="#ffffff" />
                  Status
                  <br />
                  <p class="p">evaluate your work</p>
                </button>
              </a>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
                  <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
          
          <h3 style={{color:'white', marginLeft:'500px', font:'30px', marginTop:'200PX'}}>No data to show.</h3>

          <div>
            <div class="bodyappear3viewproject">
              <a href="http://localhost:3000/createproject">
                <button class="buttonviewproject">
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
            <div class="bodyappear4viewproject">
              <a href="http://localhost:3000/viewtasks">
                <button class="buttonviewproject">
                  {" "}
                  <Visibility fontSize="large" htmlColor="#ffffff" />
                  Show Tasks
                  <br />
                  <p class="p">view a summary all tasks</p>
                </button>
              </a>
            </div>
            <div class="bodyappear5viewproject">
              <a href="http://localhost:3000/viewanalysis">
                <button class="buttonviewproject">
                  {" "}
                  <TrendingUp fontSize="large" htmlColor="#ffffff" />
                  Status
                  <br />
                  <p class="p">evaluate your work</p>
                </button>
              </a>
            </div>
          </div>
        </div>
      )
    }


  }
}
