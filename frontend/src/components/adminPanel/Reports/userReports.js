import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Sidebar from "./userSidebar";
import {Doughnut} from 'react-chartjs-2';
import "./reportsStyles.css";

class UserReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user :this.props.location.state.email,
            data: [],
            userProjects: [],
        }
    }
    
    componentDidMount() {
        fetch('http://localhost:8070/employee/user/' + this.state.user)
            .then(response => response.json())
            .then((response) => this.setState({
                isLoaded: true,
                data: response,
            }));

            fetch('http://localhost:8070/employee/projects/' + this.state.user)
            .then(response => response.json())
            .then((response) => this.setState({
                isLoaded: true,
                userProjects: response,
            }));
        document.title = "PROJECT"
    }   


render(){
    const {data} = this.state;
    const {userProjects} = this.state;
    console.log(this.state.data);
    return (
        <div className = "reportsMainComponent">
        <Sidebar data={this.state.data}/> 
        {data.map((data) => {
                          return (
            <div >
            <div className="col-sm-12 col-md-4 mt-5   ms-md-5 mr-md-5">
                <h4 className="text-center bg theader"> Projects Assigned</h4>
                <div>

            <table className="table table-dark table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col" className="text-center">Project ID</th>
                <th scope="col" className="text-center">Project Name</th>
                <th scope="col" className="text-center">Working as</th>
                <th scope="col" className="text-center">Status</th>
                <th scope="col" className="text-center">Overdue</th>
              </tr>
            </thead>
            <tbody>
            {userProjects.map((userProjects) => {
                          return (
                <tr >
                <td className="reportstable_data_column">{userProjects.id}</td>
                <td className="reportstable_data_column">{userProjects.name}</td>
                <td className="reportstable_data_column">{data.position}</td>
                <td className="reportstable_data_column">{userProjects.status}</td>
                <td className="reportstable_data_column">{userProjects.overdue}</td>
                </tr>
                )})}
                </tbody>
                </table>
              
            
                    </div>
            </div>   
            </div>         
            
            )})}

        </div>
        
                          
        
    );

}
}
export default withRouter(UserReports );