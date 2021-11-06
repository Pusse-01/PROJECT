import React, {Component} from 'react'
import "./projectsStyle.css"
import Sidebar from "./sideBar";
import { withRouter } from "react-router-dom";



class Projects extends Component{
    constructor(props) {
        super(props);
        const loggedInUser = localStorage.getItem("user");
        const founduser = JSON.parse(loggedInUser);
        this.state = {
            projects: [],
            name: founduser.employee.name,
            id: founduser.employee.id,
            email: founduser.employee.email
        }
    }
      componentDidMount() {
        fetch('http://localhost:8070/employee/projects/'+ this.state.email)
          .then(response => response.json())
          .then((response) => this.setState({ 
            isLoaded: true,
            projects : response, 
               
        }));
    }
    
    clickMore = () => {
        this.props.history.push("/projectsDetails");
    }
    render(){ 
        const {projects, isLoaded} = this.state;
        return(

            <div className="projectsMainComponent">
                <Sidebar/>
                <div className="projectsSubComponent">̵
                    <div className="searchBar">
                        <div className="blankColumn"></div>
                        <img className="searchIcon" src={require('../../assests/images/redSearch2.png').default}/>
                        <h5 className="searchText">Search</h5>
                    </div>
                    
                    <table className="projectsTable">
                        <tr className="table_head">
                            <th className="table_header_column">Project ID</th>
                            <th className="table_header_column">Project Name</th>
                            <th className="table_header_column">Due Date</th>
                            <th className="table_header_column">Status</th>
                            <th className="table_header_column_more">More</th>
                        </tr>
                        
                        { (projects.length > 0) ? projects.map( (projects, index) => {
           return (
                        <tr className="table_data_odd">
                            <td className="table_data_column">001</td>
                            <td className="table_data_column">{projects.name}</td>
                            <td className="table_data_column">{projects.overdue}</td>
                            <td className="table_data_column">{projects.status}</td>
                            <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                        </tr>
      
      )
                }) : <tr><td colSpan="5">Loading...</td></tr> }
                                         
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(Projects);