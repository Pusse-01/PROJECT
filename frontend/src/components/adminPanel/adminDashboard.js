import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

class AdminPanel extends Component {
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