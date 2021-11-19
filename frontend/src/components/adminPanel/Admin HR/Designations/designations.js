import React, {Component} from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Sidebar from "./sidebar";
import "./designations_style.css"
import HRNavbar from "../HRNavBar/hr_navbar";

class Designations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            department : this.props.location.state.detail
        }
    }

    componentDidMount() {
        console.log(this.state.department)
    }

    render(){
        const {department} = this.state
        return(
            <div className="designationsMainComponent">
                <HRNavbar/>
                <Sidebar/>
                <div className="designationsSubComponent">
                    <h5 className="hrText">{department.Department.department_name}</h5>
                    <div className="departments_table_view">
                        <table className="designationsTable">
                            <tr className="designations_table_head">
                                <th className="designations_table_header_column">Designation</th>
                                <th className="designations_table_header_column">Description</th>
                                <th className="designations_table_header_column">Delete</th>
                            </tr>

                            {(department.Designations.length > 0) ? department.Designations.map((designation, index) => {
                                    if (index % 2 == 0) {
                                        return (
                                            <tr className="designations_table_data_odd" key={index}>
                                                <td className="designations_table_data_column">{designation.designation_name}</td>
                                                <td className="designations_table_data_column">{designation.designation_desc}</td>
                                                <td className="designations_table_data_column_more">
                                                    <div
                                                        className="moreButton"
                                                        onClick={() => this.delete(designation)}
                                                    >
                                                        Delete
                                                    </div>
                                                </td>
                                            </tr>

                                        )
                                    } else {
                                        return (
                                            <tr className="designations_table_data_even" key={index}>
                                                <td className="designations_table_data_column">{designation.designation_name}</td>
                                                <td className="designations_table_data_column">{designation.designation_desc}</td>
                                                <td className="designations_table_data_column_more">
                                                    <div
                                                        className="moreButton"
                                                        onClick={() => this.delete(designation)}
                                                    >
                                                        Delete
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
export default withRouter(Designations);
