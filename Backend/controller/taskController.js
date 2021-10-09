const Task = require('../models/task')

// ==============================================================
// ===================== FOR THE EMPLOYEES ======================
// ==============================================================

// ******************** Get A Task By Id ************************
const getTaskById = (req,res,next) => {

    if(req.body.task_id==null){
        res.json({
            message : "The task id is empty"
        })
    }else{
        Task.findById(req.body.task_id)
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(error => {
                res.json({
                    message : 'An error occurred!'
                })
            })
    }
}

// ****************** Get tasks by assign_to ********************
const getTasksByAssignedTo = (req,res) => {
    if(req.body.assigned_to==null){
        res.json({
            message : "The employee id is empty"
        })
    }else{
        Task.find({ assigned_to : req.body.assigned_to })
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(error => {
                res.json({
                    message : 'An error occurred!'
                })
            })
    }
}

// **************** Update a task status  ***********************
const updateStatus = (req,res) => {
    let status = req.body.task_status
    let task_id = req.body.task_id

    if(status==null||task_id==null){
        res.json({
            message : "One or more of request parameters are empty."
        })
    }else{

        if(status == "To do" || status == "In Progress" ||status == "Done" ||
        status == "Bugs/Issues" || status == "Review" ){
            let updated_task = {
                task_status : req.body.task_status
            }
            Task.findByIdAndUpdate(task_id,updated_task)
                .then(response => {
                    res.json({
                        message : "Task was updated successfully"
                    })
                })
                .catch(error => {
                    res.json({
                        message : "An error was occurred."
                    })
                })
        }else{
            res.json({
                message : "Invalid status."
            })
        }

    }

}

// ==============================================================
// ================== FOR THE ADMIN PANEL =======================
// ==============================================================

// ************* Show the list of tasks *************************
const index = (req,res,next) => {
    Task.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message : 'An error occurred!' + error
            })
        })
}

// ******************* Get tasks by name ************************
const getTasksByName = (req,res) => {

    if(req.body.project_id==null||req.body.task_name==null){
        res.json({
            message : "Project Id or Task Name is empty"
        })
    }else{
        Task.find({project_id : req.body.project_id , task_name : req.body.task_name})
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(error => {
                res.json({
                    message : 'An error occurred!'
                })
            })
    }
}

// ****************** Get tasks for a project *******************
const getTasksOfProject = (req,res) => {

    if(req.body.project_id==null){
        res.json({
            message : "Project Id is empty"
        })
    }else{
        Task.find({project_id : req.body.project_id})
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(error => {
                res.json({
                    message : 'An error occurred!'
                })
            })
    }
}

// *********************** Add a task ***************************
const addTask = (req,res) => {
    let task_name = req.body.task_name;
    let due_date = req.body.due_date;
    let more_details = req.body.more_details;
    let task_status = req.body.task_status;
    let project_id = req.body.project_id;
    let action = req.body.action
    let assigned_to = req.body.assigned_to;

    if(task_name==null||due_date==null||more_details==null||task_status==null||
    project_id==null||action==null||assigned_to==null){
        res.json({
            message : "One or more of request paramaters are empty."
        })
    }else{

        if(task_status == "To do" || task_status == "In Progress" || task_status == "Done" ||
            task_status == "Bugs/Issues" || task_status == "Review" ){

            let task = new Task({
                task_name : task_name,
                due_date : due_date,
                more_details : more_details,
                task_status : task_status,
                project_id : project_id,
                action : action,
                assigned_to : assigned_to
            })

            task.save()
                .then(response => {
                    res.json({
                        message : 'Successfully task was added.'
                    })
                })
                .catch(error => {
                    res.json({
                        message : error
                    })
                })
        }else{
            res.json({
                message : "Invalid Status."
            })
        }
    }
}

// ******************** Update a task ***************************
const update = (req,res) => {
    let task_id = req.body.task_id;
    let task_name = req.body.task_name;
    let due_date = req.body.due_date;
    let more_details = req.body.more_details;
    let task_status = req.body.task_status;
    let project_id = req.body.project_id;
    let action = req.body.action
    let assigned_to = req.body.assigned_to;

    if(task_id==null){
        res.json({
            message : "One or more of request parameters are empty."
        })
    }else{
        if(task_status == "To do" || task_status == "In Progress" ||task_status == "Done" ||
            task_status == "Bugs/Issues" || task_status == "Review" ){
            let updated_task = {
                task_name : task_name,
                due_date : due_date,
                more_details : more_details,
                task_status : task_status,
                project_id : project_id,
                action : action,
                assigned_to : assigned_to
            }
            Task.findByIdAndUpdate(task_id,updated_task)
                .then(response => {
                    res.json({
                        message : "Task was updated successfully"
                    })
                })
                .catch(error => {
                    res.json({
                        message : error
                    })
                })
        }else{
            res.json({
                message : "Invalid Status."
            })
        }
    }
}

// ******************** Delete A Task ***************************

const deleteTask= (req,res) => {

    if(req.body.task_id==null){
        res.json({
            message : "Task Id is empty"
        })
    }else{
        Task.findByIdAndDelete(req.body.task_id)
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(error => {
                res.json({
                    message : 'An error occurred!'
                })
            })
    }
}

module.exports = {
    getTaskById,
    getTasksByAssignedTo,
    updateStatus,
    index,
    getTasksOfProject,
    getTasksByName,
    addTask,
    update,
    deleteTask
}