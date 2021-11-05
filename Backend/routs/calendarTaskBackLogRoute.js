const express = require('express');
const { createCalendarTaskBlackLog, fetchCalendarTaskBlackLog, fetchCalendarTaskBacklogOne, updateCalendarTaskBacklogOne, deleteCalendarTaskBacklogOne} = require('../controller/calendarTaskBackLogControl');

const route =express.Router();



route.post('/calendarTaskBackLog/:id', createCalendarTaskBlackLog); 
route.get('/calendarTaskBackLog', fetchCalendarTaskBlackLog);
route.get('/calendarTaskBackLog/:id', fetchCalendarTaskBacklogOne);
route.put('/calendarTaskBackLog/:id', updateCalendarTaskBacklogOne);
route.delete('/calendarTaskBackLog/:id', deleteCalendarTaskBacklogOne);
//route.get('/employees/:id', fetchcurretuser);

module.exports ={route};