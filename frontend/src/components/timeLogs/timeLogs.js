import React, {Component} from 'react'
import Timelogssidebar from "./timeLogsSideBar";
import { withRouter } from "react-router-dom";
import axios from 'axios'; 
import "./timeLogs.css"

class TimeLogs extends Component{

constructor(props) {
        super(props);
        const loggedInUser = localStorage.getItem("user");
        const founduser = JSON.parse(loggedInUser);
        this.state = {
            tasks: [],
            error:"",
            name: founduser.employee.name,
            id: founduser.employee.id,
            email: founduser.employee.email
        }
    }

    async componentDidMount() {
        // POST request using fetch with async/await
        console.log(this.state.id);
        axios.post('http://localhost:8070/task/getTaskByAssignedTo/',{'assigned_to':this.state.id})
            .then((res)=>{
                this.setState({
                    tasks :res.data.response,
                    error:"error"
                });
                console.log(this.state.tasks)

            })
            .catch(error=>{console.log(error)})
    }







    render(){
        return(
            <div className="timeLogsMainComponent">
                 <Timelogssidebar/>
                <div className="timeLogsSubComponent">̵
                    <div className="searchBar">
                        <div className="blankColumn"></div>
                        <img className="searchIcon" src={require('../../assests/images/redSearch2.png').default}/>
                        <h5 className="searchText">Search</h5>
                    </div>

                    <table className="timeLogsTable">
                        <tr className="table_head">
                            <th className="table_header_column">Task</th>
                            <th className="table_header_column">Start Time</th>
                            <th className="table_header_column">End Time</th>
                            <th className="table_header_column">Total Hours</th>
                            <th className="table_header_column">Memo</th>
                            <th className="table_header_column">Who Logged</th>
                        </tr>
                        <tr className="table_data_odd">
                            <td className="table_data_column">Task 1</td>
                            <td className="table_data_column">08:00</td>
                            <td className="table_data_column">17:00</td>
                            <td className="table_data_column">15 Hours</td>
                            <td className="table_data_column">ABC</td>
                            <td className="table_data_column">AKASH</td>
                        </tr>
                        <tr className="table_data_even">
                            <td className="table_data_column">Task 1</td>
                            <td className="table_data_column">08:00</td>
                            <td className="table_data_column">17:00</td>
                            <td className="table_data_column">15 Hours</td>
                            <td className="table_data_column">ABC</td>
                            <td className="table_data_column">AKASH</td>
                        </tr>
                        <tr className="table_data_odd">
                            <td className="table_data_column">Task 1</td>
                            <td className="table_data_column">08:00</td>
                            <td className="table_data_column">17:00</td>
                            <td className="table_data_column">15 Hours</td>
                            <td className="table_data_column">ABC</td>
                            <td className="table_data_column">AKASH</td>
                        </tr>
                        <tr className="table_data_even">
                            <td className="table_data_column">Task 1</td>
                            <td className="table_data_column">08:00</td>
                            <td className="table_data_column">17:00</td>
                            <td className="table_data_column">15 Hours</td>
                            <td className="table_data_column">ABC</td>
                            <td className="table_data_column">AKASH</td>
                        </tr>
                        <tr className="table_data_odd">
                            <td className="table_data_column">Task 1</td>
                            <td className="table_data_column">08:00</td>
                            <td className="table_data_column">17:00</td>
                            <td className="table_data_column">15 Hours</td>
                            <td className="table_data_column">ABC</td>
                            <td className="table_data_column">AKASH</td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}
export default withRouter(TimeLogs);