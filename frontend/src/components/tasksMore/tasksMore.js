import React, {Component} from 'react'
import { withRouter } from "react-router-dom";
import Sidebar from "./sideBar"

class TasksMore extends Component{
    constructor(props) {
        super(props);
        this.state = {
            task:this.props.location.state.detail
        }
    }
    async componentDidMount(){
        console.log(this.props.location.state.detail)
    }
    render(){
        return(
            <div className="tasksMoreMainComponent">
                <Sidebar/>
                <div className="tasksMoreSubComponent">
                    ̵<h4 className="header">{this.state.task.task_name}</h4>
                    <div className="taskDetails">
                        <h4 className="header">Action</h4>
                        <h7 className="header">{this.state.task.action}</h7>
                    </div>
                    <div className="assignedTo">
                        <h4 className="header">Assigned To</h4>
                        <h7 className="header">{this.state.task.assigned_to}</h7>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(TasksMore);