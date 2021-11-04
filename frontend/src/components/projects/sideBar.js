import React, {Component} from 'react'
import "./projectsStyle.css"

// **** Import this file and use it in each component ********
export default class Sidebar extends Component{
    render(){
        return(
            <div className="sideBarComponent">
                <div className="sideBarElement">
                    <div className="outCircle"><div className="innerCircle"></div></div>
                    <h10 className="elementText">Total Projects</h10></div>
                <div className="sideBarElement">
                    <div className="outCircle"><div className="innerCircle"></div></div>
                    <h10 className="elementText">Projects Overdue</h10>
                </div>
                <div className="sideBarElement">
                    <div className="outCircle"><div className="innerCircle"></div></div>
                    <h10 className="elementText">Not Started</h10>
                </div>
                <div className="sideBarElement">
                    <div className="outCircle"><div className="innerCircle"></div></div>
                    <h10 className="elementText">Completed</h10>
                </div>
                <div className="sideBarElement">
                    <div className="outCircle"><div className="innerCircle"></div></div>
                    <h10 className="elementText">In Progress</h10>
                </div>
                <div className="sideBarElement">
                    <div className="outCircle"><div className="innerCircle"></div></div>
                    <h10 className="elementText">Canceled</h10>
                </div>
                
            </div>
        )
    }
}