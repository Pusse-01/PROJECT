import React, {Component} from 'react'
import "./tasksStyle.css"
import Sidebar from "./sideBar";
import {Button} from "@material-ui/core";
export default class Tasks extends Component{
    render(){
        return(
            <div className="tasksMainComponent">
                <div className="tasksSubComponent">
                    <h5>This is the tasks component</h5>
                        <table className="tasksTable">
                            <tr className="table_head">
                                <th>Task</th>
                                <th>Project</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>More</th>
                            </tr>
                            <tr className="table_data_odd">
                                <td>Task 1</td>
                                <td>Project 1</td>
                                <td>21st of October 2021</td>
                                <td>Pending</td>
                                <td><Button>More</Button></td>
                            </tr>
                            <tr className="table_data_even">
                                <td>Task 1</td>
                                <td>Project 1</td>
                                <td>21st of October 2021</td>
                                <td>Pending</td>
                                <td><Button>More</Button></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td>Task 1</td>
                                <td>Project 1</td>
                                <td>21st of October 2021</td>
                                <td>Pending</td>
                                <td><Button>More</Button></td>
                            </tr>
                            <tr className="table_data_even">
                                <td>Task 1</td>
                                <td>Project 1</td>
                                <td>21st of October 2021</td>
                                <td>Pending</td>
                                <td><Button>More</Button></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td>Task 1</td>
                                <td>Project 1</td>
                                <td>21st of October 2021</td>
                                <td>Pending</td>
                                <td><Button>More</Button></td>
                            </tr>
                        </table>
                </div>
                <Sidebar/>
            </div>

        )
    }
}