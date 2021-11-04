import React, {Component} from 'react'
import "./navBarStyle.css"
import { withRouter } from "react-router-dom";

class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedHome : false,
            selectedProjects :false,
            selectedTasks : false,
            selectedCalendar : false,
            selectedTimeLogs : false
        }
    }

    logOut(){
        this.props.logout();
    }
    changeColorHome(){
        this.setState({
            selectedHome:true,
            selectedProjects:false,
            selectedTasks:false,
            selectedCalendar:false,
            selectedTimeLogs:false,
            selectedLogout:false
        })
        this.props.history.push("/Dashboard");
    }
    changeColorProjects(){
        this.setState({
            selectedHome:false,
            selectedProjects:true,
            selectedTasks:false,
            selectedCalendar:false,
            selectedTimeLogs:false,
            selectedLogout:false
        })
        this.props.history.push("/projects")
    }
    changeColorTasks(){
        this.setState({
            selectedHome:false,
            selectedProjects:false,
            selectedTasks:true,
            selectedCalendar:false,
            selectedTimeLogs:false,
            selectedLogout:false
        })
        this.props.history.push("/tasks");
    }
    changeColorCalendar(){
        this.setState({
            selectedHome:false,
            selectedProjects:false,
            selectedTasks:false,
            selectedCalendar:true,
            selectedTimeLogs:false,
            selectedLogout:false
        })
        this.props.history.push("/api/taskBackLog");
    }
    changeColorTimeLogs(){
        this.setState({
            selectedHome:false,
            selectedProjects:false,
            selectedTasks:false,
            selectedCalendar:false,
            selectedTimeLogs:true,
            selectedLogout:false
        })
        this.props.history.push("#");
    }

    render(){

        let linkClassHome = this.state.selectedHome ? "nav-link text-danger " : "nav-link text-light";
        let linkClassProjects = this.state.selectedProjects ? "nav-link text-danger" : "nav-link text-light";
        let linkClassTasks = this.state.selectedTasks ? "nav-link text-danger" : "nav-link text-light";
        let linkClassCalendar = this.state.selectedCalendar? "nav-link text-danger" : "nav-link text-light";
        let linkClassTimeLogs = this.state.selectedTimeLogs ? "nav-link text-danger" : "nav-link text-light";
        let linkClassLogout = this.state.selectedLogout ? "nav-link text-danger" : "nav-link text-light";
        return (
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="logoContainer">
                    <h5 className="logo">P</h5>
                    <h5 className="logo">R</h5>
                    <h5 className="logoRed">O</h5>
                    <h5 className="logo">J</h5>
                    <h5 className="logo">E</h5>
                    <h5 className="logo">C</h5>
                    <h5 className="logo">T</h5>
                </div>

                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className=" nav-item active">
                            <a  className={linkClassHome} aria-current="page" href="#" onClick={this.changeColorHome.bind(this)}>Home</a>
                            </li>
                            <li className="nav-item" >
                                <a className={linkClassProjects} href="#" onClick={this.changeColorProjects.bind(this)}>Projects</a>
                            </li>
                            <li className="nav-item">
                                <a className={linkClassTasks} href="#" onClick={this.changeColorTasks.bind(this)}>Tasks</a>
                            </li>
                            <li className="nav-item">
                                <a className={linkClassCalendar} href="#" onClick={this.changeColorCalendar.bind(this)}>Calendar</a>
                            </li>
                            <li className="nav-item">
                                <a className={linkClassTimeLogs} href="#" onClick={this.changeColorTimeLogs.bind(this)}>Time Logs</a>
                            </li>
                            <li className="nav-item">
                                <a className={linkClassLogout} href="#" onClick={this.logOut.bind(this)}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

}

export default withRouter(Navbar);
