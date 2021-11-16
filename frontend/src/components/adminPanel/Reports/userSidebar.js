import React, {Component} from 'react'
import "./reportsSidebar.css";
import { withRouter } from "react-router-dom";




class UserSidebar extends Component{
    constructor(props) {
        super(props);
        const loggedInUser = localStorage.getItem("user");
        const founduser = JSON.parse(loggedInUser);
        this.state = {
            user: [],
            name: founduser.employee.name,
            id: founduser.employee.id,
            email: founduser.employee.email,
        }
    }
    
    
    componentDidMount() {

        fetch('http://localhost:8070/employee/user/' + this.state.email)
            .then(response => response.json())
            .then((response) => this.setState({
                user: response,

            }));

        //added by Malaka, will change your project page title - delete after read :)
        document.title = "PROJECT"
    }

    render(){
        const {user}  = this.state;
        return(
            <div className="reportsSideBarComponent">
                {user.map(user =>
                <div className="userReportsSideBarComponent">
                
                    <div class="container">
                        <img src={require('../../../assests/images/avatar.jpeg').default}  className="image" />
                        *<div className="middle">
                            <div className="usersidebartext">{user.name}</div>
                        </div>
        </div>

                    <h6 className="reportsSidebarText">{user.name}</h6>
                    <h6 className="reportsSidebarText">{user.position}</h6>
                    <h6 className="reportsSidebarText">{user.email}</h6>

               
                </div>
                )}
            </div>
        )}
        
}
export default withRouter(UserSidebar);