const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema: EmployeeSchema
const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//Document name: 'employee'
module.exports = Employee = mongoose.model('employee',EmployeeSchema);