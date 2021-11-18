import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material/styles";
import axios from "axios";
import './showprojectStyles.css'
import { borderRadius } from "@mui/system";


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
    backgroundColor: "#394b5b",
    opacity: 0.8,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    width: '40px',
    border: 0
  },
}));
/*
const cellStyle ={
  display: "block",
  width: "200px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
};
*/


class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: this.props.row,
      key: this.props.index,
      openProject: '',
      open: false,
    };
  }

  componentDidMount() {

  }


  //        <div>                        {open?<button onClick={this.getproject(row.name)}>hello</button>:null}</div>
  setOpen = (event) => {
    if (this.state.open) {
      this.setState({ open: false });
    } else if (!this.state.open) {
      this.setState({ open: true, openProject: this.state.row.name });
    }
  };

  setProjectdelete = (event) => {
    console.log(event.target.value)
    console.log(this.state.openProject)
    console.log(this.state.row.history[event.target.value].task_id)
    axios.post('http://localhost:8070/task/deleteTask', { task_id: this.state.row.history[event.target.value].task_id })
      .then((response) => {
        console.log(response.data)
        window.location.reload(false);
      })
  }
  setProjectedit = (event) => {
    console.log('edit' + event.target.value)
    console.log(this.state.openProject)
    //console.log(this.state.row.history)

  }

  render() {
    const { row, open } = this.state;

    return (
      <React.Fragment>
        <StyledTableRow
          sx={{ "& > *": { borderBottom: "unset", border: "0px" } }} value={row.name}
        >
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={this.setOpen}
              value={row.name}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.status}</TableCell>
          <TableCell align="right">{row.overdue}</TableCell>
          <TableCell align="right" maxwidth="150px" >{row.description}</TableCell>
          <TableCell align="right">{row.admins}</TableCell>
        </StyledTableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1, backgroundColor:"#394b5b", borderRadius:"5px" }}>
                <Typography variant="h6" gutterBottom component="div">
                  Task Stats
                </Typography>
                <Table size="small" aria-label="stat">
                  <TableHead>
                    <TableRow>

                      <TableCell>Task</TableCell>
                      <TableCell align="right">Due Date</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Contributers</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody >
                    {row.history.length === 0 ? <div>No tasks have assigned</div> : null}
                    {row.history.map((historyRow, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {historyRow.task}
                        </TableCell>
                        <TableCell align="right">{historyRow.date}</TableCell>
                        <TableCell align="right">{historyRow.taskstat}</TableCell>
                        <TableCell align="right">
                          {historyRow.employee.map((data, index) => (
                            <Box sx={{ margin: 1 }}>
                              <TableRow>
                              <StyledTableCell align="right" border="none"></StyledTableCell>
                              <StyledTableCell align="right" border="none"></StyledTableCell>
                              <StyledTableCell align="right" border="none"></StyledTableCell>
                              <StyledTableCell align="right" border="none"></StyledTableCell>
                              <StyledTableCell align="right" border="none"></StyledTableCell>

                                <StyledTableCell align="right" border="none">{index + 1}.</StyledTableCell>
                                <StyledTableCell align="left" border="none"> {data}</StyledTableCell>
                              </TableRow>
                            </Box>
                          ))}
                        </TableCell>
                        <TableCell align="right"><button class="buttonsubmitaction" type="submit" value={index} onClick={this.setProjectdelete}>Delete</button>
                          <a href="http://localhost:3000/createtask"><button class="buttonsubmitaction" value={index}>New</button></a></TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

Row.propTypes = {
  row: PropTypes.shape({
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    overdue: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        task: PropTypes.string.isRequired,
        employee: PropTypes.arrayOf(
          PropTypes.shape({
            ename: PropTypes.string.isRequired,
          })
        ),
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    taskstatus: PropTypes.string.isRequired,
    admins: PropTypes.string.isRequired,
  }).isRequired,
};



export default class Showprojects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }


  componentDidMount() {
    this.getProjectstoRender()
  }

  getProjectstoRender = () => {
    let resources = [];
    let tempArray = [];

    axios
      .get("http://localhost:8070/projects")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          //response.data.length
          const project = [
            {
              id: response.data[i]._id,
              name: response.data[i].name,
              members: response.data[i].members,
              projectStatus: response.data[i].projectStatus,
              overdue: ((response.data[i].overdue).toString()).substring(0, 10),
              administrators: response.data[i].administrators,
              discription: (response.data[i].discription).substring(0, 50),
            },
          ];
          resources.push(project[0]);
        }

        for (let i = 0; i < resources.length; i++) {


          let historyArray = [];
          console.log('length' + resources.length)
          axios
            .post("http://localhost:8070/task/getTasksOfProject", {
              project_id: resources[i].id,
            })
            .then((response) => {
              // console.log("resonse data " + response.data.response.length);

              if (response.data.response.length > 0) {

                for (let k = 0; k < response.data.response.length; k++) {
                  console.log('length of projects tasks' + response.data.response.length)

                  var data = response.data.response[k];

                  if (data.assigned_to.length > 0) {
                    console.log(data.assigned_to.length);

                    var employeelist = []
                    for (var z = 0; z < data.assigned_to.length; z++) {
                      var name = data.assigned_to[z]
                      employeelist.push(name)
                    }


                    //taskstatus.push(data.task_status)
                    var history = [
                      {
                        date: ((data.due_date).toString()).substring(0, 10),
                        task: data.task_name,
                        employee: employeelist,
                        taskstat: data.task_status,
                        task_id: data._id
                      },
                    ];
                    historyArray.push(history[0]);
                  }
                }

              } //end of if
            });
          var projectDetails = [
            {
              name: resources[i].name,
              status: resources[i].projectStatus,
              overdue: resources[i].overdue,
              description: resources[i].discription,
              admins: resources[i].administrators[0],
              history: historyArray
            },
          ];
          tempArray.push(projectDetails[0])
          console.log(tempArray);
          console.log('end');
        }

        this.setState({
          rows: tempArray
        })

      })
      .catch(() => {
        //alert("error");
      });
  };



  mouseClick = (index) => {
    console.log(index)
  }

  render() {

    const { rows } = this.state

    return (
      <div>
        <TableContainer
          component={Paper}
          sx={{
            width: "80%",
            color: "success.main",
            position:"absolute",
            left:"40px"
          }}
        >
          <Table aria-label="collapsible table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell />
                <StyledTableCell>Project Title</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Due Date</StyledTableCell>
                <StyledTableCell align="right" >Description</StyledTableCell>
                <StyledTableCell align="right">Admins</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                return (
                  (
                    <Row key={index} row={row} ></Row>
                  )
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}








const wrows = [
  {
    name: "project",
    status: "status",
    projectoverdue: "--",
    description: "ooo",
    admins: "admin",
    taskstatus: "task status",
    history: [
      {
        date: "2020-01-05",
        task: "11091700",
        employee: 3,
      },
      {
        date: "2020-01-02",
        task: "Anonymous",
        employee: 1,
      },
    ],
  },
];
