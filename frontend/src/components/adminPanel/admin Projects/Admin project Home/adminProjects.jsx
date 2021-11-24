import React from "react";
import axios from "axios";
//import { projects } from "./resources";
//import { tasks } from "./resources";
//import Createproject from "./Create Project/createProject" 
import "./adminProjects.css";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Visibility from '@material-ui/icons/Visibility';
import TrendingUp from '@material-ui/icons/TrendingUp';

import { Helmet } from 'react-helmet'

const TITLE ='Admin Projects'

class ProjectAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      projectsInfo: []
    };
    this.togglesection = this.togglesection.bind(this);
  }
  componentDidMount() {
    this.adjustStats()
  }

  togglesection = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  adjustStats() {
    axios.get("http://localhost:8070/projects")
      .then((response) => {
        var projectData = []
        projectData = response.data;
        this.setState({
          projectsInfo: projectData
        });

      }).then(() => {
        let projectData = this.state.projectsInfo

        for (let i = 0; i < this.state.projectsInfo.length; i++) {
          let ID = { project_id: this.state.projectsInfo[i]._id };
          axios.post("http://localhost:8070/task/getTasksOfProject", ID)
            .then((response) => {
              var ProjecTStat;
              let taskData = response.data.response;

              if (taskData.length === 0 && this.state.projectsInfo[i].projectStatus !== 'Pending') {
                ProjecTStat = "Not Started";
              }else if(taskData.length === 0 && this.state.projectsInfo[i].projectStatus === 'Pending'){
                ProjecTStat = "Pending";
              }
              else {
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
              axios.post(
                "http://localhost:8070/projectsstatus/" + this.state.projectsInfo[i]._id, sendData
              ).then((response)=>{
                console.log(response.data)
              });

            })






        }

      })

  }

  render() {
    const { show } = this.state;

    return (
      <div>
          <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div class="bodyapper1">
          <a href="http://localhost:3000/createproject">
            <button class="button"><AddCircleOutlineOutlinedIcon
              fontSize="large"
              htmlColor="#ffffff"
            />Create Project<br /><p class="p">create your new project at glance</p></button>
          </a>
        </div>

        <div class="bodyappear2">
          <a href="http://localhost:3000/viewprojects">
            <button class="button"> <Visibility
              fontSize="large"
              htmlColor="#ffffff"
            />Show Projects<br /><p class="p">view a summary of all the projects</p> </button>
          </a>
        </div>

        <div class="bodyappear3">
          <a href="http://localhost:3000/createtask">
            <button class="button"> <AddCircleOutlineOutlinedIcon
              fontSize="large"
              htmlColor="#ffffff"
            />Create Task<br /><p class="p">assign task for employees easily</p> </button>
          </a>
        </div>

        <div class="bodyappear4">
          <a href="http://localhost:3000/viewtasks">
            <button class="button"> < Visibility
              fontSize="large"
              htmlColor="#ffffff"
            />Show taskboard<br /><p class="p">view a summary of assign task for employees</p></button>
          </a>
        </div>

        <div class="bodyappear5">
          <a href="http://localhost:3000/viewanalysis">
            <button class="button"> <TrendingUp
              fontSize="large"
              htmlColor="#ffffff"
            />Status<br /><p class="p">evaluate your work</p></button>
          </a>
        </div>
      </div>


    );
  }
}

/*

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      show: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
      data: projects,
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading....</div>;
    }
    if (!this.state.data.length) {
      return <div>No projects to show</div>;
    }

    const { data } = this.state;
    return (
      <div class="bodyappear">
        <div>
          {data.map((projects) => (
            <div key={projects.id}>
              <div>
                <a href={projects.link}>
                  <button class="button1">
                    <span>{projects.name}</span>
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

*/
export default ProjectAdmin;
