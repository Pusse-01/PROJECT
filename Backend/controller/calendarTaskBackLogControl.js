const { CalendarTaskBackLog } = require("../models/calendar");
const Employee = require("../models/employee");



//create
const createCalendarTaskBlackLog = async (req, res) => {
    try {
        const calendertaskbacklog = await CalendarTaskBackLog.create({
            createdByID: req.params.id,
            calendarlog: {
                id: req.body.id,
                roomId: req.body.roomId,
                exDate: req.body.exDate,
                title: req.body.title,
                rRule: req.body.rRule,
                members: req.body.members,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
            },
        });
        calendertaskbacklog.save();
        res.json(calendertaskbacklog);
    } catch (error) {
        console.log(error);
        res.json(error.message);
    }
};

//Fetch
const fetchCalendarTaskBlackLog = async (req, res) => {
    try {
        const calendertaskbacklog = await CalendarTaskBackLog.find();
        res.json(calendertaskbacklog)
        // res.send(calendertaskbacklog);
        console.log("okay");
        // res.json(calendertaskbacklog);
    } catch (error) {
        console.log("oops");
        res.json(error.message);
    }
};
// / items: { $elemMatch: { id: req.params.id } } 

const fetchCalendarTaskBacklogOne = async (req, res) => {
    try {
        let myID = parseInt(req.params.id);
        const calendertaskbacklog = await CalendarTaskBackLog.findOne({ "calendarlog.id": myID }, { _id: 0, calendarlog: { $elemMatch: { id: myID } } });
        console.log("okay");
        console.log(req.params.id);
        res.json(calendertaskbacklog);
    } catch (error) {
        console.log("oops");
        res.json(error.message);
    }
};

const updateCalendarTaskBacklogOne = async (req, res) => {
    try {
        let myID = parseInt(req.params.id);
        const calendertaskbacklog = await CalendarTaskBackLog.updateOne({ "calendarlog.id"  : { $ne:  myID  }} , {
            calendarlog: {
                id: req.body.id,
                roomId: req.body.roomId,
                exDate: req.body.exDate,
                title: req.body.title,
                rRule: req.body.rRule,
                members: req.body.members,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
            },
        },
            {
                new: true,
                runValidators: false
            }
        );
        console.log("okay");
        res.json(calendertaskbacklog);
    } catch (error) {
        console.log("oops Update");
        res.json(error);
    }
}

const deleteCalendarTaskBacklogOne = async (req, res) => {
    try {
        let myID = parseInt(req.params.id);
        const calendertaskbacklog = await CalendarTaskBackLog.deleteOne({ "calendarlog.id": myID }, { _id: 0, calendarlog: { $elemMatch: { id: myID } } });
        console.log("okay");
        console.log(req.params.id);
        res.json("");
    } catch (error) {
        console.log("oops");
        res.json(error.message);
    }
};

module.exports = {
    createCalendarTaskBlackLog,
    fetchCalendarTaskBlackLog,
    fetchCalendarTaskBacklogOne,
    updateCalendarTaskBacklogOne,
    deleteCalendarTaskBacklogOne,
    //fetchcurretuser,
};


//            startDate: {$gte:moment(req.query.start).toDate()},
//endDate: {$lte:moment(req.query.end).toDate()},

/*
        const currentuser =await Employee.findById(req.params.id);
        const updatecalendertaskbacklog = await CalendarTaskBackLog.findByIdAndUpdate(req.params.id,{
            createdBy:currentuser.createdBy,
        })
*/

