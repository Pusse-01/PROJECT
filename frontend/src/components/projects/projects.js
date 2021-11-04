import React, {Component} from 'react'
import "./projectsStyle.css"
import Sidebar from "./sideBar";
import { withRouter } from "react-router-dom";

class Projects extends Component{

    clickMore = () => {
        this.props.history.push("/ProjectsDetails");
    }
    render(){
        return(
            <div className="tasksMainComponent">
                <Sidebar/>
                <div className="tasksSubComponent">̵
                    <div className="searchBar">
                        <div className="blankColumn"></div>
                        <img className="searchIcon" src={require('../../assests/images/redSearch2.png').default}/>
                        <h5 className="searchText">Search</h5>
                    </div>

                    <table className="tasksTable">
                        <tr className="table_head">
                            <th className="table_header_column">Project ID</th>
                            <th className="table_header_column">Project Name</th>
                            <th className="table_header_column">Due Date</th>
                            <th className="table_header_column">Status</th>
                            <th className="table_header_column_more">More</th>
                        </tr>
                        <tr className="table_data_odd">
                            <td className="table_data_column">001</td>
                            <td className="table_data_column">PROJECT</td>
                            <td className="table_data_column">21st of October 2021</td>
                            <td className="table_data_column">On going</td>
                            <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                        </tr>
                        
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(Projects);