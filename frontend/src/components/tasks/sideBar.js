import React, {Component} from 'react'
import "./tasksStyle.css"

// **** Import this file and use it in each component ********
export default class Sidebar extends Component{

    state = {
        selected:"All"
    }

    filterTasks = (selected) =>{
        console.log(selected)
        this.setState({
            selected:selected
        },()=>{this.props.filterTasks(selected)})
    }

    render(){

        let allStyle = this.state.selected=="All" ? "tasksAllSelected" : "tasksAll"
        let toDoStyle = this.state.selected=="To Do" ? "tasksToDoSelected" : "tasksToDo"
        let inProgressStyle = this.state.selected=="In Progress" ? "tasksInProgressSelected" : "tasksInProgress"
        let doneStyle = this.state.selected=="Done" ? "tasksDoneSelected" : "tasksDone"
        let bugsStyle = this.state.selected=="Bugs/Issues" ? "tasksBugsSelected" : "tasksBugs"
        let reviewStyle = this.state.selected=="Review" ? "tasksReviewSelected" : "tasksReview"

        return(
            <div className="sideBarTasksComponent">
                <h4 className="sidebarTasksHeader">Filter Status</h4>
                <div className="sideBarTasksSubContainer">
                    <div className="taskElement" id={allStyle} onClick= {() => {
                        this.filterTasks("All")
                    }}>
                        <h6 className="taskElementText">All</h6>
                    </div>
                    <div className="taskElement" id={toDoStyle} onClick= {() => {
                        this.filterTasks("To Do")
                    }}>
                        <h6 className="taskElementText">To Do</h6>
                    </div>
                    <div className="taskElement" id={inProgressStyle} onClick= {() => {
                        this.filterTasks("In Progress")
                    }}>
                        <h6 className="taskElementText">In Progress</h6>
                    </div>
                    <div className="taskElement" id={doneStyle} onClick= {() => {
                        this.filterTasks("Done")
                    }}>
                        <h6 className="taskElementText">Done</h6>
                    </div>
                    <div className="taskElement" id={bugsStyle} onClick= {() => {
                        this.filterTasks("Bugs/Issues")
                    }}>
                        <h6 className="taskElementText">Bugs / Issues</h6>
                    </div>
                    <div className="taskElement" id={reviewStyle} onClick= {() => {
                        this.filterTasks("Review")
                    }}>
                        <h6 className="taskElementText">Review</h6>
                    </div>
                </div>
            </div>
        )
    }
}