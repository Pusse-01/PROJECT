const express = require('express')
const router = express.Router()
const Departments  = require('../models/departments')
const DepartmentsController = require('../controller/departmentsController')
const TaskController = require("../controller/taskController");

router.get('/',DepartmentsController.index)
router.post('/addDepartment',DepartmentsController.addDepartment)
router.post('/deleteDepartment',DepartmentsController.deleteDepartment)

module.exports = router