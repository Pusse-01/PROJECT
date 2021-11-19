import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import axios from 'axios';
import Sidebar from "./sidebar";
import "./employees_style.css"
import HRNavbar from "../HRNavBar/hr_navbar";

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerEmployee: {
                name: "",
                email: "",
                password: "",
                role: "",
                profileImage: "",
                department: "",
                designation: ""
            },
            updateEmployee: {
                id: "",
                password: "",
                email: "",
                department: "",
                designation: ""
            },
            deleteEmployee: {}
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="employeesMainComponent">
                <HRNavbar/>
                <Sidebar/>
                <div className="employeesSubComponent">
                    <div className="addEmployee">
                        <h5 className="hrTitleText">Add Employee</h5>
                        {/*<form className="hrForm">*/}
                        {/*    <div className="hrFormSub">*/}
                        {/*        <label className="hrLabel">*/}
                        {/*            Department Name*/}
                        {/*            <input className="hrTextInput" type="text" name="dName"*/}
                        {/*                   value={this.state.department.department_name}*/}
                        {/*                   onChange={e => this.setState({*/}
                        {/*                       department: {*/}
                        {/*                           ...this.state.department,*/}
                        {/*                           department_name: e.target.value*/}
                        {/*                       }*/}
                        {/*                   })}/>*/}
                        {/*        </label>*/}
                        {/*        <label className="hrLabel">*/}
                        {/*            Department Description*/}
                        {/*            <input className="hrTextInput" type="text" name="dDesc"*/}
                        {/*                   value={this.state.department.department_desc}*/}
                        {/*                   onChange={e => this.setState({*/}
                        {/*                       department: {*/}
                        {/*                           ...this.state.department,*/}
                        {/*                           department_desc: e.target.value*/}
                        {/*                       }*/}
                        {/*                   })}/>*/}
                        {/*        </label>*/}
                        {/*    </div>*/}
                        {/*    <div className="departments_addButtonContainer" onClick={this.addDepartment}>*/}
                        {/*        <h7 className="departments_addButton">Employee</h7>*/}
                        {/*    </div>*/}
                        {/*</form>*/}
                    </div>
                    <div className="updateEmployee">
                        <h5 className="hrTitleText">Update Employee's Details</h5>
                    </div>
                    <div className="deleteEmployee">
                        <h5 className="hrTitleText">Delete Employee</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Employees)