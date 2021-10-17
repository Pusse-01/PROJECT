import React, {Component} from 'react'
import "./navBarStyle.css"

// **** Import this file and use it in each component ********
export default class Navbar extends Component{
    constructor() {
        super();
        this.state = {
            selectedHome : false,
            selectedProjects :false,
            selectedTasks : false,
            selectedCalendar : false,
            selectedTimeLogs : false
        }
    }
    changeColorHome(){this.setState({selectedHome:true, selectedProjects:false,selectedTasks:false,selectedCalendar:false,selectedTimeLogs:false})}
    changeColorProjects(){this.setState({selectedHome:false, selectedProjects:true,selectedTasks:false,selectedCalendar:false,selectedTimeLogs:false})}
    changeColorTasks(){this.setState({selectedHome:false, selectedProjects:false,selectedTasks:true,selectedCalendar:false,selectedTimeLogs:false})}
    changeColorCalendar(){this.setState({selectedHome:false, selectedProjects:false,selectedTasks:false,selectedCalendar:true,selectedTimeLogs:false})}
    changeColorTimeLogs(){this.setState({selectedHome:false, selectedProjects:false,selectedTasks:false,selectedCalendar:false,selectedTimeLogs:true})}

    render(){

        let linkClassHome = this.state.selectedHome ? "nav-link text-danger" : "nav-link text-light";
        let linkClassProjects = this.state.selectedProjects ? "nav-link text-danger" : "nav-link text-light";
        let linkClassTasks = this.state.selectedTasks ? "nav-link text-danger" : "nav-link text-light";
        let linkClassCalendar = this.state.selectedCalendar? "nav-link text-danger" : "nav-link text-light";
        let linkClassTimeLogs = this.state.selectedTimeLogs ? "nav-link text-danger" : "nav-link text-light";

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
                            <li className="nav-item">
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
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

}
