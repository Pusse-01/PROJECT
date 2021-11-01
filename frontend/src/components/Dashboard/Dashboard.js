import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Dashboard.css";
import Clockin from "./Clockin";
const axios = require("axios").default;

function Dashboard({ email }) {
  const [Time, Settime] = useState({ Hours: "", Minutes: "", seconds: "" });
  const [workdetals,Setworkdetails]=useState({id:"",projectname:"",taskname:"",memo:"",starttime:Date()})
  const [showform, Setvisible] = useState(false);
  const[isworking,setstatus]=useState(false);
  async function stopwork(){
    const response=await axios.put("http://localhost:8070/dashboard/update/"+workdetals.id).then(function(response){
        setstatus(false);
        localStorage.removeItem('workdata');
        Setvisible(false);
        window.location.reload(false);
    })
}
  async function totaltime() {
    const response = await axios
      .get("http://localhost:8070/dashboard/total/" + email)
      .then(function (response) {
        Settime({
          Hours: response.data.totalhours,
          Minutes: response.data.totalminutes,
          seconds: response.data.totalseconds,
        });
      });
  }
  function work(workdata){
      Setworkdetails({id:workdata._id,projectname:workdata.projectname,taskname:workdata.taskname,memo:workdata.memo,starttime:workdata.starttime})
  }

  const containerstyle = {
    position: "relative",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
  };
  const circlestyle = {
    dispay: "block",
    width: "300px",
    height: "300px",
    border: "10px solid #e9e9e9",
    borderTop: "10px solid #FF5349",
    borderRadius: "50%",
    position: "absolute",
    boxSizing: "border-box",
    top: 0,
    left: 0,
  };
  const spinTransisiton = {
    loop: Infinity,
    duration: 1,
    ease: "linear",
  };
  function show() {
    if (showform) {
      Setvisible(false);
    } else {
      Setvisible(true);
    }
  }

  useEffect(() => {
    totaltime();
    const workingdetails=localStorage.getItem("workdata");
    if (workingdetails) {
        const foundwork=JSON.parse(workingdetails)
        Setworkdetails({id:foundwork._id,projectname:foundwork.projectname,taskname:foundwork.taskname,memo:foundwork.memo})
        setstatus(true);
        
    }
  }, []);
  return (
    
    <div>
      <div className="row mt-3 row-cols-2">
        <div style={containerstyle} className="bg-dark bg-gradient col-sm-3 ms-5">
          <motion.span
            style={circlestyle}
            animate={{ rotate: 360 }}
            transition={spinTransisiton}
          />
          <p className="text">
            Total Time Worked
            <br />
            {Time.Hours}:{Time.Minutes}:{Time.seconds}
            <br />
          </p>
        </div>
        <div>
          {showform ? (
              <div>
            <button className="btn btn-danger col-3 mt-5" onClick={show}>
              Clock out
            </button>
              <Clockin email={email} show={show} workdetails={work} setstatus={setstatus}/>
            </div>
          ) : (
              isworking ?(<div> <button className="btn btn-danger col-3 mt-5" onClick={stopwork}>
              Clock out
            </button>
            <ul>
               <li>Project name :{workdetals.projectname}</li> 
               <li>Task  name:{workdetals.taskname}</li>
               <li>Memo: {workdetals.memo}</li>
            </ul>
            </div>):(<button className="btn btn-danger col-3 mt-5" onClick={show}>
              Clock In
            </button>)
            
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
