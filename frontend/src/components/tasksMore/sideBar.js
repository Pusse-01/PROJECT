import React, {Component} from 'react'
import "./taskMoreStyle.css"

// **** Import this file and use it in each component ********
export default class Sidebar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const members = this.props.members;
        console.log(members)
        return(
            <div className="sideBarMoreComponent">
                <h4 className="sidebarMoreHeader">Members Assigned To The Task</h4>
                <div className="sideBarMoreSubContainer">
                    {
                        this.props.members.map((member, index)=>{
                            return (
                                <div className="taskMoreElement">
                                    <h7 className="taskMoreElementName">{member.name}</h7>
                                    <h7 className="taskMoreElementPosition">{member.position}</h7>
                                    <h7 className="taskMoreElementEmail">{member.email}</h7>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}