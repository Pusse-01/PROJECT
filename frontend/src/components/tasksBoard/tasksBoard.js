import React, {Component} from 'react'
import { withRouter } from "react-router-dom";
import "./taskBoardStyles.css"
import Sidebar from "./sideBar";
import {red} from "@material-ui/core/colors";
class TasksBoard extends Component{
    state = {
        tasks: [
            {taskName:"task1",project:"project",status:"toDo",dueDate:"1st November",action:"",assignedTo:""},
            {taskName:"task2",project:"project",status:"toDo",dueDate:"1st November",action:"",assignedTo:""},
            {taskName:"task3",project:"project",status:"inProgress",dueDate:"1st November",action:"",assignedTo:""},
            {taskName:"task4",project:"project",status:"toDo",dueDate:"1st November",action:"",assignedTo:""},
            {taskName:"task5",project:"project",status:"inProgress",dueDate:"1st November",action:"",assignedTo:""},
            {taskName:"task6",project:"project",status:"toDo",dueDate:"1st November",action:"",assignedTo:""},
            {taskName:"task7",project:"project",status:"done",dueDate:"1st November",action:"",assignedTo:""},
            {taskName:"task8",project:"project",status:"done",dueDate:"1st November",action:"",assignedTo:""},
            {taskName:"task9",project:"project",status:"bugs",dueDate:"1st November",action:"",assignedTo:""},
            {taskName:"task10",project:"project",status:"bugs",dueDate:"1st November",action:"",assignedTo:""},
            {taskName:"task11",project:"project",status:"review",dueDate:"1st November",action:"",assignedTo:""}
        ]
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, stat) => {
        let id = ev.dataTransfer.getData("id");

        let tasks = this.state.tasks.filter((task) => {
            if (task.taskName == id) {
                task.status = stat;
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

        this.state.tasks.forEach ((t) => {
            tasks[t.status].push(
                <div key={t.taskName}
                     onDragStart = {(e) => this.onDragStart(e, t.taskName)}
                     draggable
                     className={t.status}
                >
                    <h7>{t.taskName}</h7>
                    <h7>{t.project}</h7>
                </div>
            );
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
                            onDrop={(e)=>{this.onDrop(e, "toDo")}}
                        >
                            <h6 className="statusBarTitle">To do</h6>
                            {tasks.toDo}
                        </div>
                        <div
                            className="statusBar"
                            id="inProgress"
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, "inProgress")}}>
                            <h6 className="statusBarTitle">In Progress</h6>
                            {tasks.inProgress}
                        </div>
                        <div
                            className="statusBar"
                            id="done"
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, "done")}}
                        >
                            <h6 className="statusBarTitle">Done</h6>
                            {tasks.done}
                        </div>
                        <div
                            className="statusBar"
                            id="bugs"
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, "bugs")}}
                        >
                            <h6 className="statusBarTitle">Bugs / Issues</h6>
                            {tasks.bugs}
                        </div>
                        <div
                            className="statusBar"
                            id="review"
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, "review")}}
                        >
                            <h6 className="statusBarTitle">In Progress</h6>
                            {tasks.review}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(TasksBoard);