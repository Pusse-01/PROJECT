import React, {Component} from 'react'
import axios from 'axios';
import {withRouter} from "react-router-dom";
import "./showclientstyle.css"


const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const currentt = new Date();
             // By default US English uses 12hr time with AM/PM
const time = currentt.toLocaleTimeString("en-US");

class Showcontracts extends Component {

    render() {
        const {clients} = this.state
        return (<div className="clients_table_view">
        <table className="clientsTable">
            <tr className="clients_table_head">
                <th className="clients_table_header_column">Contract Name</th>
                <th className="clients_table_header_column">Description</th>
                <th className="clients_table_header_column">added Date</th>
                <th className="clients_table_header_column">added Time</th>
            </tr>

            {(clients.length > 0) ? clients.map((client, index) => {
                    if (index % 2 == 0) {
                        return (
                            <tr className="clients_table_data_odd" key={index}>
                                <td className="clients_table_data_column">{contract.contract.contract_name}</td>
                                <td className="clients_table_data_column">{contract.contract.contract_desc}</td>
                                <td className="clients_table_data_column">{date}</td>
                                <td className="clients_table_data_column">{time}</td>
                            </tr>

                        )
                    } else {
                        return (
                            <tr className="clients_table_data_even" key={index}>
                                <td className="clients_table_data_column">{contract.contract.contract_name}</td>
                                <td className="clients_table_data_column">{contract.contract.contract_desc}</td>
                                <td className="clients_table_data_column">{date}</td>
                                <td className="clients_table_data_column">{time}</td>
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
        );
    }
}
export default withRouter(Showcontracts)