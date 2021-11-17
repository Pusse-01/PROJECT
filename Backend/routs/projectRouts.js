const express = require("express");
const router = express.Router();

//Project model
const Project = require('../models/projects');
const Employee = require('../models/employee');
const TaskController = require("../controller/taskController");
const Task = require("../models/task");


// @route POST project/projects
// @desc displays about projects
// @access Public
router.post ('/projects',(async(req, res)=>{
    const{name,members,projectStatus, overdue, administrators,discription,notes}=req.body;
    //res.status(201).json({ msg: 'Projects'});

 //Check for existing user
 await Project.findOne({name: req.body.name}).then(project=>{
    if(project) return res.status(400).json({msg:'Project already exist'});

    const newProject = new Project({
       name,
       members,
       projectStatus,
       overdue,  
       administrators,
       discription,
       notes
    });

    newProject.save()
            .then((project)=>{
    console.log("Project added successfully!")
    res.json({
        Project: {
            name: project.name,
            members: project.members,
            projectStatus: project.projectStatus,
            overdue: project.overdue,
            administrators: project.administrators,
            discription: project.discription,
            notes: project.notes,
        }
     });
   })
})
})
);


// @route GET project/projects
// @desc displays about projects
// @access Public
router.get ('/projects/:email',(req, res)=>{
 let email = req.params.email;
//Check for existing user
Project.find({members: email}).then(projects=>{
   if (projects) 
   return res.json(projects);
  })
});

// @route GET project/projects
// @desc displays about projects
// @access Public
router.get ('/projects/projectsDetails:name',(req, res)=>{
    let name = req.params.name;
   //Check for existing user
   Project.find({name: name}).then(projects=>{
      if (projects) 
      return res.json(projects);  
     })
   });


   //added by malaka
   //to get project by its contributers
   const fetchProjects = async (req, res) => {
      try {
          const projectlist = await Project.findOne({name: req.params.id});
          res.json(projectlist)
          console.log("okay");
      } catch (error) {
          console.log("oops");
          res.json(error.message);
      }
  };
   router.get ('/projects/list/:id', fetchProjects);

   //added by malaka
   //to get all projects delete this function
   const fetchallProjects = async (req, res) => {
    try {
        const projectlist = await Project.find({});
        res.json(projectlist)
        console.log("project get request success.");
    } catch (error) {
        console.log("project get request failed.");
        res.json(error.message);
    }
};
 router.get ('/projects', fetchallProjects);

// ************************************** GET PROJECT BY ID *****************************************
const getProjectById = (req,res,next) => {
    if(req.body.project_id==null){
        res.json({
            message : "The Project id is empty"
        })
    }else{
        Project.findById(req.body.project_id)
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(error => {
                res.json({
                    message : 'An error occurred!'
                })
            })
    }
}
router.post('/projects/getProjectById',getProjectById)

module.exports = router;