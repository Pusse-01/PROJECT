import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import axios from 'axios';
import Clientsidebar from "./clientsidebar";
import "./clientshomestyle.css"


const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const currentt = new Date();
             // By default US English uses 12hr time with AM/PM
const time = currentt.toLocaleTimeString("en-US");

class Clients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            employees:[],
            searchTerm: "Client1",
            client: {
                client_name: "",
                client_venue: "",
                client_desc: ""
                
            },
            contract: {
                contract_name: "",
                contract_desc: ""
            }
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8070/clients/')
            .then((res) => {
                axios.get('http://localhost:8070/employee/allEmployees')
                    .then((res2) => {
                        let temEmployees = res2.data
                        console.log(temEmployees)
                        let noDepEmployees = temEmployees.filter(val=>{
                            if(val.client==""||val.client==null){
                                return val
                            }
                        })
                        this.setState({
                            employees: noDepEmployees
                        },()=>console.log(this.state.employees))
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.setState({
                    clients: res.data
                }, () => console.log("Clients", this.state.clients))
            })
            .catch(error => {
                console.log(error)
            })
    }

    addClient= () => {
        axios.post('http://localhost:8070/clients/addClients', this.state.client)
            .then((res) => {
                axios.get('http://localhost:8070/clients/')
                    .then((res) => {
                        this.setState({
                            clients: res.data,
                            client: {
                                client_name: "",
                                client_venue: "",
                                client_desc: "",
                                client_date: {date},
                                client_time: {time},
                                
                            },
                        }, () => console.log("Clients", this.state.clients, "Client", this.state.client))
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
        axios.post('http://localhost:8070/contracts/addContract', this.state.designation)
            .then((res) => {
                axios.get('http://localhost:8070/clients/')
                    .then((res) => {
                        this.setState({
                            clients: res.data,
                            designation: {
                                contract_name: "",
                                contract_desc: "",
                                
                            }
                        }, () => console.log("Clients", this.state.clients))
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
        const {clients} = this.state
        return (
            <div className="clientsMainComponent">
                <Clientsidebar noDepEmployees={this.state.employees}/>
                <div className="clientsSubComponent">
                    <div className="addClientsComponents">
                        <div className="addclientsSubComponent">
                            <h5 className="hrTitleText">Add Client</h5>
                            <form className="hrForm">
                                <div className="hrFormSub">
                                    <label className="hrLabel">
                                        Client Name
                                        <input className="hrTextInput" type="text" name="dName"
                                               value={this.state.client.client_name}
                                               onChange={e => this.setState({
                                                client: {
                                                       ...this.state.client,
                                                       client_name: e.target.value
                                                   }
                                               })}/>
                                    </label>
                                    <label className="hrLabel">
                                        Venue
                                        <input className="hrTextInput" type="text" name="dDesc"
                                               value={this.state.client.client_desc}
                                               onChange={e => this.setState({
                                                client: {
                                                       ...this.state.client,
                                                       client_desc: e.target.value
                                                   }
                                               })}/>
                                    </label>
                                    <label className="hrLabel">
                                        Description
                                        <input className="hrTextInput" type="text" name="dDesc"
                                               value={this.state.client.client_venue}
                                               onChange={e => this.setState({
                                                client: {
                                                       ...this.state.client,
                                                       client_venue: e.target.value
                                                   }
                                               })}/>
                                    </label>
                                </div>
                                <div className="clients_addButtonContainer" onClick={this.addClient}>
                                    <h7 className="clients_addButton">Add Client</h7>
                                </div>
                            </form>
                        </div>

                        <div className="addclientsSubComponent">
                            <h5 className="hrTitleText">Add Contract</h5>
                            <form className="hrForm">
                                <div className="hrFormSub">
                                    <label className="hrLabel">
                                        Contract
                                        <input className="hrTextInput" type="text" name="name"
                                               value={this.state.designation.designation_name}
                                               onChange={e => this.setState({

                                                   designation: {designation_name: e.target.value}
                                               })}/>
                                    </label>
                                    <label className="hrLabel">
                                        Description
                                        <input className="hrTextInput" type="text" name="name"
                                               onChange={e => this.setState({
                                                   designation: {
                                                       ...this.state.designation,
                                                       designation_desc: e.target.value
                                                   }
                                               })}/>
                                    </label>

                                </div>
                                <div className="clients_addButtonContainer">
                                    <h7 className="clients_addButton" onClick={this.addDesignation}>Add
                                    Contract
                                    </h7>
                                </div>
                            </form>
                        </div>
                    </div>

    
                    <div>
      <div class="bodyapper1">
        <a href="http://localhost:3000/showclients">
          <button class="button h-50 border border-success rounded text-light bg-dark"><br></br><br></br><br></br><br></br><h1>Meeting</h1></button>
        </a>
      </div>
  
      </div>

           
           

      </div>

</div>
        );
    }
}

export default withRouter(Clients)