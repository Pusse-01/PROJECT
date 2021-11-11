import React, {Component} from 'react'
import { withRouter } from "react-router-dom";
import "./taskBoardStyles.css"
import Sidebar from "./sideBar";
import {red} from "@material-ui/core/colors";
import axios from "axios";
class TasksBoard extends Component{

    constructor(props) {
        super(props);
        const loggedInUser = localStorage.getItem("user");
        const founduser = JSON.parse(loggedInUser);
        this.state = {
            tasks2:[],
            error:"",
            name: founduser.employee.name,
            id: founduser.employee.id,
            email: founduser.employee.email
        }
    }

    async componentDidMount() {
        // POST request using fetch with async/await
        axios.post('http://localhost:8070/task/getTaskByAssignedTo/',{'assigned_to':this.state.id})
            .then((res)=>{
                this.setState({
                    tasks2 :res.data.response,
                    error:"error"
                });

            })
            .catch(error=>{console.log(error)})
    }

    onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    async onDrop(ev, stat){
        let id = ev.dataTransfer.getData("id");

        let tasks = this.state.tasks2.filter((task) => {
            if (task._id == id) {
                task.task_status = stat;
                console.log(task)
                axios.post('http://localhost:8070/task/updateStatus',{'task_status':stat,'task_id':task._id})
                    .then((res)=>{
                         console.log(res)
                    })
                    .catch(error=>{console.log(error)})
            }
            return task;
        });

        this.setState({
            ...this.state,
            tasks
        });
    }

    render(){
        var tasks = {
            toDo:[],
            inProgress:[],
            done:[],
            bugs:[],
            review:[]
        }

        this.state.tasks2.forEach ((t) => {
            if(t.task_status=="To Do"){
                tasks["toDo"].push(
                    <div key={t._id}
                         onDragStart = {(e) => this.onDragStart(e, t._id)}
                         draggable
                         className="toDo"
                    >
                        <h7>{t.task_name}</h7>
                    </div>
                );
            }else if(t.task_status=="In Progress"){
                tasks["inProgress"].push(
                    <div key={t._id}
                         onDragStart = {(e) => this.onDragStart(e, t._id)}
                         draggable
                         className="inProgress"
                    >
                        <h7>{t.task_name}</h7>
                    </div>
                );

            }else if(t.task_status=="Done"){
                tasks["done"].push(
                    <div key={t._id}
                         onDragStart = {(e) => this.onDragStart(e, t._id)}
                         draggable
                         className="done"
                    >
                        <h7>{t.task_name}</h7>
                    </div>
                );
            }else if(t.task_status=="Bugs/Issues"){
                tasks["bugs"].push(
                    <div key={t._id}
                         onDragStart = {(e) => this.onDragStart(e, t._id)}
                         draggable
                         className="bugs"
                    >
                        <h7>{t.task_name}</h7>
                    </div>
                );
            }else if(t.task_status=="Review"){
                tasks["review"].push(
                    <div key={t._id}
                         onDragStart = {(e) => this.onDragStart(e, t._id)}
                         draggable
                         className="review"
                    >
                        <h7>{t.task_name}</h7>
                    </div>
                );
            }

        });

        return(
            <div className="tasksBoardComponent">
                <Sidebar/>
                <div className="tasksBoardSubComponent">
                    <div className="header">
                        <h4>Tasks Board</h4>
                        <h7 className="normalText">Drag and Drop to Change the Status</h7>
                    </div>
                    <div className="statusBarContainer">
                        <div
                            className="statusBar"
                            id="toDo"
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, "To Do")}}
                        >
                            <h6 className="statusBarTitle">To do</h6>
                            {tasks.toDo}
                        </div>
                        <div
                            className="statusBar"
                            id="inProgress"
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, "In Progress")}}>
                            <h6 className="statusBarTitle">In Progress</h6>
                            {tasks.inProgress}
                        </div>
                        <div
                            className="statusBar"
                            id="done"
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, "Done")}}
                        >
                            <h6 className="statusBarTitle">Done</h6>
                            {tasks.done}
                        </div>
                        <div
                            className="statusBar"
                            id="bugs"
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, "Bugs/Issues")}}
                        >
                            <h6 className="statusBarTitle">Bugs / Issues</h6>
                            {tasks.bugs}
                        </div>
                        <div
                            className="statusBar"
                            id="review"
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, "Review")}}
                        >
                            <h6 className="statusBarTitle">Review</h6>
                            {tasks.review}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(TasksBoard);