const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema: ProjectSchema
const ProjectSchema = new Schema({
    name: { type: String, required: true, unique: true},
    members: { type: [{ type: String, required: true }] },
    administrators: { type: [{ type: String, required: true }]},
    discription: {type: String}

})

//Document name: 'project'
module.exports = Project = mongoose.model('project',ProjectSchema);