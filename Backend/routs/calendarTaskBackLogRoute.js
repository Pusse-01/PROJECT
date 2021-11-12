const express = require('express');
const { createCalendarTaskBlackLog, fetchCalendarTaskBlackLog, fetchCalendarTaskBacklogOne, updateCalendarTaskBacklogOne, deleteCalendarTaskBacklogOne,deleteCalendarTaskBacklog} = require('../controller/calendarTaskBackLogControl');

const route =express.Router();



route.post('/calendarTaskBackLog/:id', createCalendarTaskBlackLog); 
route.get('/calendarTaskBackLog/:id', fetchCalendarTaskBlackLog);
route.get('/calendarTaskBackLog/:id', fetchCalendarTaskBacklogOne);
route.put('/calendarTaskBackLog/:id', updateCalendarTaskBacklogOne);
route.delete('/calendarTaskBackLog/:id', deleteCalendarTaskBacklogOne);
route.delete('/calendarTaskBackLogdelete/:id', deleteCalendarTaskBacklog);
//route.get('/employees/:id', fetchcurretuser);

module.exports ={route};