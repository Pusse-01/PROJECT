const express = require("express");
const router = express.Router();

//Project model
const Project = require('../models/projects');

// @route POST employee/projects
// @desc displays about projects
// @access Public
router.get ('/projects',(req, res)=>{
    res.status(201).json({ msg: 'Projects'});
});

module.exports = router;