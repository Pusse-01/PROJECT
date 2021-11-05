import React, {Component} from 'react'
import "./projectsStyle.css"

// **** Import this file and use it in each component ********
export default class Sidebar extends Component{
    render(){
        return(
            <div className="sideBarComponent">
                <div className="sideBarElement">
                    <div className="outCircle"><div className="innerCircle"></div></div>
                    <h7 className="elementText">Pending</h7></div>
                <div className="sideBarElement">
                    <div className="outCircle"><div className="innerCircle"></div></div>
                    <h7 className="elementText">Not Started</h7>
                </div>
                <div className="sideBarElement">
                    <div className="outCircle"><div className="innerCircle"></div></div>
                    <h7 className="elementText">Ongoing</h7>
                </div>
                <div className="sideBarElement">
                    <div className="outCircle"><div className="innerCircle"></div></div>
                    <h7 className="elementText">Completed</h7>
                </div>
                <div className="sideBarElement">
                    <div className="outCircle"><div className="innerCircle"></div></div>
                    <h7 className="elementText">Over Due</h7>
                </div>
                <div className="sideBarElement">
                    <div className="outCircle"><div className="innerCircle"></div></div>
                    <h7 className="elementText">Canceled</h7>
                </div>
                
            </div>
        )
    }
}