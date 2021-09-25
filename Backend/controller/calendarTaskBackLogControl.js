const { CalendarTaskBackLog } = require("../models/Calendar");

//create
const createCalendarTaskBlackLog = async (req, res) => {
    try {
        const calendertaskbacklog = await CalendarTaskBackLog.create(req.body);
        console.log("okay");
        res.json(calendertaskbacklog);
    } catch (error) {
        console.log("oops");
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
        },
            {
                new: true,
                runValidators: true
            }
        );
        console.log("okay");
        res.json(calendertaskbacklog);
    } catch (error) {
        res.json(error);
    }
}
module.exports = {
    createCalendarTaskBlackLog,
    fetchCalendarTaskBlackLog,
    fetchCalendarTaskBacklogOne,
    updateCalendarTaskBacklogOne,
};


//            startDate: {$gte:moment(req.query.start).toDate()},
//endDate: {$lte:moment(req.query.end).toDate()},