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

//icons
import BeenhereIcon from "@mui/icons-material/Beenhere";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import PendingIcon from "@mui/icons-material/Pending";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
      projectData: [],
      pageCount: 0,
      MAX_PAGES: 0,
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
      let projectData = response.data;
      this.setState({
        MAX_PAGES: projectData.length - 1,
      });

      for (let i = 0; i < projectData.length; i++) {
        let workingData = [];
        let allTasks = [];

        axios
          .get(
            "http://localhost:8070/dashboard/gettotaltimeofproject/"+projectData[i].name
          ) //until data added
          .then((response) => {
            workingData.push(response.data);

            let ID = { project_id: projectData[i]._id };
            axios
              .post("http://localhost:8070/task/getTasksOfProject", ID)
              .then((response) => {
                let taskData = [];
                taskData = response.data.response;

                for (let z = 0; z < taskData.length; z++) {
                  var taskLog = [];
                  for (var y = 0; y < workingData.length; y++) {
                    if (taskData[z].task_name === workingData[0][y][2]) {
                      taskLog.push(workingData[0][y]);
                    }
                  }
                  let aTask = {
                    taskName: taskData[z].task_name,
                    taskStatus: taskData[z].task_status,
                    taskWorking: taskLog,
                  };
                  allTasks.push(aTask);
                }
              });
            let projectTotalTime = 0;

            for (let j = 0; j < workingData.length; j++) {
              projectTotalTime = projectTotalTime + workingData[0][j][5];
            }

            let Structure = [
              {
                p_totalTime: projectTotalTime,
                p_details: projectData[i],
                t_details: allTasks,
              },
            ];

            GridStructure.push(Structure[0]);

            this.setState({
              gridData: GridStructure,
            });
          });
      }
    });
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
  render() {
    const { gridData, pageCount } = this.state;
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
                marginRight: "100px",
                marginTop: "0px",
                borderBottom: "2px solid black",
              }}
            >
              <h4>hello im search bar</h4>
            </Grid>
            <Grid style={{ marginLeft: "30px", marginTop: "0px" }}>
              <button
                type="submit"
                style={{ marginLeft: "0px", marginTop: "5px" }}
                onClick={this.gridPageChangeNext}
              >
                Next Project
              </button>
              <button
                type="submit"
                style={{ marginLeft: "0px", marginTop: "5px" }}
                onClick={this.gridPageChangePrev}
              >
                Prev Project
              </button>
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
                marginTop: "10px",
                width: "400px",
              }}
            >
              {gridData.length ? (
                <h1
                  style={{
                    color: "#000000",
                    font: "35px Helvetica",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  {" "}
                  {gridData[pageCount].p_details.name}
                </h1>
              ) : (
                <p>No data to show</p>
              )}
            </Grid>
            {gridData.length ? (
              <Grid
                style={{
                  marginLeft: "100px",
                  marginTop: "20px",
                  width: "700px",
                }}
              >
                <p style={{ font: "15px Helvetica", color: "#000000" }}>
                  End Date&ensp; :&emsp;
                  {gridData[pageCount].p_details.overdue} Hrs &emsp;&emsp; Total
                  Time spent&ensp; :&emsp;
                  {gridData[pageCount].p_totalTime} Hrs
                </p>
              </Grid>
            ) : null}

            {gridData.length &&
              gridData[pageCount].p_details.projectStatus === "On going" ? (
              <Grid container>
                <Grid
                  item
                  style={{ backgroundColor: "trasnparent", padding: "0px" }}
                >
                  <Typography
                    variant="h5"
                    style={{
                      marginLeft: "160px",
                      marginRight: "10px",
                      marginBottom: "0px",
                      paddingTop: "0px",
                      color: "#FFFF00",
                    }}
                  >
                    <BeenhereIcon fontSize="small" htmlColor="#000000" />
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{ backgroundColor: "trasnparent", padding: "0px" }}
                >
                  {gridData.length ? (
                    <Typography
                      variant="h7"
                      style={{
                        marginLeft: "0px",
                        font: "5px",
                        marginTop: "0px",
                        color: "#FFFF00",
                      }}
                    >
                      {" "}
                      {gridData[pageCount].p_details.projectStatus}{" "}
                    </Typography>
                  ) : null}{" "}
                </Grid>
              </Grid>
            ) : null}

            {gridData.length &&
              gridData[pageCount].p_details.projectStatus === "Completed" ? (
              <Grid container>
                <Grid
                  item
                  style={{ backgroundColor: "trasnparent", padding: "0px" }}
                >
                  <Typography
                    variant="h5"
                    style={{
                      marginLeft: "160px",
                      marginRight: "10px",
                      marginTop: "0px",
                      padding: "0px",
                      color: "#FFFF00",
                    }}
                  >
                    <AssignmentTurnedInIcon
                      align="top"
                      fontSize="small"
                      htmlColor="#000000"
                    />
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{ backgroundColor: "trasnparent", padding: "0px" }}
                >
                  {gridData.length ? (
                    <Typography
                      variant="h7"
                      style={{
                        marginLeft: "0px",
                        font: "5px",
                        marginTop: "0px",
                        color: "#00FF00",
                      }}
                    >
                      {" "}
                      {gridData[pageCount].p_details.projectStatus}{" "}
                    </Typography>
                  ) : null}{" "}
                </Grid>
              </Grid>
            ) : null}

            {gridData.length &&
              gridData[pageCount].p_details.projectStatus === "Over due" ? (
              <Grid container>
                <Grid
                  item
                  style={{ backgroundColor: "trasnparent", padding: "0px" }}
                >
                  <Typography
                    variant="h5"
                    style={{
                      marginLeft: "160px",
                      marginRight: "10px",
                      marginTop: "0px",
                      padding: "0px",
                      color: "#FFFF00",
                    }}
                  >
                    <MoreTimeIcon
                      align="top"
                      fontSize="small"
                      htmlColor="#000000"
                    />
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{ backgroundColor: "trasnparent", padding: "0px" }}
                >
                  {gridData.length ? (
                    <Typography
                      variant="h7"
                      style={{
                        marginLeft: "0px",
                        font: "5px",
                        marginTop: "0px",
                        color: "#FF0000",
                      }}
                    >
                      {" "}
                      {gridData[pageCount].p_details.projectStatus}{" "}
                    </Typography>
                  ) : null}{" "}
                </Grid>
              </Grid>
            ) : null}

            {gridData.length &&
              (gridData[pageCount].p_details.projectStatus === "Pending" ||
                gridData[pageCount].p_details.projectStatus === "Not Started") ? (
              <Grid container>
                <Grid
                  item
                  style={{ backgroundColor: "trasnparent", padding: "0px" }}
                >
                  <Typography
                    variant="h5"
                    style={{
                      marginLeft: "160px",
                      marginRight: "10px",
                      marginTop: "0px",
                      padding: "0px",
                      color: "#FFFF00",
                    }}
                  >
                    <PendingIcon
                      align="top"
                      fontSize="small"
                      htmlColor="#000000"
                    />
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{ backgroundColor: "trasnparent", padding: "0px" }}
                >
                  {gridData.length ? (
                    <Typography
                      variant="h7"
                      style={{
                        marginLeft: "0px",
                        font: "5px",
                        marginTop: "0px",
                        color: "#00FFFF",
                      }}
                    >
                      {" "}
                      {gridData[pageCount].p_details.projectStatus}{" "}
                    </Typography>
                  ) : null}{" "}
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Box>
        <Box>
          <Grid
            item
            style={{
              backgroundColor: "trasnparent",
              padding: "0px",
              marginTop: "25px",
            }}
          >
            {gridData.length ? (
              <Grid container item>
                <Grid>
                  <p row style={{ color: "black", fontSize: '15PX' }}>Project Description : <span row style={{ color: "black", fontSize: '10PX' }}>
                    {gridData[pageCount].p_details.discription}
                  </span>{" "}</p>
                  : null
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Box>
        <Box>
          <Grid
            item
            style={{
              backgroundColor: "trasnparent",
              padding: "0px",
              marginTop: "0px",
            }}
          >
            {gridData.length ? (
              <Grid container item >
                <Grid >
                  {gridData[pageCount].t_details.length ?
                    <Paper style={{ marginLeft: '40px' }}>
                      <TableContainer sx={{ maxHeight: 580 }}>
                        {gridData[pageCount].t_details.map((tasks, index) => (
                          <Table>
                            <TableHead  >
                              <StyledTableRow style={{ border: 'none' }}>
                                <TableCell style={{ border: 'none', color: 'white' }}>Task Name :</TableCell>
                                <TableCell style={{ border: 'none' }} colSpan={2} align='left'>{gridData[pageCount].t_details[index].taskName}</TableCell>
                                <TableCell style={{ border: 'none', color: 'white' }}>Task Status :</TableCell>
                                <TableCell style={{ border: 'none' }} colSpan={2} >{gridData[pageCount].t_details[index].taskStatus}</TableCell>
                                <TableCell style={{ border: 'none' }}><button style={{ backgroundColor: 'transparent', border: 'none' }}>< DeleteForeverIcon /></button></TableCell>

                              </StyledTableRow>
                            </TableHead  >
                            <StyledTableRow style={{ border: 'none' }}>
                              <TableCell style={{ border: 'none', color: 'white' }}>Task Name :</TableCell>
                              <TableCell style={{ border: 'none', color: 'white' }}>Task Name :</TableCell>
                            </StyledTableRow>
                            {gridData[pageCount].t_details[index].taskWorking.map((taskwork, indextask) => (
                              <StyledTableRow>
                                <TableCell style={{ border: 'none', color: 'white' }}>{taskwork[indextask]}</TableCell>

                              </StyledTableRow>
                            ))}



                          </Table>
                        ))}
                      </TableContainer>
                    </Paper> : null
                  }
                  : null
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Box>
      </div>
    );
  }
}
