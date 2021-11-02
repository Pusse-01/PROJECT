import React, {Component} from 'react'
import { withRouter } from "react-router-dom";

class TasksBoard extends Component{
    render(){
        return(
            <div><h1>This is the tasks board component</h1></div>
        )
    }
}

export default withRouter(TasksBoard);