const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Designations
const designationsSchema = new Schema({
    designation_name : {
        type : String,
        required: true
    },
    designation_desc : {
        type : String,
        required: true
    },
    department : {
        type : String,
        required: true
    },
    employees : {
        type : [{type:String,required: true }]
    }
});

const Designations = mongoose.model('Designations',designationsSchema)
module.exports = Designations