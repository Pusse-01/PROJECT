const { CalendarTaskBackLog } = require("../models/Calendar");
const Employee = require("../models/employee");



//create
const createCalendarTaskBlackLog = async (req, res) => {
    try {
        
        const user =await Employee.findById(req.params.id)
        const calendertaskbacklog = await CalendarTaskBackLog.create({
            title:req.body.title,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            createdBy:user.name,
        });
        console.log("New log added by", user.name, "@", Date());
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

const fetchCalendarTaskBacklogOne = async (req, res) => {
    try {
        const calendertaskbacklog = await CalendarTaskBackLog.findById(
            req.params.id
        );
        console.log("okay");
        res.json(calendertaskbacklog);
    } catch (error) {
        console.log("oops");
        res.json(error.message);
    }
};

const updateCalendarTaskBacklogOne = async (req, res) => {
    try {
        const calendertaskbacklog = await CalendarTaskBackLog.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            createdBy:req.body.createdBy,
        },
            {
                new: true,
                runValidators: true
            }
        );
        console.log("okay");
        res.json(calendertaskbacklog);
    } catch (error) {
        console.log("oops");
        res.json(error);
    }
}
module.exports = {
    createCalendarTaskBlackLog,
    fetchCalendarTaskBlackLog,
    fetchCalendarTaskBacklogOne,
    updateCalendarTaskBacklogOne,
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

