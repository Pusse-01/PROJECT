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
                <Sidebar task={this.state.task}/>
                <div className="tasksMoreSubComponent">
                    <h3 className="taskTitle">{this.state.task.task_name}</h3>
                    <div className="taskDetails">
                        <h4 className="taskMoreHeader">Deatils</h4>
                        <h7 className="taskMoreDetails">{this.state.task.action}</h7>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(TasksMore);