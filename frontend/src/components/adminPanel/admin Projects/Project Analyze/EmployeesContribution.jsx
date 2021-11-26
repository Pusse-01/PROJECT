import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import axios from "axios";
//Table
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

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

export default class AnalyzeProjectEmployees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      length: 0,
    };
  }

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees() {
    let tasksemployee = [];
    axios
      .get("http://localhost:8070/employee/allEmployees")
      .then((response) => {
        let employeeData = response.data;
        this.setState({
          length: employeeData.length,
        });
        for (let i = 0; i < employeeData.length; i++) {
          let Post = { assigned_to: employeeData[i]._id };
          axios
            .post("http://localhost:8070/task/getTaskByAssignedTo", Post)
            .then((response) => {
              let Inprogress = 0;
              let ToDo = 0;
              let Done = 0;
              let Bugs = 0;
              let Review = 0;
              let due = false;
              let taskData = response.data.response;
              for (let j = 0; j < taskData.length; j++) {
                switch (taskData[j].task_status) {
                  case "Done":
                    Done++;
                    break;
                  case "Bugs/Issues":
                    Bugs++;
                    break;
                  case "In Progress":
                    Inprogress++;
                    break;
                  case "To Do":
                    ToDo++;
                    break;
                  case "Review":
                    Review++;
                    break;
                  default:
                    console.log("error");
                }
                if (new Date(taskData[j].due_date) < Date.now()) {
                  due = true
                }
              }
              let DonePer = 0;
              let BugsPer = 0;
              let InprogressPer = 0;
              let ToDoPer = 0;
              let ReviewPer = 0;
              let yAxis = [Bugs, Inprogress, Done, ToDo, Review];
              let Total = yAxis[0] + yAxis[1] + yAxis[3] + yAxis[4] + yAxis[2];
              if (Total !== 0) {
                DonePer = (yAxis[2] / Total) * 100;
                BugsPer = (yAxis[0] / Total) * 100;
                InprogressPer = (yAxis[1] / Total) * 100;
                ToDoPer = (yAxis[3] / Total) * 100;
                ReviewPer = (yAxis[4] / Total) * 100;
              }
              let Status = "";
              let note = '';
              if ((yAxis[0] + yAxis[3] < yAxis[2] + yAxis[4] + yAxis[1]) && (!due || yAxis[2])) {
                Status = "Good";
                note ='No due work, not many bugs/issues and Todos.'
              } else if ((yAxis[0] + yAxis[1] + yAxis[3] === yAxis[2] + yAxis[4]) && !due) {
                Status = "Neutral";
                note ='No due work,May have some Bugs/Issues and Todos.'
              } else if(due) {
                Status = "Bad";
                note ='Have due work'
              }else{
                Status = "Bad";
                note ='Have many To dos and Bugs/Issues.'
              }

              let personTask = [
                {
                  name: employeeData[i].name,
                  status: Status,
                  note: note,
                  DonePer: DonePer,
                  BugsPe: BugsPer,
                  InprogressPer: InprogressPer,
                  ToDoPer: ToDoPer,
                  ReviewPer: ReviewPer,
                },
              ];
              tasksemployee.push(personTask[0]);
              if (this.state.length - 1 === i) {
                this.setState({
                  data: tasksemployee,
                });
              }
            });
        }
      });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Paper style={{ marginLeft: "2%", marginRight: "0%" }}>
          <TableContainer sx={{ maxHeight: 580 }}>
            {data.length ? (
              <div>
                {data.map((employee, index) => (
                  <Table style={{ backgroundColor: "#525252" }}>
                    <StyledTableRow style={{ border: "none" }}>
                      <TableCell 
                        style={{
                          border: "none",
                          color: "black",
                          fontSize: "18px",
  
                        }}
                      >
                        Employee Name :  {employee.name}
                      </TableCell>
                    </StyledTableRow>
                    <StyledTableRow style={{ border: "none" }}>
                      <StyledTableRow>
                        <TableCell style={{width: "20%"}}>
                          Emplyee Performance Status
                        </TableCell>
                        <TableCell>To Do</TableCell>
                        <TableCell>Done</TableCell>
                        <TableCell>In Progress</TableCell>
                        <TableCell>Bugs/Issues</TableCell>
                        <TableCell>Review</TableCell>
                        <TableCell colSpan={2}>Note</TableCell>
                        <TableCell colSpan={1}></TableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <TableCell style={{width: "100px"}} align="left" >{employee.status}</TableCell>
                        <TableCell  style={{width: "100px"}} align="left">{((employee.ToDoPer).toString()).substring(0, 5)}%</TableCell>
                        <TableCell  style={{width: "100px"}} align="left">{((employee.DonePer).toString()).substring(0, 5)}%</TableCell>
                        <TableCell  style={{width: "120px"}} align="left">{((employee.InprogressPer).toString()).substring(0, 5)}%</TableCell>
                        <TableCell  style={{width: "100px"}} align="left">{((employee.BugsPe).toString()).substring(0, 5)}%</TableCell>
                        <TableCell  style={{width: "100px"}} align="left">{((employee.ReviewPer).toString()).substring(0, 5)}%</TableCell>
                        <TableCell colSpan={2}  style={{width: "350px"}} align="left">{((employee.note).toString()).substring(0, 60)}</TableCell>
                      </StyledTableRow>
                    </StyledTableRow>
                  </Table>
                ))}
              </div>
            ) : (
              <div>
                <h1>No data</h1>
              </div>
            )}
          </TableContainer>
          <Grid>
            <Box
              style={{
                backgroundColor: "#a99a86",
                width: "100%",
                textAlign: "center",
              }}
            >
              End of Rows
            </Box>
          </Grid>
        </Paper>
      </div>
    );
  }
}
