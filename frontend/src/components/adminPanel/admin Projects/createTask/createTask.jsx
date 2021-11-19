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
import Visibility from "@material-ui/icons/Visibility";
import TrendingUp from "@material-ui/icons/TrendingUp";
//style class
import "../Admin project Home/loadingPage.css";
import "./createtaskStyles.css";

//style classes
const paperStyle = {
  padding: "50px 20px",
  width: "700px",
  margin: "20px auto",
  backgroundColor: "#425e6e",
  opacity: 0.8,
};
const avatarStyle = {
  backgroundColor: "black",
};
const radioStyle = {
  backgroundColor: "#425e6e",
  opacity: 0.8,
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
      selectedProject: [],
      projectContributers: [],
      selectedManagers: [],
      taskname: "",
      endDate: Date.now(),
      taskstatus: "To Do",
      description: "",
      task: {
        taskname: "",
        endDate: Date.now(),
        taskstatus: "",
        description: "",
      },
      count: 0,
      taskDetail: [],
      customValue: "",
      customView: false,
      loading: false,
      showgrid: false,
      showerror: false,
      showend: false,
      showsubmit: false,
      missingdata: false,
      showcustomoption: true,
      submitted: false
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
        var selected = [];
        selected.push(this.state.projects[i]);
        this.setState({
          selectedProject: selected,
          projectContributers: this.state.projects[i].members,
          taskname: "",
        });
      }
    }

    this.setState({
      showgrid: true,
    });
  };

  setTaskname = (event) => {
    var value = event.target.value;
    this.setState({
      taskname: value,
    });
  };
  setCategory = (event) => {
    var value = event.target.value;
    this.setState({
      taskstatus: value,
    });
  };

  setendDate = (date) => {
    this.setState({
      endDate: date,
    });
  };

  setdescription = (event) => {
    var value = event.target.value;
    this.setState({
      description: value,
    });
  };

  handleClick = (event) => {
    if (this.state.customView) {
      var contribution = [];
      var temp_task = this.state.taskDetail;
      var temp = [
        {
          taskname: this.state.taskname,
          endDate: this.state.endDate,
          taskstatus: this.state.taskstatus,
          description: this.state.description,
        },
      ];
      temp_task.push(temp[0]);
      this.setState({
        taskDetail: temp_task,
      });
      //end of getting data


      for (var j = 0; j < this.state.projectContributers.length; j++) {
        contribution.push(this.state.projectContributers[j]);
      }
    }



    for (var i = 0; i < this.state.taskDetail.length; i++) {
      if (
        this.state.taskDetail[i].taskname === "" ||
        (this.state.taskDetail[i].endDate).toString() === '' ||
        this.state.taskDetail[i].taskstatus === "" ||
        this.state.taskDetail[i].description === ""
      ) {
        this.setState({
          missingdata: true,
          submitted: false
        })
        break;
      } else {
        this.setState({
          submitted: true
        })
      }
    }
    console.log(this.state.submitted)



    if (!this.state.customView) {
      for (let i = 0; i < this.state.taskDetail.length; i++) {
        let contributor = [this.state.projectContributers[i]]
        let taskBody = [
          {
            task_name: this.state.taskDetail[i].taskname,
            due_date: this.state.taskDetail[i].endDate,
            action: this.state.taskDetail[i].description,
            task_status: this.state.taskDetail[i].taskstatus, //
            project_id: this.state.selectedProject[0].id, //
            project_name: this.state.selectedProject[0].name, //
            assigned_to: contributor,
          },
        ];

        axios
          .post("http://localhost:8070/task/addTask", taskBody[0])
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            alert("error");
          });
      }

    } else {
      for (let i = 0; i < this.state.taskDetail.length; i++) {
        let taskBody = [
          {
            task_name: this.state.taskDetail[i].taskname,
            due_date: this.state.taskDetail[i].endDate,
            action: this.state.taskDetail[i].description,
            task_status: this.state.taskDetail[i].taskstatus, //
            project_id: this.state.selectedProject[0].id, //
            project_name: this.state.selectedProject[0].name, //
            assigned_to: contribution,
          },
        ];

        axios
          .post("http://localhost:8070/task/addTask", taskBody[0])
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            alert("error");
          });
      }
    }
  };

  handleBack = (event) => {
    var temp_task = this.state.taskDetail;
    var temp = [
      {
        taskname: this.state.taskname,
        endDate: this.state.endDate,
        taskstatus: this.state.taskstatus,
        description: this.state.description,
      },
    ];

    temp_task[this.state.count] = temp[0];

    if (this.state.count > 0) {
      this.setState({
        taskname: this.state.taskDetail[this.state.count - 1].taskname,
        endDate: this.state.taskDetail[this.state.count - 1].endDate,
        taskstatus: this.state.taskDetail[this.state.count - 1].taskstatus,
        description: this.state.taskDetail[this.state.count - 1].description,
        count: this.state.count - 1,
      });
    } else if (this.state.count === 0) {
      this.setState({
        taskname: this.state.taskDetail[0].taskname,
        endDate: this.state.taskDetail[0].endDate,
        taskstatus: this.state.taskDetail[0].taskstatus,
        description: this.state.taskDetail[0].description,
        count: this.state.count,
      });
    }
  };

  handleNext = (event) => {
    if (this.state.count === this.state.projectContributers.length - 1) {
      this.setState({
        showend: true,
        showsubmit: true,
      });
    }
    var temp_task = this.state.taskDetail;
    var temp = [
      {
        taskname: this.state.taskname,
        endDate: this.state.endDate,
        taskstatus: this.state.taskstatus,
        description: this.state.description,
      },
    ];

    console.log("next 1 ");
    console.log(this.state.taskDetail.length);
    console.log(this.state.count);

    if (this.state.taskDetail.length - 1 > this.state.count) {
      temp_task[this.state.count] = temp[0];
      this.setState({
        taskname: this.state.taskDetail[this.state.count + 1].taskname,
        endDate: this.state.taskDetail[this.state.count + 1].endDate,
        taskstatus: this.state.taskDetail[this.state.count + 1].taskstatus,
        description: this.state.taskDetail[this.state.count + 1].description,
        taskDetail: temp_task,
        count: this.state.count + 1,
      });
    } else if (this.state.count !== 0) {
      temp_task.push(temp[0]);
      this.setState({
        taskDetail: temp_task,
        taskname: "",
        endDate: Date.now(),
        taskstatus: "To Do",
        description: "",
        count: this.state.count + 1,
      });
      console.log(
        "next 2" +
        this.state.taskDetail[this.state.taskDetail.length - 1].taskname
      );
      console.log(this.state.taskDetail.length);
      console.log(this.state.count);
    } else if (this.state.count === 0) {
      temp_task[this.state.count] = temp[0];
      this.setState({
        taskDetail: temp_task,
        taskname: "",
        endDate: Date.now(),
        taskstatus: "To Do",
        description: "",
        count: this.state.count + 1,
      });
    }

  };

  setModel = (event) => {
    var value = event.target.value;
    this.setState({
      customValue: value,
    });
    if (value === "Custom") {
      this.setState({
        customView: true,
      });
    } else {
      this.setState({
        customView: false,
      });
    }
  };

  //render to web page
  render() {
    const {
      projects,
      selectedProject,
      projectContributers,
      taskname,
      taskstatus,
      endDate,
      description,
      count,
      showgrid,
      showerror,
      showend,
      showsubmit,
      showcustomoption,
      customValue,
      customView,
      missingdata,
      submitted
    } = this.state;

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



    if (this.state.missingdata) {
      <div>affa</div>
    }
    //
    return (
      <div class="createtaskform">
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

                    <h1 class="h1tasks">MANAGE TASKS</h1>
                    <Typography variant="caption">
                      <p>Please use this form to create tasks<br />All fields are required.</p>
                    </Typography>
                  </Grid>
                  <Grid>

                    {!showgrid ? (
                      <FormControl fullWidth label="" minWidth="300px">
                        <InputLabel>Project List</InputLabel>
                        <Select
                          value={selectedProject.name}
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
                    ) : null}

                    {missingdata ? <div>Reqired Data is missing.<br /><button class="buttonsubmittask">Go Back</button></div> : null}
                    {submitted ? <div>Task Added Successfully<br /><button class="buttonsubmittask">Go Back</button></div> : null}
                    {showcustomoption && !showgrid ? (
                      <FormControl class="marginedit">
                        <FormLabel>Method you need to follow</FormLabel>
                        <RadioGroup
                          style={radioStyle}
                          color="primary"
                          row
                          value={customValue}
                          onChange={this.setModel}
                        >
                          <FormControlLabel
                            value="Custom"
                            control={<Radio />}
                            label="Same task for all employees"
                          />
                          <FormControlLabel
                            value="Unique"
                            control={<Radio />}
                            label="Unique task for each employee"
                          />
                        </RadioGroup>
                      </FormControl>
                    ) : null}

                    <div></div>
                  </Grid>
                  {showerror && showgrid && !missingdata ? (
                    <div>
                      <br />
                      <p>No contributers for this project.</p>
                    </div>
                  ) : null}

                  {showend && showgrid && !missingdata ? (
                    <div>
                      <br />
                      <p>No more contributers for this project.</p>
                    </div>
                  ) : null}

                  {showgrid && !showend && !showerror && !submitted && !missingdata ? (
                    <div>
                      {!customView ? (
                        <h1 class="h1tasks">
                          {count + 1}. {projectContributers[count]}
                        </h1>
                      ) : null}

                      <Grid>
                        <TextField
                          value={taskname}
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
                          value={taskstatus}
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
                          value={endDate}
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
                            value={description}
                            multiline
                            maxRows={4}
                            onChange={this.setdescription}
                          />
                        </div>
                      </Box>
                      {!customView ? (
                        <div class="containerbuttons">
                          <button
                            class="buttondir back"
                            type="button"
                            varient="contained"
                            color="primary"
                            onClick={this.handleBack}
                          >
                            <span color="primary"> PREV</span>
                          </button>
                          <button
                            class="buttondir forward"
                            type="button"
                            varient="contained"
                            color="primary"
                            onClick={this.handleNext}
                          >
                            <span color="primary"> NEXT</span>
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ) : null}


                  <div class="containerbuttons">
                    {(showsubmit || customView) && showgrid && !submitted && !missingdata ? (
                      <button
                        class="buttonsubmittask"
                        type="button"
                        varient="contained"
                        color="primary"
                        onClick={this.handleClick}
                      >
                        <span color="primary">SUBMIT</span>
                      </button>
                    ) : null}
                  </div>
                </Paper>
              </Grid>
            </div>
          </form>
          <a href="http://localhost:3000/createtask">
            <button class="buttonsubmitclear">C L E A R</button>
          </a>
          <a href="http://localhost:3000/projects">
            <button class="closebuttonactual">C L O S E</button>
          </a>
        </div>

        <div>
          <div class="bodyappear1createtask">
            <a href="http://localhost:3000/createproject">
              <button class="buttoncreatetask">
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
          <div class="bodyappear2createtask">
            <a href="www.google.com">
              <button class="buttoncreatetask">
                {" "}
                <Visibility fontSize="large" htmlColor="#ffffff" />
                Show taskboard
                <br />
                <p class="p">view a summary of assign task</p>
              </button>
            </a>
          </div>
          <div class="bodyappear3createtask">
            <a href="www.google.com">
              <button class="buttoncreatetask">
                {" "}
                <TrendingUp fontSize="large" htmlColor="#ffffff" />
                Status
                <br />
                <p class="p">evaluate your work</p>
              </button>
            </a>
          </div>
          <div class="bodyappear4createtask">
            <a href="http://localhost:3000/viewprojects">
              <button class="buttoncreatetask">
                {" "}
                <Visibility fontSize="large" htmlColor="#ffffff" />
                Show Projects
                <br />
                <p class="p">view a summary of all the projects</p>{" "}
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
} //end of class

/*******************************

                  {projectContributers.map((projectmembers, number) => (

                  ))}


                      this.setState({
      taskname: "",
      endDate: Date.now(),
      taskstatus: "To Do",
      description: "",
    });

    if (
      this.state.projectContributers.length === this.state.taskDetail.length
    ) {
      this.setState({
        showend: true,
        showsubmit: true,
      });
    }

       var temp_task = this.state.taskDetail;
    console.log(this.state.task);
    var temp = [
      {
        taskname: this.state.taskname,
        endDate: this.state.endDate,
        taskstatus: this.state.taskstatus,
        description: this.state.description,
      },
    ];


    temp_task.push(temp[0]);
    this.setState({
      count: this.state.count + 1,
      task: temp[0],
      taskDetail: temp_task,
    });
    console.log(this.state.task);
    console.log(this.state.count);
    console.log(this.state.taskDetail);

    for(var i=0; i<this.state.taskDetail.length; i++){
  var taskBody =[{
    task_name : this.state.taskDetail[i].taskname,
    due_date : "2021-09-22",
    action : this.state.taskDetail[i].description,
    task_status : this.state.taskDetail[i].taskstatus,
    project_id : this.state.selectedProject[0].id,
    project_name : this.state.selectedProject[0].name,
    assigned_to : ['11111111']
  }]

  axios.post('http://localhost:8070/task/addTask', taskBody)
  .then((response) => {
    console.log(response.data)

  }).catch((error)=>{
    alert('error')
  })
}
 */
