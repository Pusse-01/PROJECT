const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const config = require("config");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8070;

//Use routs
//http://localhost:8070/employee
app.use('/employee',require('./routs/employeeRouts.js'));
app.use('/employee',require('./routs/projectRouts.js'));

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

