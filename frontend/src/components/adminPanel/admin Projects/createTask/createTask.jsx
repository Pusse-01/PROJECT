import React from "react"; // react enviroment
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Box,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";

//style class
import "../loadingPage.css";
import "./createtask.css";

//style classes
const paperStyle = {
  padding: "50px 20px",
  width: "700px",
  margin: "20px auto",
  backgroundColor: "#1e272e",
};
const avatarStyle = {
  backgroundColor: "black",
};
const radioStyle = {
  backgroundColor: "#1e272e",
};

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

//dummy data const
const project = [
  {
    name: "Project1111",
    members: ["ryan.pusse@gmail.com"],
    projectStatus: "Over due",
    overdue: new Date(),
    administrators: ["Pusse"],
    discription: "First Project",
  },
  {
    name: "Project2222",
    members: ["malakarodrigo@gmail.com", "en93824@sjp.ac.lk"],
    projectStatus: "Over due",
    overdue: new Date(),
    administrators: ["Malaka"],
    discription: "Second Project",
  },
];

const selectedproject = [
  {
    name: "Project1111Selected",
    members: ["ryan.pusse@gmail.com"],
    projectStatus: "Over due",
    overdue: new Date(),
    administrators: ["Pusse"],
    discription: "First Project",
  },
];

const names = [
  { username: "shehanmalakarodrigo@gmail.com" },
  { username: "abeysinghechanuka@gmail.com" },
  { username: "pusse@gmail.com" },
  { username: "ryan.pusse@gmail.com" },
];

//React class
export default class Createtask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: names,
      projects: [],
      selectedValue: 0,
      selectedProject: selectedproject,
      projectContributers: [],
      selectedManagers: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getProjecLogs();
  }

  //data fetching
  getProjecLogs = () => {
    var resources = [];
    axios
      .get("http://localhost:8070/projects")
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          const project = [
            {
              name: response.data[i].name,
              members: response.data[i].members,
              projectStatus: response.data[i].projectStatus,
              overdue: response.data[i].overdue,
              administrators: response.data[i].administrators,
              discription: response.data[i].discription,
            },
          ];
          resources.push(project[0]);
          console.log(resources[i]);
        }

        this.setState({
          projects: resources,
        });
      })
      .catch(() => {
        this.setState({
          error: true,
        });
      });
  };

  //setters
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

  setSelectedProject = (event) => {
    var value = event.target.value;
    for (var i = 0; i < this.state.projects.length; i++) {
      if (value === this.state.projects[i].name) {
        this.setState({
          selectedproject: this.state.projects[i].name,
          projectContributers: this.state.projects[i].members,
        });
      }
    }
  };

  //render to web page
  render() {
    const { projects, selectedProject, projectContributers } = this.state;

    //if data didnt recieve loading is true and this will render
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

    return (
      <div>
        <div>
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

                    <h1 class="h1">MANAGE TASKS</h1>
                    <Typography variant="caption">
                      <p>Please use radio buttons to select tasks</p>
                    </Typography>
                  </Grid>
                  <Grid>
                    <FormControl fullWidth label="" minWidth="300px">
                      <InputLabel>Project List</InputLabel>
                      <Select
                        value={selectedProject[0].name}
                        MenuProps={MenuProps}
                        onChange={this.setSelectedProject}
                      >
                        {projects.map((selproject, index) => (
                          <MenuItem key={index} value={selproject.name}>
                            {selproject.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>


                  {projectContributers.map((projectmembers, number) => (
                    <div>
                      <h1>{number+1}. {projectmembers}</h1>
                      <Grid>
                        <TextField
                          fullWidth
                          label="Task Name"
                          onChange={this.setTaskname}
                        ></TextField>
                      </Grid>
                      <FormControl class="marginedit">
                        <FormLabel>Task Status</FormLabel>
                        <RadioGroup
                          style={radioStyle}
                          color="primary"
                          row
                          value="To Do"
                          onChange={this.setCategory}
                        >
                          <FormControlLabel
                            value="To Do"
                            control={<Radio />}
                            label="To Do"
                          />
                          <FormControlLabel
                            value="In Progress"
                            control={<Radio />}
                            label="In Progress"
                          />
                          <FormControlLabel
                            value="Done"
                            control={<Radio />}
                            label="Done"
                          />
                          <FormControlLabel
                            value="Bugs/Issues"
                            control={<Radio />}
                            label="Bugs/Issues"
                          />
                          <FormControlLabel
                            value="Review"
                            control={<Radio />}
                            label="Review"
                          />
                        </RadioGroup>
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
                            label="Task Description"
                            id="outlined-multiline-flexible"
                            multiline
                            maxRows={4}
                            onChange={this.setProjectdescription}
                          />
                        </div>
                      </Box>
                    </div>
                  ))}

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
                </Paper>
              </Grid>
              <div></div>
            </div>
          </form>
          <a href="http://localhost:3000/createproject">
            <button class="buttonsubmitclear">C L E A R</button>
          </a>
          <a href="http://localhost:3000/projects">
            <button class="closebuttonactual">C L O S E</button>
          </a>
        </div>
      </div>
    );
  }
} //end of class
