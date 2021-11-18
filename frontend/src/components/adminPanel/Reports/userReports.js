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
            user_id : this.props.location.state.id,
            data: [],
            userProjects: [],
            userTasks: [],
        };
        this.state1 = {
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
            data: [8,3,5,9,12],
            radius: 150
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
        
        this.state2 = {
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
          data: [5, 6, 2, 7, 8],
          radius: 150
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
    };
   
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
            
            fetch('http://localhost:8070/task/userTasks/' + this.state.user_id)
            .then(response => response.json())
            .then((response) => this.setState({
                isLoaded: true,
                userTasks: response,
            }));
        document.title = "PROJECT"
    }   


render(){
    const {data} = this.state;
    const {userProjects} = this.state;
    const {userTasks} = this.state;
    return (
        <div className = "reportsMainComponent">
        <Sidebar data={this.state.data}/> 
        {data.map((data) => {
        return (
            <div className="reportTable">
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
                            )
                        }
                    )
                }
                        </tbody>
                    </table>
              
            
                </div>
                </div>   

                <div className="col-sm-12 col-md-4 mt-5   ms-md-5 mr-md-5">
                    <h4 className="text-center bg theader"> Tasks Assigned</h4>
                <div>

                    <table className="table table-dark table-striped table-bordered">
                         <thead>
                            <tr>
                                <th scope="col" className="text-center">Task ID</th>
                                <th scope="col" className="text-center">Task Name</th>
                                <th scope="col" className="text-center">Project</th>
                                <th scope="col" className="text-center">Status</th>
                                <th scope="col" className="text-center">Overdue</th>
                            </tr>
                        </thead>
                        <tbody>
                {userTasks.map((userTasks) => {
                return (
                    <tr >
                        <td className="reportstable_data_column">{userTasks._id}</td>
                        <td className="reportstable_data_column">{userTasks.task_name}</td>
                        <td className="reportstable_data_column">{userTasks.project_name}</td>
                        <td className="reportstable_data_column">{userTasks.task_status}</td>
                        <td className="reportstable_data_column">{userTasks.due_date}</td>
                    </tr>
                            )
                        }
                    )
                }
                        </tbody>
                    </table>
              
            
                </div>
                </div>
            
            </div>         
            
            )})}
        <div className="projectsChart">         
        <div >   
        <h3 className ="name">Projects</h3>      
        <Doughnut      
          data={this.state1}
          options={this.state1.options}
        /></div>
        <div>
        <h3 className= "name">Tasks</h3>
        <Doughnut 
          data={this.state2}
          options={this.state2.options}
        />       
        </div>
        </div>
        </div>
        
                          
        
    );

}
}
export default withRouter(UserReports );