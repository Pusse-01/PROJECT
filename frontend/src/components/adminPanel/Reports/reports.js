import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Sidebar from "./reportsSidebar";
import {Doughnut} from 'react-chartjs-2';
import "./reportsStyles.css";

class Reports extends Component {
    
    constructor(props) {
        super(props);
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
      } 
      }
    componentDidMount() {
        document.title = "PROJECT-Reports"
    }
    clickMore = () => {
      this.props.history.push({
          pathname:"/reportsMore",
          search: '?query=abc',
          state: {}
      })
  }
render(){
  
    return (
        <div className = "reportsMainComponent">
            <Sidebar /> 
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
        <div>
        <table className="projectsTable">
                        <tr className="table_head">

                            <th className="table_header_column">Employee ID</th>
                            <th className="table_header_column">Name</th>
                            <th className="table_header_column">Designation</th>
                            <th className="table_header_column">Email</th>
                            <th className="table_header_column">Projects Assigned</th>
                            <th className="table_header_column">Special Notes</th>
                            <th className="table_header_column">More Details</th>

                        </tr>                      
                           return (
                                <tr className="table_data_odd">

                                    <td className="table_data_column">001</td>
                                    <td className="table_data_column">Yaso</td>
                                    <td className="table_data_column">SE</td>
                                    <td className="table_data_column">yaso@project.com</td>
                                    <td className="table_data_column">PROJECTS</td>
                                    <td className="table_data_column">Waddek thmai</td>
                                    <td className="table_data_column">
                                                <div
                                                    className="moreButton"
                                                    onClick ={()=>this.clickMore()}
                                                >
                                                    More
                                                </div>
                                            </td>
                                </tr>
                                <tr className="table_data_odd">

                                    <td className="table_data_column">001</td>
                                    <td className="table_data_column">Yaso</td>
                                    <td className="table_data_column">SE</td>
                                    <td className="table_data_column">yaso@project.com</td>
                                    <td className="table_data_column">PROJECTS</td>
                                    <td className="table_data_column">Waddek thmai</td>
                                    <td className="table_data_column">
                                                <div
                                                    className="moreButton"
                                                    onClick ={()=>this.clickMore()}
                                                >
                                                    More
                                                </div>
                                            </td>
                                </tr>

                            )

                    </table>
          </div>
      </div>
    );

}

}

export default withRouter(Reports );