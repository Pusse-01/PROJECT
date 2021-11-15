import axios from "axios";
import React, { useState, useEffect } from "react";
import "./sideBarStyle.css"

function SideBar({id,email}) {
  const[totalcompletedtasks,setcompletedt]=useState();
  const[totalcompletedprojects,setcompletedp]=useState();
  const[totalpending,setpending]=useState();

  async function getdetails(){
  await axios.get("http://localhost:8070/dashboard/completedprojects/"+email).then(function(response1){
      setcompletedp(response1.data.completedp);
    })
  
 await axios.get("http://localhost:8070/dashboard/pendingtasks/"+id).then(function(response2){
      setpending(response2.data.pendingtasks);
    })
    await axios.get("http://localhost:8070/dashboard/totaltasks/"+id).then(function(response3){
      setcompletedt(response3.data.totaltask);
    })
  }
  useEffect(()=>{
    getdetails();
},[])
    
    return (
        <div className="admindashboardsidemainComponent admintitle">
            <div className="ps-3 pe-3  mt-3">
            <div className="admincpbutton col-12 " >
              Total Completed Projects
              <div className="adminsiderbarfont">{totalcompletedprojects}</div>
              
          </div>
          </div>
          <div className="ps-3 pe-3  mt-3">
            <div className="adminptbutton col-12 ">
              Total Pending tasks
              <div className="adminsiderbarfont">{totalpending}</div>
              </div>
          </div>
          <div className="ps-3 pe-3  mt-3">
            <div className="adminctbutton col-12 ">
              Total Completed Tasks
              <div className="adminsiderbarfont">{totalcompletedtasks}</div>
              </div>
          </div>
        </div>
    )
}

export default SideBar
