import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import axios from 'axios';
import Sidebar from "../sidebar";
import "../employees_style.css"
import HRNavbar from "../../HRNavBar/hr_navbar";

class DeleteEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            deleteEmployee: {employee_id: ""},
            deletingDepartmentEmployees: [],
            confirmDeleteContainerStyle:"hideDeleteConfirm",
            confirmDeletion:false,
            errorStyle4: "no_error_message", errorMessage4: "",
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

    selectDeletingEmployeeDepartment = (e) => {
        axios.get('http://localhost:8070/employee/departmentEmployees/' + e.target.value)
            .then((res) => {
                this.setState({
                    deletingDepartmentEmployees: res.data
                })
            })
            .catch(error => {
                alert("Error")
            })
    }

    deleteAccount = () =>{
        if (
            this.state.deleteEmployee.employee_id=="") {
            this.setState({
                errorMessage4: "Please Fill Every Information!",
                errorStyle4: "error_message"
            })
        } else {
            this.setState({
                confirmDeleteContainerStyle:"showDeleteConfirm",
                errorStyle4: "no_error_message"
            })
        }
    }
    cancelDeletion = () => {this.setState({
        confirmDeleteContainerStyle:"hideDeleteConfirm",
        deleteEmployee: {employee_id: ""},

    })}

    continueDeletion = () => {
        this.setState({
            confirmDeleteContainerStyle:"hideDeleteConfirm"
        },()=>{
            axios.post('http://localhost:8070/employee/deleteEmployee', this.state.deleteEmployee)
                .then((res) => {
                    if (res.status == 200) {
                        this.setState({
                            errorMessage4: "Deleting Account Successfully! ",
                            errorStyle4: "error_message",
                            deleteEmployee: {employee_id: ""},
                        })
                    } else {
                        this.setState({
                            errorMessage4: "Could not Update Position ",
                            errorStyle4: "error_message",
                            deleteEmployee: {employee_id: ""},
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        errorMessage4: "Could not Update Position ",
                        errorStyle4: "error_message",
                        deleteEmployee: {employee_id: ""},
                    })
                })
        })
    }

    render() {
        return (
            <div className="hr_employeesMainComponent">
                <HRNavbar/>
                <Sidebar/>
                <div className="hr_employeesSubComponent">
                    <div className="hr_deleteEmployee">
                        <h5 className="hrTitleText">Delete Employee</h5>
                        <form className="hr_employeeForm">
                            <div className="hr_employeeFormSub">
                                <label className="hr_employeeLabel">
                                    Select The Department of Employee
                                    <select className="form-select form-select-sm employee_select "
                                            defaultValue={""}
                                            onChange={e => {
                                                this.selectDeletingEmployeeDepartment(e)
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
                                    Select The Employee To be Deleted
                                    <select className="form-select form-select-sm employee_select "
                                            defaultValue={""}
                                            onChange={e => {
                                                this.setState({
                                                    deleteEmployee: {
                                                        ...this.state.deleteEmployee,
                                                        employee_id: e.target.value
                                                    }
                                                })
                                            }}
                                    >
                                        <option disabled value={""}> -- Select the Employee --</option>
                                        {this.state.deletingDepartmentEmployees.map(item => {
                                            return (<option key={item._id}
                                                            value={item._id}>{item.name} -- {item.email}</option>);
                                        })}
                                    </select>
                                </label>
                                <h7 className={this.state.errorStyle4}>{this.state.errorMessage4}</h7>
                                <div className={this.state.confirmDeleteContainerStyle}>
                                    <h7 className="confirmDeleteText">Do you want to delete the account?</h7>
                                    <div className="deleteButtonsContainer">
                                        <div className="deleteCancelButton" onClick={this.cancelDeletion}><h7>Cancel</h7></div>
                                        <div className="deleteConfirmButton" onClick={this.continueDeletion}><h7>Delete</h7></div>
                                    </div>
                                </div>
                            </div>
                            <div className="employeeButtonsContainer">
                                <div className="hr_employee_menuButtonContainer" onClick={this.changeMenu}>
                                    <h7 className="hr_employee_addButton">Go to Menu</h7>
                                </div>
                                <div className="hr_employee_addButtonContainer" onClick={this.deleteAccount}>
                                    <h7 className="hr_employee_addButton" >Delete Employee</h7>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DeleteEmployee)