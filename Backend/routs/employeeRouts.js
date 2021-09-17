const express = require("express");
const router = express.Router();

//Employee model
const Employee = require('../models/employee');

// @route POST api/employeeRouts/register
// @desc Register user
// @access Public
router.get ('/',(_req, res)=>{
    res.send('register');
});
router.route("/add").post((req,res)=>{
    const name = req.body.name;

    
    const newEmployee = new Employee({
       name,
    })
 
    newEmployee.save().then(()=>{
       res.json("Employee Added")
    }).catch((err)=>{
       console.log(err);
    })
 });

 router.route("/").get((_req,res)=>{
    Student.find().then((students)=>{
      res.json(students)
    }).catch((err)=>{
      console.log(err)
    })
})

module.exports = router;