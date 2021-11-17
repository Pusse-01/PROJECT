import React, {Component} from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Sidebar from "./sidebar";
import "./employees_style.css"
import HRNavbar from "../HRNavBar/hr_navbar";

class Employees extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){
        return(
            <div className="employeesMainComponent">
                <HRNavbar/>
                <Sidebar/>
                <div className="employeesSubComponent">
                    <h5 className="hrText">This is the Employees Component</h5>
                </div>
            </div>
        );
    }
}

export default withRouter(Employees)