import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

class AdminPanel extends Component {
    constructor(props) {
    super(props);
        const loggedInUser = localStorage.getItem("user");
        const founduser = JSON.parse(loggedInUser);
        console.log("Admin panel", founduser)
        this.state = {
            employee: [],
            name: founduser.employee.name,
            id: founduser.employee.id,
            email: founduser.employee.email
        }}
    componentDidMount() {
        document.title = "PROJECT-Admin Panel"
    }

render(){
    return (
        <div>
                <h6 className="text">Admin Panel</h6>
        </div>
    )
}

}

export default withRouter(AdminPanel);