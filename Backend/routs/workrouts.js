const express = require("express");
const router = express.Router();

//work model
const Workingproject = require("../models/working");
const Employee = require("../models/employee");

router.post("/record", (req, res) => {
  const { email, projectname, taskname, memo } = req.body;
  const starttime = new Date();

  //Validation
  if (!email || !projectname || !taskname || !memo) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing user
  Employee.findOne({ email: req.body.email }).then((project) => {
    if (!project) return res.status(400).json({ msg: "User does not exist" });
    const newwork = new Workingproject({
      name: project.name,
      email: project.email,
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
});

router.put("/update", (req, res) => {
  //update ended time
  const endtime = new Date();
  Workingproject.findOne({ _id: req.body.id }).then((project) => {
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
module.exports = router;