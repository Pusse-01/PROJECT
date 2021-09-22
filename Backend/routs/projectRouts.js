const express = require("express");
const router = express.Router();

//Project model
const Project = require('../models/projects');

// @route POST project/projects
// @desc displays about projects
// @access Public
router.get ('/projects',(req, res)=>{

    const{name,members,administrators,discription}=req.body;
    //res.status(201).json({ msg: 'Projects'});

 //Check for existing user
 Project.findOne({name: req.body.name}).then(project=>{
    if(project) return res.status(400).json({msg:'Project already exist'});

    const newProject = new Project({
       name,
       members,
       administrators,
       discription
    });

    newProject.save()
            .then((project)=>{
    res.json({
        Project: {
            name: project.name,
            members: project.members,
            administrators: project.administrators,
            discription: project.discription
        }
     });})
})
});

module.exports = router;