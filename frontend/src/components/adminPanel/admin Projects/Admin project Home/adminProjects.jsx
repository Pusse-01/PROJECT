import React from "react";
import axios from "axios";
//import { projects } from "./resources";
//import { tasks } from "./resources";
//import Createproject from "./Create Project/createProject"
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Visibility from "@material-ui/icons/Visibility";
import TrendingUp from "@material-ui/icons/TrendingUp";
import { Helmet } from "react-helmet";
import ShowProject from "../Show Projects/showProjects";
import Createtask from '../createTask/createTask'
import Createproject from '../Create Project/createProject'
import Viewtasks from '../View tasks/viewtasks'
import AnalyzeProjects from '../Project Analyze/anlyzeProjects'
import "./adminProjects.css";

const TITLE = "Admin Projects";

class ProjectAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      projectsInfo: [],
      count:this.props.count
    };
    this.togglesection = this.togglesection.bind(this);
  }
  componentDidMount() {
    this.adjustStats();
  }

  togglesection = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  adjustStats() {
    axios
      .get("http://localhost:8070/projects")
      .then((response) => {
        var projectData = [];
        projectData = response.data;
        this.setState({
          projectsInfo: projectData,
          count:0
        });
      })
      .then(() => {
        let projectData = this.state.projectsInfo;

        for (let i = 0; i < this.state.projectsInfo.length; i++) {
          let ID = { project_id: this.state.projectsInfo[i]._id };
          axios
            .post("http://localhost:8070/task/getTasksOfProject", ID)
            .then((response) => {
              var ProjecTStat;
              let taskData = response.data.response;

              if (
                taskData.length === 0 &&
                this.state.projectsInfo[i].projectStatus !== "Pending"
              ) {
                ProjecTStat = "Not Started";
              } else if (
                taskData.length === 0 &&
                this.state.projectsInfo[i].projectStatus === "Pending"
              ) {
                ProjecTStat = "Pending";
              } else {
                for (let y = 0; y < taskData.length; y++) {
                  if (
                    taskData[y].task_status === "To Do" ||
                    taskData[y].task_status === "In Progress" ||
                    taskData[y].task_status === "Bugs/Issues"
                  ) {
                    ProjecTStat = "On going";
                    break;
                  } else if (
                    taskData[y].task_status === "Review" ||
                    taskData[y].task_status === "Done"
                  ) {
                    ProjecTStat = "Completed";
                  }
                }
              }
              console.log(ProjecTStat);
              console.log(this.state.projectsInfo[i]._id);
              let sendData = { projectStatus: ProjecTStat };
              axios
                .post(
                  "http://localhost:8070/projectsstatus/" +
                  this.state.projectsInfo[i]._id,
                  sendData
                )
                .then((response) => {
                  console.log(response.data);
                });
            });
        }
      });
  }

  gotoCreateproject =(event) => {
    this.setState({
      count:1
    })
  }
  gotoCreatetask =(event) => {
    this.setState({
      count:2
    })
  }

  gotoviewtask =(event) => {
    this.setState({
      count:3
    })
  }


  gotoanalyze =(event) => {
    this.setState({
      count:4
    })
  }


  gotohome=(event) => {
    this.setState({
      count:0
    })
  }
  render() {
    const { show, count } = this.state;

    return (
      <div class="float-parent-element">
        <div class="float-child-element1">
          {count===0 ?  <div class="red"><ShowProject /></div>:null}
          {count===1 ?  <div class="red"><Createproject /></div>:null}
          {count===2 ?  <div class="red"><Createtask /></div>:null}
          {count===3 ?  <div class="red">< Viewtasks /></div>:null}
          {count===4 ?  <div class="red">< AnalyzeProjects /></div>:null}
        
        </div>
        <div class="float-child-element2">
          <div class="yellow">
 
              <div>             
                  <button class="button"  style={{ marginTop: '10px' }} onClick={this.gotoCreateproject}><AddCircleOutlineOutlinedIcon
                    fontSize="large"
                    htmlColor="#ffffff"
                  />&nbsp;Create Project<br /><p class="p">add new task to existing projects</p></button>
              </div>
              <div>             
                  <button class="button"  style={{ marginTop: '10px' }} onClick={this.gotoCreatetask}><AddCircleOutlineOutlinedIcon
                    fontSize="large"
                    htmlColor="#ffffff"
                  />&nbsp;Add New Task<br /><p class="p">create your new project at glance</p></button>
              </div>
              <div>             
                  <button class="button"  style={{ marginTop: '10px' }} onClick={this.gotoviewtask}><Visibility
                    fontSize="large"
                    htmlColor="#ffffff"
                  />&nbsp;View All Task<br /><p class="p">view a summary of all tasks</p></button>
              </div>
              <div>             
                  <button class="button"  style={{ marginTop: '10px' }} onClick={this.gotoanalyze}><TrendingUp
                    fontSize="large"
                    htmlColor="#ffffff"
                  />&nbsp;Status<br /><p class="p">Evaluare your work</p></button>
              </div>
              <div>             
                  <button class="button"  style={{ marginTop: '10px' }} onClick={this.gotohome}><Visibility
                    fontSize="large"
                    htmlColor="#ffffff"
                  />&nbsp;View Project Details<br /><p class="p">view a summary project details</p></button>
              </div>

           
         
            </div>
        </div>
      </div>
    );
  }
}
export default ProjectAdmin;
