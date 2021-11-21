import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import axios from 'axios';
import Sidebar from "../sidebar";
import "../employees_style.css"
import HRNavbar from "../../HRNavBar/hr_navbar";

class UpdatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            designations:[],
            confirmPassword: "",
            selectedDepartmentId: "",
            errorStyle2: "no_error_message", errorMessage2: "",
            updateEmployee: {employee_id: "", new_password: ""},
            updatingDepartmentEmployees: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8070/departments/')
            .then((res) => {
                this.setState({
                    departments: res.data
                }, () => console.log("Departments", this.state.departments))
            })
            .catch(error => {
                console.log(this.state.registerEmployee)
            })
    }

    changeMenu = (menu) => {
        this.props.history.push("menu")
    }

    selectUpdatingEmployeeDepartment = (e) => {
        axios.get('http://localhost:8070/employee/departmentEmployees/' + e.target.value)
            .then((res) => {
                this.setState({
                    updatingDepartmentEmployees: res.data
                })
            })
            .catch(error => {
                alert("Error")
            })
    }

    updatePassword = () => {
        console.log(this.state.updateEmployee,this.state.confirmPassword)
        this.setState({
            errorStyle2: "no_error_message"
        }, () => {
            if (
                this.state.updateEmployee.new_password == "" ||
                this.state.updateEmployee.employee_id == "" ||
                this.state.confirmPassword == "") {
                this.setState({
                    errorMessage2: "Please Fill Every Information!",
                    errorStyle2: "error_message"
                })
            } else {
                if(this.state.updateEmployee.new_password == this.state.confirmPassword){
                    axios.post('http://localhost:8070/employee/updatePasswordAdmin', this.state.updateEmployee)
                        .then((res) => {
                            if (res.status == 200) {
                                this.setState({
                                    errorMessage2: "Password Updated Successfully! ",
                                    errorStyle2: "error_message",
                                    updateEmployee: {employee_id: "", new_password: ""},
                                    confirmPassword: ""
                                })
                            } else {
                                this.setState({
                                    errorMessage2: "Could not Update Password ",
                                    errorStyle2: "error_message",
                                    updateEmployee: {employee_id: "", new_password: ""},
                                    confirmPassword: ""
                                })
                            }
                        })
                        .catch(error => {
                            this.setState({
                                errorMessage2: "Could not Update Password",
                                errorStyle2: "error_message",
                                updateEmployee: {employee_id: "", new_password: ""},
                                confirmPassword: ""
                            })
                        })
                }else{
                    this.setState({
                        errorMessage2: "Passwords Do Not Match!",
                        errorStyle2: "error_message"
                    })
                }
            }
        })
    }
    render() {
        return (
            <div className="hr_employeesMainComponent">
                <HRNavbar/>
                <Sidebar/>
                <div className="hr_employeesSubComponent">
                    <div className="hr_updateEmployee">
                        <h5 className="hrTitleText">Update Employee's Password</h5>
                        <form className="hr_employeeForm">
                            <div className="hr_employeeFormSub">
                                <label className="hr_employeeLabel">
                                    Password
                                    <input
                                        value={this.state.updateEmployee.password}
                                        className="hr_employeeTextInput"
                                        type="password"
                                        placeholder="Enter Password"
                                        onChange={e => {
                                            this.setState({
                                                updateEmployee: {
                                                    ...this.state.updateEmployee,
                                                    new_password: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </label>

                                <label className="hr_employeeLabel">
                                    Confirm Password
                                    <input
                                        value={this.state.confirmPassword}
                                        className="hr_employeeTextInput"
                                        type="password"
                                        placeholder="Confirm Password"
                                        onChange={e => {
                                            this.setState({
                                                confirmPassword: e.target.value
                                            })
                                        }}
                                    />
                                </label>
                                <label className="hr_employeeLabel">
                                    Select The Department of Employee
                                    <select className="form-select form-select-sm employee_select "
                                            defaultValue={""}
                                            onChange={e => {
                                                this.selectUpdatingEmployeeDepartment(e)
                                            }}
                                    >
                                        <option disabled value={""}> -- Select The Department--</option>
                                        {this.state.departments.map(item => {
                                            return (<option key={item.Department._id}
                                                            value={item.Department._id}>{item.Department.department_name}</option>);
                                        })}
                                    </select>
                                </label>
                                <label className="hr_employeeLabel">
                                    Select The Employee To be Updated
                                    <select className="form-select form-select-sm employee_select "
                                            defaultValue={""}
                                            onChange={e => {
                                                this.setState({
                                                    updateEmployee: {
                                                        ...this.state.updateEmployee,
                                                        employee_id: e.target.value
                                                    }
                                                })
                                            }}
                                    >
                                        <option disabled value={""}> -- Select the Employee --</option>
                                        {this.state.updatingDepartmentEmployees.map(item => {
                                            return (<option key={item._id}
                                                            value={item._id}>{item.name} -- {item.email}</option>);
                                        })}
                                    </select>
                                </label>
                                <h7 className={this.state.errorStyle2}>{this.state.errorMessage2}</h7>
                            </div>
                            <div className="employeeButtonsContainer">
                                <div className="hr_employee_menuButtonContainer" onClick={this.changeMenu}>
                                    <h7 className="hr_employee_addButton">Go to Menu</h7>
                                </div>
                                <div className="hr_employee_addButtonContainer" onClick={this.updatePassword}>
                                    <h7 className="hr_employee_addButton">Update Password</h7>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UpdatePassword)