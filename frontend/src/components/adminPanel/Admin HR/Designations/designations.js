import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import axios from 'axios';
import Sidebar from "./sidebar";
import "./designations_style.css"
import HRNavbar from "../HRNavBar/hr_navbar";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

class Designations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            searchTerm: "Department1",
            department:{
                department_name:"",
                department_desc:""
            },
            designation:{
                designation_name:"",
                designation_desc:"",
                department: ""
            }
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
                console.log(error)
            })
    }

    addDepartment = () => {
        axios.post('http://localhost:8070/departments/addDepartment',this.state.department)
            .then((res) => {
                axios.get('http://localhost:8070/departments/')
                    .then((res) => {
                        this.setState({
                            departments: res.data,
                            department:{
                                department_name:"",
                                department_desc:""
                            },
                        }, () => console.log("Departments", this.state.departments,"Department",this.state.department))
                    })
                    .catch(error => {
                        console.log(error)
                    })
                alert(res.data.message)
            })
            .catch(error => {
                alert(error.data)
            })
    }
    addDesignation = () => {
        axios.post('http://localhost:8070/designations/addDesignation',this.state.designation)
            .then((res) => {
                axios.get('http://localhost:8070/departments/')
                    .then((res) => {
                        this.setState({
                            departments: res.data,
                            designation:{
                                designation_name:"",
                                designation_desc:"",
                                department: ""
                            }
                        }, () => console.log("Departments", this.state.departments))
                    })
                    .catch(error => {
                        console.log(error)
                    })
                alert(res.data.message)
            })
            .catch(error => {
               alert(error.data)
            })
    }

    render() {
        const {departments} = this.state
        return (
            <div className="designationsMainComponent">
                <HRNavbar/>
                <Sidebar/>
                <div className="designationsSubComponent">
                    <div className="addDepartmentsComponents">
                        <div className="addDepartmentsSubComponent">
                            <h5 className="hrTitleText">Add Departments</h5>
                            <form className="hrForm">
                                <div className="hrFormSub">
                                    <label className="hrLabel">
                                        Department Name
                                        <input className="hrTextInput" type="text" name="dName"
                                               value={this.state.department.department_name}
                                               onChange={e=>this.setState({
                                                   department:{...this.state.department,department_name:e.target.value}
                                               })}/>
                                    </label>
                                    <label className="hrLabel">
                                        Department Description
                                        <input className="hrTextInput" type="text" name="dDesc"
                                               value={this.state.department.department_desc}
                                               onChange={e=>this.setState({
                                                   department:{...this.state.department,department_desc:e.target.value}
                                               })}/>
                                    </label>
                                </div>
                                <div className="designations_addButtonContainer" onClick={this.addDepartment}>
                                    <h7 className="designations_addButton">Add Department</h7>
                                </div>
                            </form>
                        </div>

                        <div className="addDepartmentsSubComponent">
                            <h5 className="hrTitleText">Add Designations</h5>
                            <form className="hrForm">
                                <div className="hrFormSub">
                                    <label className="hrLabel">
                                        Designation Name
                                        <input className="hrTextInput" type="text" name="name"
                                               value={this.state.designation.designation_name}
                                               onChange={e=>this.setState({

                                                   designation:{designation_name:e.target.value}})}/>
                                    </label>
                                    <label className="hrLabel">
                                        Designation Description
                                        <input className="hrTextInput" type="text" name="name"
                                               onChange={e=>this.setState({
                                                   designation:{...this.state.designation,designation_desc:e.target.value}
                                               })}/>
                                    </label>

                                    <label className="hrLabel">
                                        Department
                                        <select className="form-select form-select-sm dropdownbg " defaultValue={""}
                                                onChange={e=>this.setState({
                                                    designation:{...this.state.designation,department:e.target.value}
                                                })}
                                        >
                                            <option disabled  value={""} > -- Select a Department -- </option>
                                            {this.state.departments.map(item => {
                                                return (<option  key={item.Department._id} value={item.Department._id}>{item.Department.department_name}</option>);
                                            })}
                                        </select>
                                    </label>
                                </div>
                                <div className="designations_addButtonContainer">
                                    <h7 className="designations_addButton" onClick={this.addDesignation}>Add Designation</h7>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="departments_table_view">
                        <table className="designationsTable">
                            <tr className="designations_table_head">
                                <th className="designations_table_header_column">Department</th>
                                <th className="designations_table_header_column">Description</th>
                                <th className="designations_table_header_column">More</th>
                            </tr>

                            {(departments.length > 0) ? departments.map((department, index) => {
                                if (index % 2 == 0) {
                                    return (
                                        <tr className="designations_table_data_odd" key={index}>
                                            <td className="designations_table_data_column">{department.Department.department_name}</td>
                                            <td className="designations_table_data_column">{department.Department.department_desc}</td>
                                            <td className="designations_table_data_column_more">
                                                <div
                                                    className="moreButton"
                                                    onClick={() => this.clickMore(department)}
                                                >
                                                    More
                                                </div>
                                            </td>
                                        </tr>

                                    )
                                } else {
                                    return (
                                        <tr className="designations_table_data_even" key={index}>
                                            <td className="designations_table_data_column">{department.Department.department_name}</td>
                                            <td className="designations_table_data_column">{department.Department.department_desc}</td>
                                            <td className="designations_table_data_column_more">
                                                <div
                                                    className="moreButton"
                                                    onClick={() => this.clickMore()}
                                                >
                                                    More
                                                </div>
                                            </td>
                                        </tr>

                                    )
                                }
                            }) :
                                <tr>
                                    <td colSpan="5">Loading...</td>
                                </tr>
                            }
                                </table>
                                </div>
                                </div>
                                </div>
                                );
                            }
                            }

                            export default withRouter(Designations)