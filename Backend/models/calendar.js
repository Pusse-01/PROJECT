const mongoose = require('mongoose');


const calendarTaskBackLogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },

    startDate: {
        type: Date, //must be Date
        required: [true, 'Start date is required!'],
    },

    endDate: {
        type: Date, 
        required: [true, 'End date is required!'],
    },

    createdBy:{
        type: String,
        required: [true, 'created By is required' ],
    },
},
    {
        timestamps: true,
    }
);

//Compile
const CalendarTaskBackLog = mongoose.model('CalendarTaskBackLog', calendarTaskBackLogSchema);
module.exports = { CalendarTaskBackLog };