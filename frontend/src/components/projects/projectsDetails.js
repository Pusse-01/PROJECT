import React, {Component} from 'react'
import Sidebar from "./sideBar";
import { withRouter } from "react-router-dom";
import "./projectsStyle.css"

class ProjectsDetails extends Component{
    render(){
        return(
            <div className="tasksMainComponent">
                <Sidebar/>
                <div className="tasksSubComponent">̵
                    

                    <table className="tasksTable">
                        <tr className="table_head">
                        <th className="table_header_column">Project Discription</th>
                            <th className="table_header_column">Members</th>
                            <th className="table_header_column">Tasks</th>
                            <th className="table_header_column">Time Logs</th>
                            <th className="table_header_column">Charts</th>
                            <th className="table_header_column">Special Notes</th>
                        </tr>
                        <tr className="table_data_odd">
                            <td className="table_data_column">SE Project</td>
                            <td className="table_data_column">Pusse</td>
                            <td className="table_data_column">21st of October 2021</td>
                            <td className="table_data_column">On going</td>
                            <td className="table_data_column"></td>
                            <td className="table_data_column">Wada krpn</td>
                        </tr>
                        
                    </table>
                </div>
            </div>
        )
    }

























/*
    render(){
        return(
            <div className="projetsMainComponent">
                <Sidebar/>
                <div className="projectsSubComponent">̵

                    <table className="projectsTable">
                        <tr className="table_head">
                            <th className="table_header_column">Project Discription</th>
                            <th className="table_header_column">Members</th>
                            <th className="table_header_column">Tasks</th>
                            <th className="table_header_column">Time Logs</th>
                            <th className="table_header_column">Charts</th>
                            <th className="table_header_column">Special Notes</th>
                        </tr>
                        <tr className="table_data_odd">
                            <td className="table_data_column">SE Project</td>
                            <td className="table_data_column">Pusse<br>Yaso</br>Chanuka<br>Malaka</br></td>
                            <td className="table_data_column">21st of October 2021</td>
                            <td className="table_data_column">On going</td>
                            <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                        </tr>
                        
                    </table>
                </div>
            </div>
        )
    }*/
}

export default withRouter(ProjectsDetails);