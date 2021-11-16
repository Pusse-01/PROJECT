import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Sidebar from "./userSidebar";
import {Doughnut} from 'react-chartjs-2';
import "./reportsStyles.css";

class UserReports extends Component {
    constructor(props) {
        super(props);
        const loggedInUser = localStorage.getItem("user");
        const founduser = JSON.parse(loggedInUser);
        this.state = {
            empployee: [],
            name: founduser.employee.name,
            id: founduser.employee.id,
            email: founduser.employee.email
        }
    }
    
    
    componentDidMount() {
        fetch('http://localhost:8070/employee/user/' + this.state.email)
            .then(response => response.json())
            .then((response) => this.setState({
                isLoaded: true,
                empployee: response,

            }));
        //added by Malaka, will change your project page title - delete after read :)
        document.title = "PROJECT"
    }   


render(){
    return (
        <div className = "reportsMainComponent">
        <Sidebar /> 
            <h3 className="name">{this.state.name}</h3>
        </div>
        
    );

}
}
export default withRouter(UserReports );