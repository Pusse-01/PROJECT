import React, {Component} from 'react'
import "./adminNavbar.css"
import { withRouter } from "react-router-dom";

class AdminNavbar extends Component{
    constructor(props) {
        super(props);
        const loggedInUser = localStorage.getItem("user");
        const founduser = JSON.parse(loggedInUser);
        this.state = {
            selectedHome: true,
            selectedReports:false,
            selectedProjects:false,
            selectedHR:false,
            selectedClients:false,
            selectedEmployees:false,
            name: founduser.employee.name,
            id:founduser.employee.id,

        }
    }

    logOut(){
        this.props.history.push("/");
        this.props.logout();
    }
    changeColorHome(){
        this.setState({
            selectedHome:true,
            selectedReports:false,
            selectedProjects:false,
            selectedHR:false,
            selectedClients:false,
            selectedEmployees:false,
            selectedLogout:false
        })
        this.props.history.push("/adminPanel");
    }
    changeColorReports(){
        this.setState({
            selectedHome:false,
            selectedReports:true,
            selectedProjects:false,
            selectedHR:false,
            selectedClients:false,
            selectedEmployees:false,
            selectedLogout:false
        })
        this.props.history.push("/reports")
    }
    changeColorProjects(){
        this.setState({
            selectedHome:false,
            selectedReports:false,
            selectedProjects:true,
            selectedHR:false,
            selectedClients:false,
            selectedEmployees:false,
            selectedLogout:false
        })
        this.props.history.push("/projects");
    }
    changeColorHR(){
        this.setState({
            selectedHome:false,
            selectedReports:false,
            selectedProjects:false,
            selectedHR:true,
            selectedClients:false,
            selectedEmployees:false,
            selectedLogout:false
        })
        this.props.history.push("/hr");
    }
    changeColorClients(){
        this.setState({
            selectedHome:false,
            selectedReports:false,
            selectedProjects:false,
            selectedHR:false,
            selectedClients:true,
            selectedEmployees:false,
            selectedLogout:false
        })
        this.props.history.push("/clients");
    }
    changeColorEmployees(){
        this.setState({
            selectedHome:false,
            selectedReports:false,
            selectedProjects:false,
            selectedHR:false,
            selectedClients:false,
            selectedEmployees:true,
            selectedLogout:false
        })
        this.props.history.push("/employees");
    }

    render(){

        let linkClassHome = this.state.selectedHome ? "nav-link text-danger " : "nav-link text-light";
        let linkClassReports = this.state.selectedReports ? "nav-link text-danger" : "nav-link text-light";
        let linkClassProjects = this.state.selectedProjects ? "nav-link text-danger" : "nav-link text-light";
        let linkClassHR = this.state.selectedHR? "nav-link text-danger" : "nav-link text-light";
        let linkClassClients = this.state.selectedClients ? "nav-link text-danger" : "nav-link text-light";
        let linkClassEmployees = this.state.selectedEmployees ? "nav-link text-danger" : "nav-link text-light";
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
                            <a  className={linkClassHome} aria-current="page" href="#" onClick={this.changeColorHome.bind(this)}>Dashboard</a>
                            </li>
                            <li className="nav-item" >
                                <a className={linkClassReports } href="#" onClick={this.changeColorReports.bind(this)}>Reports</a>
                            </li>
                            <li className="nav-item"> 
                                <a className={linkClassProjects} href="#" onClick={this.changeColorProjects.bind(this)}>Projects</a>
                            </li>
                            <li className="nav-item">
                                <a className={linkClassHR} href="#" onClick={this.changeColorHR.bind(this)}>HR</a>
                            </li>
                            <li className="nav-item">
                                <a className={linkClassClients} href="#" onClick={this.changeColorClients.bind(this)}>Clients</a>
                            </li>
                            <li className="nav-item">
                                <a className={linkClassEmployees} href="#" onClick={this.changeColorEmployees.bind(this)}>Employees</a>
                            </li>
                            <div className="nav-item logOut" onClick={this.logOut.bind(this)}>
                                <h7>Log out</h7>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="user">
                    <img className="notification" src={require('../../../assests/images/notifications.png').default}/>
                    <div className="userText">
                        <h7 className="userNameText">Welcome {this.state.name}</h7>
                        <p></p>
                    </div>
                    <img className="avatar" src={require('../../../assests/images/avatar.jpeg').default}/>
                </div>

            </nav>
        )
    }

}

export default withRouter(AdminNavbar);