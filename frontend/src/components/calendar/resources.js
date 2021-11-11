

import {
  pink, purple, teal, amber, deepOrange,
} from '@material-ui/core/colors';

/*
    exDate = calendarLogs[i].exDate;
    createdBy = calendarLogs[i].createdBy;
    updatedAt = calendarLogs[i].updatedAt;

*/


export const appointments = [
  {
    id:0,
    title: 'Website Re-Design Plan',
    startDate: new Date(2018, 6, 23, 9, 30),
    endDate: new Date(2018, 6, 23, 11, 30),
    roomId: 1,
    members: [1],
    rRule: 'FREQ=WEEKLY;BYDAY=TU,FR;COUNT=10',
  }, {
    id:1,
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2018, 6, 23, 12, 0),
    endDate: new Date(2018, 6, 23, 13, 0),
  }, {
    id:2,
    title: 'Install New Router in Dev Room',
    startDate: new Date(2018, 6, 23, 14, 30),
    endDate: new Date(2018, 6, 23, 15, 30),
  }, {
    id:3,
    title: 'Approve Personal Computer Upgrade Plan',
    startDate: new Date(2018, 6, 24, 10, 0),
    endDate: new Date(2018, 6, 24, 11, 0),
  }, {
    id:5,
    title: 'Final Budget Review',
    startDate: new Date(2018, 6, 24, 12, 0),
    endDate: new Date(2018, 6, 24, 13, 35),
  }, {
    id:6,
    title: 'New Brochures',
    startDate: new Date(2018, 6, 24, 14, 30),
    endDate: new Date(2018, 6, 24, 15, 45),
  }, {
    id:0,
    title: 'Install New Database',
    startDate: new Date(2018, 6, 25, 9, 45),
    endDate: new Date(2018, 6, 25, 11, 15),
  },
];


export const resourcesData = [
  {
    text: 'Room 101',
    id: 1,
    color: amber,
  }, {
    text: 'Room 102',
    id: 2,
    color: pink,
  }, {
    text: 'Room 103',
    id: 3,
    color: purple,
  }, {
    text: 'Meeting room',
    id: 4,
    color: deepOrange,
  }, {
    text: 'Conference hall',
    id: 5,
    color: teal,
  },
];
