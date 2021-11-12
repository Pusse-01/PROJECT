import React, {Component} from 'react'
import "./tasksStyle.css"
import Sidebar from "./sideBar";
import { withRouter } from "react-router-dom";
import axios from 'axios';


class Tasks extends Component{

    constructor(props) {
        super(props);
        const loggedInUser = localStorage.getItem("user");
        const founduser = JSON.parse(loggedInUser);
        this.state = {
            tasks: [],
            error:"",
            name: founduser.employee.name,
            id: founduser.employee.id,
            email: founduser.employee.email
        }
    }

    async componentDidMount() {
        // POST request using fetch with async/await
        console.log(this.state.id);
        axios.post('http://localhost:8070/task/getTaskByAssignedTo/',{'assigned_to':this.state.id})
            .then((res)=>{
                this.setState({
                    tasks :res.data.response,
                    error:"error"
                });
                console.log(this.state.tasks)

            })
            .catch(error=>{console.log(error)})
    }

    clickMore = (task) => {
        this.props.history.push({
            pathname:"/tasksMore",
            search: '?query=abc',
            state: { detail: task}
        })
    }

    goTaskBoard = () => {
        this.props.history.push("/tasksBoard");
    }
    render(){
        const {tasks} = this.state;
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

                            {(tasks.length > 0) ? tasks.map((task, index) => {
                                if(index%2==0){
                                    let status ="";
                                    if(task.task_status=="toDo"){status="To do"}
                                    else if(task.task_status=="inProgress"){status="In Progress"}
                                    else if(task.task_status=="done"){status="Done"}
                                    else if(task.task_status=="bugs"){status="Bugs / Issues"}
                                    else if(task.task_status=="toDo"){status="Review"}
                                    return (
                                        <tr className="table_data_odd" key={index}>

                                            <td className="table_data_column">{task.task_name}</td>
                                            <td className="table_data_column">{task.project_id}</td>
                                            <td className="table_data_column">{task.due_date}</td>
                                            <td className="table_data_column">{task.task_status}</td>
                                            <td className="table_data_column">
                                                <div
                                                    className="moreButton"
                                                    onClick ={()=>this.clickMore(task)}
                                                >
                                                    More
                                                </div>
                                            </td>
                                        </tr>

                                    )
                                }else{
                                }
                                return (
                                    <tr className="table_data_even" key={index}>

                                        <td className="table_data_column">{task.task_name}</td>
                                        <td className="table_data_column">{task.project_id}</td>
                                        <td className="table_data_column">{task.due_date}</td>
                                        <td className="table_data_column">{task.task_status}</td>
                                        <td className="table_data_column">
                                            <div
                                                className="moreButton"
                                                onClick ={()=>this.clickMore(task)}
                                            >
                                                More
                                            </div>
                                        </td>
                                    </tr>

                                )
                            }) : <tr><td colSpan="5">Loading...</td></tr>
                            }
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