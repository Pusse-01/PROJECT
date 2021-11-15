import React from "react";
import { projects } from "./resources";
import { tasks } from "./resources";
//import Createproject from "./Create Project/createProject" 
import "./adminProjects.css";

class ProjectAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.togglesection = this.togglesection.bind(this);
  }

  togglesection = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };



  render() {
    const { show } = this.state;

    return (
      <div>
        <div class="bodyapper1">
          <a href="http://localhost:3000/createproject">
            <button class="button">Create Project<br/><p class="p">create new project for the organization</p></button>
          </a>
        </div>

        <div class="bodyappear2">
          <a href="www.google.com">
            <button class="button">Show Project<br/><p class="p">view a summary of all the projects</p> </button>
          </a>
        </div>

        <div class="bodyappear3">
          <a href="http://localhost:3000/createtask">
            <button class="button">Create Task<br/><p class="p">assign task for employees</p> </button>
          </a>
        </div>

        <div class="bodyappear4">
          <a href="www.google.com">
            <button class="button">Show taskboard<br/><p class="p">view a summary of assign task for employees</p></button>
          </a>
        </div>

        <div class="bodyappear5">
          <a href="www.google.com">
            <button class="button">Status<br/><p class="p">evaluate your work</p></button>
          </a>
        </div>
      </div>
      
      
    );
  }
}

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

class TaskBoard extends React.Component {
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
      data: tasks,
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
      <div>
        <div class="temp">
          {data.map((projects) => (
            <div key={projects.id}>
              <div>
                <a href={projects.link}>
                  <button>
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
export default ProjectAdmin;
