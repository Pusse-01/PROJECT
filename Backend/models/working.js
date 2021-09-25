const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema: EmployeeSchema
const workingprojectSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  projectname: {
    type: String,
    required: true,
  },
  taskname: {
    type: String,
    required: true,
  },
  memo: {
    type: String,
    required: true,
  },
  Stime: {
    type: Date,
  },
  Etime: {
    type: Date,
  },
});

//Document name: 'workingproject'
module.exports = Workingproject = mongoose.model(
  "working",
  workingprojectSchema
);
