const express = require('express');
const { createCalendarTaskBlackLog, fetchCalendarTaskBlackLog, fetchCalendarTaskBacklogOne, updateCalendarTaskBacklogOne} = require('../controller/calendarTaskBackLogControl');

const route =express.Router();



route.post('/calendarTaskBackLog', createCalendarTaskBlackLog); 
route.get('/calendarTaskBackLog', fetchCalendarTaskBlackLog);
route.get('/calendarTaskBackLog/:id', fetchCalendarTaskBacklogOne);
route.put('/calendarTaskBackLog/:id', updateCalendarTaskBacklogOne);

module.exports ={route};