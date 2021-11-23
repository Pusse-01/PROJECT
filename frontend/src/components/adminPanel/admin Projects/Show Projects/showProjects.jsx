import React from "react";
import "./showprojectStyles.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
//Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { InputBase } from "@material-ui/core";

//icons
import BeenhereIcon from "@mui/icons-material/Beenhere";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import PendingIcon from "@mui/icons-material/Pending";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    border: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    color: "#ff0000",
  },
}));


//Data Grid columns format
const columns = [
  {
    field: "id",
    headerName: "Task ID",
    width: 200,
    hide: true,
  },
  {
    field: "taskName",
    headerName: "Task Name",
    width: 150,
    editable: true,
  },
  {
    field: "firstName",
    headerName: "Task Name",
    width: 150,
    editable: true,
  },
];

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

  getalltasks() {
    // axios.get('http://localhost:8070/task')
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
          searchPage =i;
      }
    }
    this.setState({
      pageCount:searchPage
    });
  };



  render() {
    const { gridData, pageCount, loading } = this.state;

    if (!loading) {
      return (
        <div>
          <Box style={{ backgroundColor: "#525252" }}>
            <Grid container>
              <Grid
                item
                style={{
                  backgroundColor: "#525252",
                  padding: "0px",
                  marginLeft: "50%",
                  width: "300px",
                  marginRight: "80px",
                  marginTop: "0px",
                  marginBottom: "10px",
                  borderBottom: "2px solid black",
                }}
              >
                <Box>
            <SearchIcon fontSize="large" htmlColor="#ffffff" />
            <InputBase
              sx={{ htmlcolor: "white" }}
              placeholder="Search for project name....."
              onChange={this.filterProjects}
            ></InputBase>
          </Box>
              </Grid>
              <Grid style={{ marginLeft: "10px", marginTop: "0px" }}>
              <button
                  type="submit"
                  style={{ marginLeft: "0px", marginTop: "5px" }}
                  onClick={this.gridPageChangePrev}
                >
                  Prev Project
                </button>
               <button
                  type="submit"
                  style={{ marginLeft: "0px", marginTop: "5px" }}
                  onClick={this.gridPageChangeNext}
                >
                  Next Project
                </button>
                <br/>
                Page {pageCount+1} of {gridData.length}
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
                  marginBottom: "10px",
                  width: "400px",
                }}
              >
                <h1
                  style={{
                    color: "#000000",
                    font: "35px Helvetica",
                    textAlign: "center",
                    marginTop: "10px",
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
                      <BeenhereIcon fontSize="small" htmlColor="#000000" />
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
                      <BeenhereIcon fontSize="small" htmlColor="#000000" />
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
                      <BeenhereIcon fontSize="small" htmlColor="#000000" />
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
              <Grid
                style={{
                  marginLeft: "100px",
                  marginTop: "20px",
                  width: "700px",
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
              <Grid>
                <p row style={{ color: "black", fontSize: '15PX' }}>Project Description : <span row style={{ color: "black", fontSize: '10PX' }}>
                  {gridData[pageCount].p_details.discription}
                </span>{" "}</p>
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

              <Paper style={{ marginLeft: '40px',marginRight: '100px' }}>
                <TableContainer sx={{ maxHeight: 580 }}>
                  {gridData[pageCount].t_details.map((tasks, index) => (
                    <Table>
                      <TableHead  >
                        <StyledTableRow style={{ border: 'none' }}>
                          <TableCell style={{ border: 'none', color: 'white' }}>Task Name :</TableCell>
                          <TableCell style={{ border: 'none' }}align='left'>{tasks.taskName}</TableCell>
                          <TableCell style={{ border: 'none', color: 'white' }}>Task Status :</TableCell>
                          <TableCell style={{ border: 'none' }} colSpan={2} >{tasks.taskStatus}</TableCell>
                          <TableCell style={{ border: 'none', color: 'white' }}>Task Time :</TableCell>
                          <TableCell style={{ border: 'none' }}>{tasks.tasktime.hrs} Hrs {tasks.tasktime.mins} Mins {tasks.tasktime.secs} Secs</TableCell>
                          <TableCell style={{ border: 'none' }}><button style={{ backgroundColor: 'transparent', border: 'none' }}>< DeleteForeverIcon /></button></TableCell>

                        </StyledTableRow>
                      </TableHead  >
                      <StyledTableRow style={{ border: 'none' }}>
                        <TableCell style={{ border: 'none', color: 'white' }}>Employee Name :</TableCell>
                        <TableCell style={{ border: 'none', color: 'white' }}>Task Start Time :</TableCell>
                        <TableCell style={{ border: 'none', color: 'white' }}>Task End Time :</TableCell>
                        <TableCell style={{ border: 'none', color: 'white' }}>Total Time :</TableCell>
                      </StyledTableRow>
                      {tasks.taskWorking.map((taskwork, indextask) => (
                        <StyledTableRow>
                          <TableCell style={{ border: 'none', color: 'white' }}>{taskwork[0]}</TableCell>
                          <TableCell style={{ border: 'none', color: 'white' }}>{taskwork[3]}</TableCell>
                          <TableCell style={{ border: 'none', color: 'white' }}>{taskwork[4]}</TableCell>
                          <TableCell style={{ border: 'none', color: 'white' }}>{taskwork[5]}</TableCell>

                        </StyledTableRow>
                      ))}



                    </Table>
                  ))}
                </TableContainer>
              </Paper>


            </Grid>
          </Box>
        </div>
      );
    }
    else {
      return (
        <div>loading....</div>
      )
    }


  }
}
