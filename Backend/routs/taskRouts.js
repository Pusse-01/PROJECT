const express = require('express')
const router = express.Router()

const TaskController = require('../controller/taskController')

// ROUTES FOR THE TASKS FOR EMPLOYEES
router.post('/getTaskById',TaskController.getTaskById)
router.post('/getTaskByAssignedTo',TaskController.getTasksByAssignedTo)
router.post('/updateStatus',TaskController.updateStatus)

// ROUTES FOR THE ADMIN PANEL
router.get('/',TaskController.index)
router.post('/getTasksByName',TaskController.getTasksByName)
router.post('/getTasksOfProject',TaskController.getTasksOfProject)
router.post('/addTask',TaskController.addTask)
router.post('/update',TaskController.update)
router.post('/deleteTask',TaskController.deleteTask)


module.exports = router