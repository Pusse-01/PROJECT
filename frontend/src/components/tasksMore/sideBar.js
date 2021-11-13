import React, {Component} from 'react'
import "./taskMoreStyle.css"

// **** Import this file and use it in each component ********
export default class Sidebar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="sideBarMoreComponent">
                <div className="assignedTo">
                    {/*<h4 className="header">Assigned To</h4>*/}
                    <h7 className="header">{this.props.task.assigned_to}</h7>
                </div>
            </div>
        )
    }
}