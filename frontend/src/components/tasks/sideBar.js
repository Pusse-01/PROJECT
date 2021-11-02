import React, {Component} from 'react'
import "./tasksStyle.css"

// **** Import this file and use it in each component ********
export default class Sidebar extends Component{
    render(){
        return(
            <div className="sideBarComponent">
                <div className="sideBarElement">
                    <div className="outCircle"><div className="innerCircle"></div></div>
                    <h6 className="elementText">Tasks Assigned</h6></div>
                <div className="sideBarElement">
                    <div className="outCircle"><div className="innerCircle"></div></div>
                    <h6 className="elementText">Tasks Overdue</h6>
                </div>
                <div className="sideBarElement">
                    <div className="outCircle"><div className="innerCircle"></div></div>
                    <h6 className="elementText">Completed</h6>
                </div>
            </div>
        )
    }
}