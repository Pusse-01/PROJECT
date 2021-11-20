import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Sidebar from "./reportsSidebar";
import {Doughnut} from 'react-chartjs-2';
import "./reportsStyles.css";

class Reports extends Component {
  
    constructor(props) {
        super(props);
            

      this.state = {
        countProjects: [],
        countTasks: [],
        data: [],
        projects: [],
        userEmail: ''
      }
        
      }
    componentDidMount() {
      fetch('http://localhost:8070/employee/allEmployees')
            .then(response => response.json())
            .then((response) => this.setState({
                data: response,
                userEmail: response.email             
            }));

        fetch('http://localhost:8070/employee/countProjects')
            .then(response => response.json())
            .then((response) => this.setState({  
                countProjects: Object.values(response)       
            }));

        fetch('http://localhost:8070/task/countTasks')
            .then(response => response.json())
            .then((response) => this.setState({  
                countTasks: Object.values(response)       
            }));
            
        document.title = "PROJECT-Reports";
    }
    clickMore = (member) => {
      this.props.history.push({
          pathname:"/userReports",
          search: '?query=abc',
          state: {
            email: member.email,
            id: member._id
          }
          
      })
  }
render(){
const {data} = this.state;
const {countProjects} = this.state;
const {countTasks} = this.state;



 const chart1 = {
  labels: ['Pending', 'Not started', 'Ongoing',
       'Completed', 'Overdue'],
datasets: [
{
  label: 'Projects',
  backgroundColor: [
    '#6800B4',
    '#C9DE00',
    '#2FDE00',
    '#00A6B4',             
    '	#ff0000'
  ],
  hoverBackgroundColor: [
      '#6800B4',
      '#C9DE00',
      '#2FDE00',
      '#00A6B4',             
      '#ff0000 '
  ],
  data: countProjects,
  radius: 120
}
],
options:
  [{ tooltips: {
    enabled: false
},
pieceLabel: {
    render: 'label',
    arc: true,
    fontColor: '#000',
    position: 'outside'
},
responsive: true,
legend: {
    position: 'bottom',
},
title: {
    display: true,
    text: 'Projects',
    fontSize: 20
},
animation: {
    animateScale: true,
    animateRotate: true
}}]
}

        
const chart2 = {
  labels: ['Pending', 'Not started', 'Ongoing',
       'Completed', 'Overdue'],
datasets: [
{
  label: 'Tasks',
  backgroundColor: [
    '#6800B4',
    '#C9DE00',
    '#2FDE00',
    '#00A6B4',             
    '#ff0000 '
  ],
  hoverBackgroundColor: [
      '#6800B4',
      '#C9DE00',
      '#2FDE00',
      '#00A6B4',             
      '#ff0000 '
  ],
  data: countTasks,
  radius: 120
}
],
options:
  [{
title:{
  display:true,
  text:'Tasks', 
  fontSize:20,
  padding: {
    top: 10,
    bottom: 30
},
legend:false
}}]
}; 
 return (
      
        <div className = "reportsMainComponent">
            <Sidebar /> 
        <div className="projectsChart">         
        <div >   
        <h3 className ="name">Projects</h3>              
        <Doughnut      
          data= {chart1}
          options={chart1.options}
        />       
        </div>
        <div>
        <h3 className= "name">Tasks</h3>
        <Doughnut 
          data={chart2}
          options={chart2.options}
        />       
        </div>
        </div>
        <div>

        <table className="reportsProjectsTable">
          
                        <tr className="reportstable_head">

                            <th className="reportstable_header_column">Employee ID</th>
                            <th className="reportstable_header_column">Name</th>
                            <th className="reportstable_header_column">Designation</th>
                            <th className="reportstable_header_column">Email</th>                           
                            <th className="reportstable_header_column">Special Notes</th>
                            <th className="reportstable_header_column">More Details</th>

                        </tr>                      
                        
                        {data.map((member, index) => {
                          

return (
  

                                <tr className="reportstable_data_odd" key={index}>

                                    <td className="reportstable_data_column">{member.id}</td>
                                    <td className="reportstable_data_column">{member.name}</td>
                                    <td className="reportstable_data_column">{member.position}</td>
                                    <td className="reportstable_data_column">{member.email}</td>
                                    <td className="reportstable_data_column">Waddek thmai</td>
                                    <td className="reportstable_data_column">
                                                <div
                                                    className="reportsmoreButton"
                                                    onClick ={()=>this.clickMore(member)}
                                                >
                                                    More
                                                </div>
                                            </td>
                                </tr>
                         ) })} 
                    </table>

          </div>
      </div>
    );

}

}

export default withRouter(Reports );