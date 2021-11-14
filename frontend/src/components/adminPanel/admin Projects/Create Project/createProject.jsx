import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  Box,
  FormControlLabel,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import "./createproject.css";
import "../loadingPage.css";
import axios from "axios";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Redirect } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const paperStyle = {
  padding: "50px 20px",
  width: "600px",
  margin: "20px auto",
};
const avatarStyle = {
  backgroundColor: "blue",
};

const names = [
  { username: "Oliver Hansen" },
  { username: "Van Henry" },
  { username: "April Tucker" },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class Createproject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: names,

      projectname: "",
      adminstrsselected: [],
      employeesselected: [],
      description: "",
      datenow: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      selectedEmployees: [],
      selectedManagers: [],
      category: "Task-Assigned",
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    document.title = "PROJECT Projects";
    this.interval = setInterval(
      () =>
        this.setState(() => {
          if (navigator.onLine) {
            this.setState({
              loading: false,
            });
          }else{
            this.setState({
              loading: true,
            });
          }
        }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setProjectname = (event) => {
    console.log(event.target.value);
    this.setState({
      projectname: event.target.value,
    });
  };

  setProjectdescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  setSelected = (event) => {
    var employeeName = [{ name: event.target.value }];
    this.state.selectedEmployees.push(employeeName[0]);
    var temp = [];
    var j = 0;
    for (var i = 0; i < this.state.employees.length; i++) {
      if (!(this.state.employees[i].username === employeeName[0].name)) {
        temp[j++] = this.state.employees[i];
      }
    }
    this.setState({
      employees: temp,
    });
  };

  setSelectedManagers = (event) => {
    var employeeName = [{ name: event.target.value }];
    this.state.selectedManagers.push(employeeName[0]);
    var temp1 = [];
    var j = 0;
    for (var i = 0; i < this.state.employees.length; i++) {
      if (!(this.state.employees[i].username === employeeName[0].name)) {
        temp1[j++] = this.state.employees[i];
      }
    }
    this.setState({
      employees: temp1,
    });
  };

  handleClear = (event) => {
    return;
  };

  renderRedirect = () => {
    return <Redirect to="http://localhost:3000" />;
  };

  handleClick = (event) => {
    for (var i = 0; i < this.state.selectedEmployees.length; i++) {
      this.state.employeesselected.push(this.state.selectedEmployees[i].name);
    }

    for (var j = 0; j < this.state.selectedManagers.length; j++) {
      this.state.adminstrsselected.push(
        this.state.selectedManagers[j].name
      );
    }

    if (
      this.state.projectname === "" ||
      this.state.description === "" ||
      this.state.selectedManagers.length === 0 ||
      this.state.selectedEmployees.length === 0 ||
      this.state.category === "" ||
      this.state.endDate === null
    ) {
      this.setState({
        error: true,
      });
    } else {
      console.log(this.state.employeesselected);
      var temp_project = {
        name: this.state.projectname,
        members: this.state.employeesselected,
        projectStatus: this.state.category,
        overdue: Date.now(),
        administrators: this.state.adminstrsselected,
        discription: this.state.description,
        notes: "",
      };
      axios.post("http://localhost:8070/projects", temp_project);
      console.log("created");
    }
  };

  setstartDate = (date) => {
    this.setState({
      startDate: date,
    });
    console.log(date);
  };

  setendDate = (date) => {
    this.setState({
      endDate: date,
    });
  };

  setCategory = (event) => {
    this.setState({ category: event.target.value });
  };


getEmployees(){
  
}




  render() {



    if (this.state.loading) {
      return (
        <div>
            <div class="ring1">
          Loading
          <span class="span1"></span>
        </div>
          <div>
         
            <button class="loadingbutton">
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
            <span class="span1"></span>
          </div>
          <div>
            <a href="http://localhost:3000/createproject">
              <button class="loadingbutton">
                {" "}
                Invalid, Please Fill all the details.
              </button>
            </a>
          </div>
        </div>
      );
    } 



    const { selectedEmployees, employees, selectedManagers, category } =
      this.state;

    return (
      <form>
        <div>
          <Grid>
            <Paper elevation={20} style={paperStyle}>
              <Grid align="left">
                <div>
                  <Avatar style={avatarStyle}>
                    <AddCircleOutlineOutlinedIcon
                      fontSize="large"
                      htmlColor="#ffffff"
                    />
                  </Avatar>
                </div>

                <h1>Create project</h1>
                <Typography variant="caption">
                  <p>Please fill this from to create a project</p>
                </Typography>
              </Grid>

              <TextField
                fullWidth
                label="Project Name"
                onChange={this.setProjectname}
              ></TextField>

              <RadioGroup value={category} onChange={this.setCategory}>
                <FormControlLabel
                  value="Task-Assigned"
                  control={<Radio />}
                  label="Assign"
                />
                <FormControlLabel
                  value="Task-Overdue"
                  control={<Radio />}
                  label="Overdue"
                />
                <FormControlLabel
                  value="Task-Completed"
                  control={<Radio />}
                  label="Complete"
                />
              </RadioGroup>
              <FormControl fullWidth label="" minWidth="300px">
                <InputLabel>Project Contributers</InputLabel>
                <Select MenuProps={MenuProps} onChange={this.setSelected}>
                  {employees.map((name, index) => (
                    <MenuItem key={index} value={name.username}>
                      {name.username}
                    </MenuItem>
                  ))}
                </Select>
                {selectedEmployees.map((selectedm, number) => (
                  <Chip
                    size="sizeSmall"
                    key={number}
                    label={selectedm.name}
                  ></Chip>
                ))}
              </FormControl>

              <FormControl fullWidth label="" minWidth="300px">
                <InputLabel>Project Managers</InputLabel>
                <Select
                  MenuProps={MenuProps}
                  onChange={this.setSelectedManagers}
                >
                  {employees.map((name, index) => (
                    <MenuItem key={index} value={name.username}>
                      {name.username}
                    </MenuItem>
                  ))}
                </Select>
                {selectedManagers.map((selected, number) => (
                  <Chip
                    size="sizeSmall"
                    key={number}
                    label={selected.name}
                  ></Chip>
                ))}
              </FormControl>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  variant="inline"
                  inputVarient="outlined"
                  label="End Date"
                  value={this.state.endDate}
                  formate="MM/dd/yyy"
                  onChange={this.setendDate}
                ></KeyboardDatePicker>
              </MuiPickersUtilsProvider>

              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    fullWidth
                    label="Project Description"
                    id="outlined-multiline-flexible"
                    multiline
                    maxRows={4}
                    onChange={this.setProjectdescription}
                  />
                </div>
              </Box>
              <div>
                <button
                  class="buttonsubmit"
                  type="submit"
                  varient="contained"
                  color="primary"
                  onClick={this.handleClick}
                >
                  Submit and Create{" "}
                </button>
              </div>
              <button
                class="buttonsubmitclear"
                type="submit"
                varient="contained"
                color="primary"
                onClick={this.handleClear}
              >
                C L E A R{" "}
              </button>
              <button class="closebuttonactual" onClick={this.renderRedirect}>
                C L O S E{" "}
              </button>
            </Paper>
          </Grid>
        </div>
      </form>
    );
  }
}

export default Createproject;
/*******************************

 */
