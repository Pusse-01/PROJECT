const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema: EmployeeSchema
const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

//Document name: 'employee'
module.export = mongoose.model('employee',EmployeeSchema);