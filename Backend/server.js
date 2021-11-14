const express = require("express");
const mongoose = require("mongoose");
const{route} = require('./routs/calendarTaskBackLogRoute');
const cors = require("cors");
const config = require("config");
require("dotenv").config();
const TaskRouts = require('./routs/taskRouts')

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8070;

//Use routs
//http://localhost:8070/employee
app.use('/employee',require('./routs/employeeRouts.js'));


//calendar task backlog
//Router
app.use('/api', route);


//app.use('/employee/register',require('./routs/employeeRouts.js'));

app.use('/',require('./routs/projectRouts.js'));
app.use('/dashboard',require('./routs/workrouts.js'));


app.use('/employee',require('./routs/projectRouts.js'));
app.use('/dashboard',require('./routs/workrouts.js'));


const URL = config.get("MONGODB_URI");

mongoose.connect(URL, { 
  useNewUrlParser: true,
});


//Connecting DB
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Mongodb Connection success!");
})

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`)
})

app.use('/task',TaskRouts)
