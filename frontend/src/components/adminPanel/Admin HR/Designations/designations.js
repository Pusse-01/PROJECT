import React, {Component} from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Sidebar from "./sidebar";
import "./designations_style.css"
import HRNavbar from "../HRNavBar/hr_navbar";

class Designations extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){

        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ]

        return(
            <div className="designationsMainComponent">
                <HRNavbar/>
                <Sidebar/>
                <div className="designationsSubComponent">
                    <div className="departmentsComponent">
                        <div className="departmentsSubComponent">
                            <h5 className="hrTitleText">Departments</h5>
                            <form className="hrForm">
                                <label className="hrLabel">
                                    Department Name
                                    <input className="hrTextInput" type="text" name="name" />
                                </label>
                                <label className="hrLabel">
                                    Department Description
                                    <input className="hrTextInput" type="text" name="name" />
                                </label>
                                <label className="hrLabel">
                                    Designations
                                    <select className="form-select form-select-sm dropdownbg ">
                                        <option disabled  defaultValue selected> -- Select a Project -- </option>
                                        {options.map(item => {
                                            return (<option  key={item.value} value={item.value}>{item.value}</option>);
                                        })}
                                    </select>
                                </label>
                                <label className="hrLabel">
                                    Department
                                    <select className="form-select form-select-sm dropdownbg ">
                                        <option disabled  defaultValue selected> -- Select a Project -- </option>
                                        {options.map(item => {
                                            return (<option  key={item.value} value={item.value}>{item.value}</option>);
                                        })}
                                    </select>
                                </label>
                                <div>
                                    <h7>Add Department</h7>
                                </div>
                            </form>
                        </div>

                        <div className="departmentsSubComponent">
                            <h5 className="hrTitleText">Designations</h5>
                            <form className="hrForm">
                                <label className="hrLabel">
                                    Designation Name
                                    <input className="hrTextInput" type="text" name="name" />
                                </label>
                                <label className="hrLabel">
                                    Designation Description
                                    <input className="hrTextInput" type="text" name="name" />
                                </label>
                                <label className="hrLabel">
                                    Department
                                    <select className="form-select form-select-sm dropdownbg ">
                                        <option disabled  defaultValue selected> -- Select a Project -- </option>
                                        {options.map(item => {
                                            return (<option  key={item.value} value={item.value}>{item.value}</option>);
                                        })}
                                    </select>
                                </label>
                                <div>
                                    <h7>Add Designation</h7>
                                </div>
                            </form>
                        </div>

                    </div>

                    <div className="employeesComponent">

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Designations)