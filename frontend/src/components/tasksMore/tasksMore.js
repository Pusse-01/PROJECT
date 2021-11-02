import React, {Component} from 'react'
import { withRouter } from "react-router-dom";

class TasksMore extends Component{
    render(){
        return(
            <div><h1>This is the tasks more component</h1></div>
        )
    }
}

export default withRouter(TasksMore);