const mongoose = require('mongoose');


const calendarTaskBackLogSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'ID is required!'],
    },

    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    exDate: {
        type: String,
        required: [false, 'ExDate is required!'],
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
    roomId: {
        type: Number,
        required: [false, 'Room ID is required!'],
    },
    rRule: {
        type: String,
        required: [false, 'rRule is required!'],
    },
    members: {
        type: Array,
        required: [false, 'Members is required!'],
    },
},
    {
        timestamps: true,
    }
);

//Compile
const CalendarTaskBackLog = mongoose.model('CalendarTaskBackLog', calendarTaskBackLogSchema);
module.exports = { CalendarTaskBackLog };