const express = require('express')
const router = express.Router()
const Task = require("../models/task");
const TaskController = require('../controller/taskController')

// ROUTES FOR THE TASKS FOR EMPLOYEES
router.post('/getTaskById', TaskController.getTaskById)
router.post('/getTaskByAssignedTo', TaskController.getTasksByAssignedTo)
router.post('/updateStatus', TaskController.updateStatus)
router.post('/getMembers', TaskController.getMembersOfTask)

// ROUTES FOR THE ADMIN PANEL
router.get('/', TaskController.index)
router.post('/getTasksByName', TaskController.getTasksByName)
router.post('/getTasksOfProject', TaskController.getTasksOfProject)
router.post('/addTask', TaskController.addTask)
router.post('/update', TaskController.update)
router.post('/deleteTask', TaskController.deleteTask)

//To get all the tasks of a particular employee by passing his ID
router.get ('/userTasks/:id',(req, res)=>{
    let id = req.params.id;
   //Check for existing user
   Task.find({assigned_to: id}).then(tasks=>{
      if (tasks) 
      return res.json(tasks);
     })
   });

   //To get the count of tasks withrespective to it's status
   router.get("/countTasks", async (req, res) => {
      const allTasks = await Task.find().lean();
      let to_do = 0;
      let inProgress = 0;
      let done = 0;
      let bugs = 0;
      let review = 0;
      allTasks.forEach((Task)=> {
          switch (Task.task_status) {
              case "To Do":
                  to_do++;
                  break;
              case "In Progress":
                  inProgress++;
                  break;
              case "done":
                  done++;
                  break;                
              case "Bugs/Issues":
                  bugs++;
                  break;    
              case "Review":
                  review++;
                  break; 
              default:
                  break;          
          }
      });
  
      const statusObject = {
          to_do,
          inProgress,
          done,
          bugs,
          review,
      };
  
      res.send(statusObject);
  })


module.exports = router