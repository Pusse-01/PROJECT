import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,  { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#394b5b',
    opacity: 0.8,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));




function createData(name, status, overdue, description, admins, taskstatus) {
  return {
    name,
    status,
    overdue,
    description,
    admins,
    taskstatus,
    history: [
      {
        date: '2020-01-05',
        task: '11091700',
        employee: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        employee: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset', borderwidth: '0px'} }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.overdue}</TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">{row.admins}</TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Project Contributers Stat
              </Typography>
              <Table size="small" aria-label="stats">
                <TableHead>
                  <StyledTableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Task</TableCell>
                    <TableCell align="right">Due date</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.employee}
                      </TableCell>
                      <TableCell>{historyRow.task}</TableCell>
                      <TableCell align="right">{historyRow.date}</TableCell>
                      <TableCell align="right">
                        {historyRow.taskstatus}
                      </TableCell>
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

Row.propTypes = {
  row: PropTypes.shape({
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    overdue: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        task: PropTypes.string.isRequired,
        employee: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    taskstatus: PropTypes.string.isRequired,
    admins: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 'p_status1', '6.0', '24', '4.0', '3.99'),
  createData('Ice cream sandwich', 'p_status2', 'duedate2',' description2', 'admins2', 'price2'),
];

const resources = function readProjectDate(resources){
  axios
    .get("http://localhost:8070/projects")
    .then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        const project = [
          {
            id: response.data[i]._id,
            name: response.data[i].name,
            members: response.data[i].members,
            projectStatus: response.data[i].projectStatus,
            overdue: response.data[i].overdue,
            administrators: response.data[i].administrators,
            discription: response.data[i].discription,
          },
        ];
        resources.push(project[0]);
      }

    })
    .catch(() => {
      this.setState({
        error: true,
      });
    }); 
}




export default class Showprojects extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    projects:resources
  }
}

//will run when component rendered
componentDidMount() {
  //this.getProjecLogs() //getting all the projects details
  console.log(resources[0])
  console.log(this.state.projects[0])
}



//getting table data when state changes
getProjecLogs = () => {
  var resources = [];
  axios
    .get("http://localhost:8070/projects")
    .then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        const project = [
          {
            id: response.data[i]._id,
            name: response.data[i].name,
            members: response.data[i].members,
            projectStatus: response.data[i].projectStatus,
            overdue: response.data[i].overdue,
            administrators: response.data[i].administrators,
            discription: response.data[i].discription,
          },
        ];
        resources.push(project[0]);
      }

      this.setState({
        projects: resources,
      });
      //console.log(resources);
    })
    .catch(() => {
      this.setState({
        error: true,
      });
    });
};



render() {

  const {projects}=this.state

  return(
    <div>
  <TableContainer sx={{
    width: '70%',
  }} component={Paper}>
      <Table aria-label="data table" color="primary" >
        <TableHead>
          <StyledTableRow>
            <StyledTableCell/>
            <StyledTableCell>Project Title</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Due Date</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Admins</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
        
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>

  )
}

}