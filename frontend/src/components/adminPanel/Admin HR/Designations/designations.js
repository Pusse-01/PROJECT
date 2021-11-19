import React, {Component} from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Sidebar from "./sidebar";
import "./designations_style.css"
import HRNavbar from "../HRNavBar/hr_navbar";

export  default  class Designations extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){
        return(
            <div className="designationsMainComponent">
                <HRNavbar/>
                <Sidebar/>
                <div className="designationsSubComponent">
                    <h5 className="hrText">This is the Designations Component</h5>
                </div>
            </div>
        );
    }
}