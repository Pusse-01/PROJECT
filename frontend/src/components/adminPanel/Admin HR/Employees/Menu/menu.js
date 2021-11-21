import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import axios from 'axios';
import Sidebar from "../sidebar";
import "../employees_style.css"
import HRNavbar from "../../HRNavBar/hr_navbar";

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    changeMenu = (menu) => {
        if(menu=="add"){
            this.props.history.push("addEmployee")
        }else if(menu=="password"){
            this.props.history.push("updatePassword")
        }else if(menu=="position"){
            this.props.history.push("updatePosition")
        }else if(menu=="delete"){
            this.props.history.push("deleteEmployee")
        }
    }

    render() {
        return (
            <div className="hr_employeesMainComponent">
                <HRNavbar/>
                <Sidebar/>
                <div className="hr_employeesSubComponent">
                    <div className="hr_employeeMenu">
                        <h5 className="hrTitleText">Employee Menu</h5>
                        <div className="menuContainer">
                            <div className="menuItem" onClick={()=>this.changeMenu("add")}><h5 className="menuItemText">Add Employee</h5></div>
                            <div className="menuItem" onClick={()=>this.changeMenu("password")}><h5 className="menuItemText">Update Password</h5></div>
                            <div className="menuItem" onClick={()=>this.changeMenu("position")}><h5 className="menuItemText">Update Position</h5></div>
                            <div className="menuItem" onClick={()=>this.changeMenu("delete")}><h5 className="menuItemText">Delete Account</h5></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Menu)