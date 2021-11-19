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
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material/styles";
import axios from "axios";
import './showprojectStyles.css'
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Visibility from '@material-ui/icons/Visibility';
import TrendingUp from '@material-ui/icons/TrendingUp';
import { InputBase } from "@material-ui/core";


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
    backgroundColor: "#000000",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    width: '40px',
    border: 0,
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
      openProject: '',
      open: false,
    };
  }

  componentDidMount() {

  }

  setOpen = (event) => {
    if (this.state.open) {
      this.setState({ open: false });
    } else if (!this.state.open) {
      this.setState({ open: true, openProject: this.state.row.name });
    }
  };

  setProjectdelete = (event) => {
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


  DeleteProject = (event) => {
    console.log('edit' + event.target.value)
    console.log(this.state.openProject)
    //delete project

    //code

  }
  //          <TableCell align="left"  onClick={this.DeleteProject}><button type="submit" value={'delete button'}>Delete</button></TableCell>
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
          <TableCell align="left">{row.status}</TableCell>
          <TableCell align="left">{row.overdue}</TableCell>
          <TableCell align="left" maxwidth="150px" >{row.description}</TableCell>
          <TableCell align="left">
            {row.admins.map((adminsname, index) => (

              <TableRow>
                <StyledTableCell align="left" border="none">{index + 1}.</StyledTableCell>
                <StyledTableCell align="left" border="none"> {adminsname}</StyledTableCell>
              </TableRow>

            ))}
          </TableCell>
        </StyledTableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1, backgroundColor: "#394b5b", borderRadius: "5px" }}>
                <Typography row variant="h6" gutterBottom component="div">
                  Task Stats        <button type="submit" class="buttondelete" onClick={this.DeleteProject}>Delete Project</button>
                </Typography>
                <Table size="small" aria-label="stat">
                  <TableHead>
                    <TableRow>

                      <TableCell>Task</TableCell>
                      <TableCell align="left">Due Date</TableCell>
                      <TableCell align="left">Status</TableCell>
                      <TableCell align="left">Contributers</TableCell>
                      <TableCell align="left"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody >
                    {row.history.length === 0 ? <div>No tasks have assigned
                      <StyledTableCell><a href="http://localhost:3000/createtask"><button class="buttonsubmitactionaddtask">Add Task</button></a></StyledTableCell>
                    </div>
                    
                    : null}
                    {row.history.map((historyRow, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {historyRow.task}
                        </TableCell>
                        <TableCell align="left">{historyRow.date}</TableCell>
                        <TableCell align="left">{historyRow.taskstat}</TableCell>
                        <TableCell align="left">
                          {historyRow.employee.map((data, index) => (
                            <Box sx={{ margin: 1 }}>
                              <TableRow>
                                <StyledTableCell align="left" border="none">{index + 1}.</StyledTableCell>
                                <StyledTableCell align="left" border="none"> {data}</StyledTableCell>
                              </TableRow>
                            </Box>
                          ))}
                        </TableCell>
                        <TableCell align="left"><Box><button class="buttonsubmitaction" type="submit" value={index} onClick={this.setProjectdelete}>Delete</button>
                       </Box> </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                    {row.history.length !== 0 ?
                    <StyledTableCell><a href="http://localhost:3000/createtask"><button class="buttonsubmitactionnewtask">New Task</button></a></StyledTableCell>:null
                    
                  }
                    </TableRow>
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
    admins: PropTypes.arrayOf(
      PropTypes.shape({
        adminsname: PropTypes.string.isRequired,
      })
    )
  }).isRequired,
};



export default class Showprojects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      filterdresult: []
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
              admins: resources[i].administrators,
              history: historyArray
            },
          ];
          tempArray.push(projectDetails[0])
          console.log(tempArray);
          console.log('end');
        }

        this.setState({
          rows: tempArray,
          filterdresult: tempArray
        })

      })
      .catch(() => {
        //alert("error");
      });
  };

  filterProjects = (event) => {
    var value = event.target.value;
    console.log(event.target.value)
    console.log('fired')

    this.setState({
      filterdresult: this.state.rows
    })
    var copyArray = []
    for (var i = 0; i < this.state.rows.length; i++) {
      if (((this.state.rows[i].name).toLowerCase()).includes(value.toLowerCase()) || value === '') {
        console.log('inside ' + value)
        console.log('inside va ' + this.state.rows[i].name)
        copyArray.push(this.state.rows[i]);
      }
    }
    this.setState({
      filterdresult: copyArray
    })

  }




  mouseClick = (index) => {
    console.log(index)
  }

  render() {

    const { filterdresult } = this.state

    return (
      <div>
        <div>
          <Box class="serachbar">
            <SearchIcon
              fontSize="large"
              htmlColor="#ffffff"
            />
            <InputBase placeholder="Search....." onChange={this.filterProjects} ></InputBase>
          </Box>
        </div>
        <Paper class='PAPER' >
          <TableContainer
            sx={{ maxHeight: 580, left: '110' }}
          >
            <Table stickyHeader aria-label="collapsible table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell />
                  <StyledTableCell>Project Title</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  <StyledTableCell align="left">Due Date</StyledTableCell>
                  <StyledTableCell align="left" >Description</StyledTableCell>
                  <StyledTableCell align="left">Admins</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {filterdresult.map((row, index) => {
                  return (
                    (
                      <Row key={row.name} row={row} ></Row>
                    )
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <div>
          <div class="bodyappear3viewproject">
            <a href="http://localhost:3000/createproject">
              <button class="buttonviewproject"><AddCircleOutlineOutlinedIcon
                fontSize="large"
                htmlColor="#ffffff"
              />Create Project<br /><p class="p">create your new project</p></button>
            </a>
          </div>
          <div class="bodyappear4viewproject">
            <a href="www.google.com">
              <button class="buttonviewproject"> < Visibility
                fontSize="large"
                htmlColor="#ffffff"
              />Show taskboard<br /><p class="p">view a summary of assign task</p></button>
            </a>
          </div>
          <div class="bodyappear5viewproject">
            <a href="www.google.com">
              <button class="buttonviewproject"> <TrendingUp
                fontSize="large"
                htmlColor="#ffffff"
              />Status<br /><p class="p">evaluate your work</p></button>
            </a>
          </div>
        </div>

      </div>
    );
  }
}







