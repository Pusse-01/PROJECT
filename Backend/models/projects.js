const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema: ProjectSchema
const ProjectSchema = new Schema({
    projectName: { type: String, required: true},
    key: { type: String, required: true, unique: true },
    members: { type: [{ type: String, unique: true }] },
    administrators: { type: [{ type: String, unique: true }] },

})

//Document name: 'employee'
module.exports = Employee = mongoose.model('project',ProjectSchema);