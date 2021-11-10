const express = require("express");
const router = express.Router();

//Project model
const Project = require('../models/projects');
const Employee = require('../models/employee');


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
 console.log(email)
   //let userId = req.params.id;
   //res.status(201).json({ msg: 'Projects'});

/* Employee.find({email}).then(employee=>{
      if(employee) return email = employee.email; */

//Check for existing user
Project.find({members: email}).then(projects=>{
   if (projects) 
   console.log(projects);
   console.log(projects.name);
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
   //to get project by its name
   const fetchProjects = async (req, res) => {
      try {
          const projectlist = await Project.findOne({name: "iii"});
          res.json(projectlist)
          console.log("okay");
      } catch (error) {
          console.log("oops");
          res.json(error.message);
      }
  };
   router.get ('/projects/list/:id', fetchProjects);


module.exports = router;