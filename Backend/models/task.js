const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Task
const taskSchema = new Schema({
    task_name : {
        type : String
    },
    due_date : {
        type : Date
    },
    more_details : {
        type : String
    },
    task_status : {
        type : String
    },
    project_id : {
        type : String
    },
    action : {
        type : String
    },
    assigned_to : {
        type : String
    }
});

const Tasks = mongoose.model('Tasks',taskSchema)
module.exports = Tasks