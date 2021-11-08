import React, {Component} from 'react'
import "./tasksStyle.css"
import Sidebar from "./sideBar";
import { withRouter } from "react-router-dom";

class Tasks extends Component{

    clickMore = () => {
        this.props.history.push("/tasksMore");
    }

    goTaskBoard = () => {
        this.props.history.push("/tasksBoard");
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

                    <div className="scroll hides">
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
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_even">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_even">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr> <tr className="table_data_odd">
                            <td className="table_data_column">Task 1</td>
                            <td className="table_data_column">Project 1</td>
                            <td className="table_data_column">21st of October 2021</td>
                            <td className="table_data_column">Pending</td>
                            <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                        </tr>
                            <tr className="table_data_odd">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>
                            <tr className="table_data_odd">
                                <td className="table_data_column">Task 1</td>
                                <td className="table_data_column">Project 1</td>
                                <td className="table_data_column">21st of October 2021</td>
                                <td className="table_data_column">Pending</td>
                                <td className="table_data_column_more"><div className="moreButton" onClick={this.clickMore}>More</div></td>
                            </tr>

                        </table>
                    </div>
                    
                    <div className="goToTaskBoardButton" onClick={this.goTaskBoard}>
                        <h6 className="taskBoardText">TASK BOARD</h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Tasks);