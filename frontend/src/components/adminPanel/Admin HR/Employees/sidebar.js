import React, {Component} from 'react'
import "./employees_style.css"
import {withRouter} from "react-router-dom";

// **** Import this file and use it in each component ********
class Sidebar extends Component{
    constructor(props) {
        super(props);

        this.state={
            addElementStyle : "employees_sidebar_employee0",
            deleteElementStyle : "employees_sidebar_employee3",
            updatePasswordStyle : "employees_sidebar_employee1",
            updatePositionStyle : "employees_sidebar_employee2"
        }
        if(this.props.elementStyle=="add"){
            this.state.addElementStyle="selected_employees_sidebar_employee0"
        }else if(this.props.elementStyle=="password"){
            this.state.updatePasswordStyle="selected_employees_sidebar_employee1"
        }
        else if(this.props.elementStyle=="position"){
            this.state.updatePositionStyle="selected_employees_sidebar_employee2"
        }
        else if(this.props.elementStyle=="delete"){
            this.state.deleteElementStyle="selected_employees_sidebar_employee3"
        }
    }

    changeMenu = (menu) => {
        if(menu=="add"){
            this.props.history.push("/employees/addEmployee")
        }else if(menu=="password"){
            this.props.history.push("/employees/updatePassword")
        }else if(menu=="position"){
            this.props.history.push("/employees/updatePosition")
        }else if(menu=="delete"){
            this.props.history.push("/employees/deleteEmployee")
        }
    }

    render(){
        return(
            <div className="sideBarEmployeesComponent">
                <div className="employees_sidebar_employees_container">
                    <div className="employees_sidebar_employee"  id={this.state.addElementStyle} onClick={()=>this.changeMenu("add")} >
                        <h5 className="employees_sidebar_employee_name">Add Employee</h5>
                    </div>
                    <div className="employees_sidebar_employee"  id={this.state.updatePasswordStyle} onClick={()=>this.changeMenu("password")} >
                        <h5 className="employees_sidebar_employee_name">Update Employee's Password</h5>
                    </div>
                    <div className="employees_sidebar_employee"  id={this.state.updatePositionStyle} onClick={()=>this.changeMenu("position")} >
                        <h5 className="employees_sidebar_employee_name">Update Employee's Position</h5>
                    </div>
                    <div className="employees_sidebar_employee"  id={this.state.deleteElementStyle} onClick={()=>this.changeMenu("delete")} >
                        <h5 className="employees_sidebar_employee_name">Delete Employee</h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Sidebar);