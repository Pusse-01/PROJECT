const express = require("express");
const router = express.Router();

//work model
const Workingproject = require("../models/working");
const Employee = require("../models/employee");
const { Router } = require("express");

router.post("/record/:email", (req, res) => {
  const { projectname, taskname, memo } = req.body;
  const starttime = new Date();

  //Validation
  if (!projectname || !taskname || !memo) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  let email = req.params.email;
  const newwork = new Workingproject({
    email: email,
    projectname: req.body.projectname,
    taskname: req.body.taskname,
    memo: req.body.memo,
    Stime: starttime,
    Etime: null,
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


router.get("/total/:email", (req, res) => {
  const email = req.params.email;//get email
  let totalhours = 0,totalminutes = 0,totalseconds = 0;
  Workingproject.find({ email: email }).then((work) => {//findall matching email in workings
    if (work) {
      let iter = work.values();
      for (let times of iter) {
        let single = times.Etime.getTime() - times.Stime.getTime();//calculate total time worked
        totalhours += Math.trunc(single / 3600000);
        single = single % 3600000;
        totalminutes += Math.trunc(single / 60000);
        single = single % 60000;
        totalseconds += Math.trunc(single / 1000);
        if (totalseconds >= 60) {
          totalminutes += Math.trunc(totalseconds / 60);
          totalseconds = totalseconds % 60;
        }
        if (totalminutes >= 60) {
          totalhours += Math.trunc(totalminutes / 60);
          totalminutes = totalminutes % 60;
        }
      }
      console.log(totalhours + ":" + totalminutes + ":" + totalseconds);
      return res.json(work);
    }
  });
});
module.exports = router;
