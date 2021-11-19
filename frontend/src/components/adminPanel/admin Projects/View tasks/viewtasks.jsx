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
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Visibility from '@material-ui/icons/Visibility';
import TrendingUp from '@material-ui/icons/TrendingUp';
import { InputBase } from "@material-ui/core";


export default class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return(
            <div>
                <h1>heelo</h1>
            </div>
        )
    }
}

/*
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
      border: 0,
    },
  }));
class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            row: this.props.row,
            openProject: '',
            open: false,
        }
    }

    setOpen = (event) => {
        if (this.state.open) {
          this.setState({ open: false });
        } else if (!this.state.open) {
          this.setState({ open: true, openProject: this.state.row.name });
        }
      };

    render () {

const {row, open} = this.state

        return(
            <div>
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
                  Task Stats        <button  type="submit" class="buttondelete" onClick={this.DeleteProject}>Delete Project</button>
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
                    {row.history.length === 0 ? <div>No tasks have assigned</div> : null}
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
                        <TableCell align="left"><button class="buttonsubmitaction" type="submit" value={index} onClick={this.setProjectdelete}>Delete</button>
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
            </div>
        )
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
  



export default class Viewtasks extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        tasks: []
    }
}

componentDidMount() {
    this.getalltasks()
}

getalltasks (){
    axios.get('http://localhost:8070/task')
    .then((response) => {
        console.log(response.data.response)
        this.setState({
            tasks: response.data.response
        })
        console.log(this.state.tasks)
    }).catch((error) => {
        console.log(error)
    })
    }




render() {

    const {tasks} = this.state
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
  
          <TableContainer
            component={Paper}
            sx={{
              width: "80%",
              position: "absolute",
              left: "50px",
              top: "120px",
            }}
          >
            <Table aria-label="collapsible table"
              sx={{
                "& .MuiTableRow-root:hover": {
                  backgroundColor: "#4b5465",
                  opacity: 0.9
                }
              }}>
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
                {tasks.map((row, index) => {
                  return (
                    (
                      <Row key={row.name} row={row} ></Row>
                    )
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
  
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

*/