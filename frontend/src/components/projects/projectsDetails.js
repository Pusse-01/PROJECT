import React, {Component} from 'react'
import { withRouter } from "react-router-dom";

class ProjectsDetails extends Component{
    render(){
        return(
            <div><h1>This is the project details component</h1></div>
        )
    }
}

export default withRouter(ProjectsDetails);