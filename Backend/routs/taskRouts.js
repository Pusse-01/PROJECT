const express = require('express')
const router = express.Router()
const Task = require("../models/task");
const TaskController = require('../controller/taskController')

// ROUTES FOR THE TASKS FOR EMPLOYEES
router.post('/getTaskById',TaskController.getTaskById)
router.post('/getTaskByAssignedTo',TaskController.getTasksByAssignedTo)
router.post('/updateStatus',TaskController.updateStatus)
router.post('/getMembers',TaskController.getMembersOfTask)

// ROUTES FOR THE ADMIN PANEL
router.get('/',TaskController.index)
router.post('/getTasksByName',TaskController.getTasksByName)
router.post('/getTasksOfProject',TaskController.getTasksOfProject)
router.post('/addTask',TaskController.addTask)
router.post('/update',TaskController.update)
router.post('/deleteTask',TaskController.deleteTask)

router.get ('/getTasks/:email',(req, res)=>{
    let email = req.params.email;
   //Check for existing user
   Task.find({assigned_to: email}).then(tasks=>{
      if (tasks) 
      return res.json(tasks);
     })
   });

module.exports = router