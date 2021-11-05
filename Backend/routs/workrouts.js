const express = require("express");
const router = express.Router();

//work model
const Workingproject = require("../models/working");
const Employee = require("../models/employee");
const { Router } = require("express");

router.post("/record/:id", (req, res) => {
  const { projectname, taskname, memo } = req.body;
  const starttime = new Date();

  //Validation
  if (!projectname || !taskname || !memo) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  let id = req.params.id;
  const newwork = new Workingproject({
    id:id,
    projectname: req.body.projectname,
    taskname: req.body.taskname,
    memo: req.body.memo,
    Stime: starttime,
    Etime: starttime,
  });

  newwork
    .save()

    .then(console.log("Success"))
    .catch((err) => {
      console.log("Not saved");
    });

  res.json(newwork);
});


router.put("/update/:id", (req, res) => {
  //update ended time
  const endtime = new Date();
  Workingproject.findOne({ _id: req.params.id }).then((project) => {
    if (!project) return res.status(400).json({ msg: "No record Matching" }); //check for same ID
    project.Etime = endtime;
    project
      .save()
      .then(console.log("Updated"))
      .catch((err) => {
        console.log("error");
      });
    res.json(project);
  });
});


router.get("/total/:id", (req, res) => {
  const id = req.params.id;//get email
  let totalhours = 0,totalminutes = 0,totalseconds = 0,single=0;
  Workingproject.find({ id:id }).then((work) => {//findall matching email in workings
    if (work) {
      let iter = work.values();
      for (let times of iter) {
         single += times.Etime.getTime() - times.Stime.getTime();//calculate total time worked
      }
        totalhours += Math.trunc(single / 3600000);
        single = single % 3600000;
        totalminutes += Math.trunc(single / 60000);
        single = single % 60000;
        totalseconds += Math.trunc(single / 1000);
        
      return res.json({
        totalhours:totalhours,
        totalminutes:totalminutes,
        totalseconds:totalseconds
      });
    }
  });
});
router.get("/summery/:id", (req, res) => {
  const id = req.params.id;//get email
 
  Workingproject.find({ id:id }).then((work) => {//findall matching id in workings
    if (work) {
      let summery=[]
      let iter=work.values();
      for (let times of iter) {
      
       let obj=[times.projectname,times.taskname,times.Stime.toString().substring(3,24),times.Etime.toString().substring(3,24)];
        summery.push(obj);
      }
      return res.json({
        summery
      });
    }
  });
});

router.get("/projectsummery", (req, res) => {
  
  let id=req.query.id;
  let projectn=req.query.projectname
  Workingproject.find({ id:id}).then((work) => {//findall matching id in workings
    if (work) {
      let summery=[]
      let iter=work.values();
      for (let times of iter) {
        if(times.projectname==projectn){
       let obj=[times.projectname,times.taskname,times.Stime.toString().substring(3,24),times.Etime.toString().substring(3,24)];
        summery.push(obj);
        }
      }
      return res.json({
        summery
      });
    }
  });
});
module.exports = router;
