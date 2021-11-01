import React, {Component} from 'react'
import "./tasksStyle.css"
import Sidebar from "./sideBar";
import {Button} from "@material-ui/core";
export default class Tasks extends Component{
    render(){
        return(
            <div className="tasksMainComponent">
                <Sidebar/>
                <div className="tasksSubComponent">̵

                    <div className="searchBar">
                        <div className="blankColumn"><h5 className="searchText"></h5></div>
                        <img className="searchIcon" src={require('../../assests/images/redSearch2.png').default}/>
                        <h5 className="searchText">Search</h5>
                    </div>

                    <table className="tasksTable">
                        <tr className="table_head">
                            <th className="table_header_column">Task</th>
                            <th className="table_header_column">Project</th>
                            <th className="table_header_column">Due Date</th>
                            <th className="table_header_column">Status</th>
                            <th className="table_header_column_more">More</th>
                        </tr>
                        <tr className="table_data_odd">
                            <td className="table_data_column">Task 1</td>
                            <td className="table_data_column">Project 1</td>
                            <td className="table_data_column">21st of October 2021</td>
                            <td className="table_data_column">Pending</td>
                            <td className="table_data_column_more"><div className="moreButton">More</div></td>
                        </tr>
                        <tr className="table_data_even">
                            <td className="table_data_column">Task 1</td>
                            <td className="table_data_column">Project 1</td>
                            <td className="table_data_column">21st of October 2021</td>
                            <td className="table_data_column">Pending</td>
                            <td className="table_data_column_more"><div className="moreButton">More</div></td>
                        </tr>
                        <tr className="table_data_odd">
                            <td className="table_data_column">Task 1</td>
                            <td className="table_data_column">Project 1</td>
                            <td className="table_data_column">21st of October 2021</td>
                            <td className="table_data_column">Pending</td>
                            <td className="table_data_column_more"><div className="moreButton">More</div></td>
                        </tr>
                        <tr className="table_data_even">
                            <td className="table_data_column">Task 1</td>
                            <td className="table_data_column">Project 1</td>
                            <td className="table_data_column">21st of October 2021</td>
                            <td className="table_data_column">Pending</td>
                            <td className="table_data_column_more"><div className="moreButton">More</div></td>
                        </tr>
                        <tr className="table_data_odd">
                            <td className="table_data_column">Task 1</td>
                            <td className="table_data_column">Project 1</td>
                            <td className="table_data_column">21st of October 2021</td>
                            <td className="table_data_column">Pending</td>
                            <td className="table_data_column_more"><div className="moreButton">More</div></td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}