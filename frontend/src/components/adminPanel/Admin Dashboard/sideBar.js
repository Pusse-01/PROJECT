import axios from "axios";
import React, { useState, useEffect } from "react";
import "./sideBarStyle.css"

function SideBar({id,email}) {
  const[totalcompletedtasks,setcompletedt]=useState();
  const[totalcompletedprojects,setcompletedp]=useState();
  const[totalpending,setpending]=useState();

  async function getdetails(){
  await axios.get("http://localhost:8070/dashboard/completedprojects/"+email).then(function(response){
      setcompletedp(response.data.completedp);
    })
  
 await axios.get("http://localhost:8070/dashboard/pendingtasks/"+id).then(function(response){
      setpending(response.data.pendingtasks);
    })
    await axios.get("http://localhost:8070/dashboard/totaltasks/"+id).then(function(response){
      setcompletedt(response.data.totaltask);
    })
  }
  useEffect(()=>{
    getdetails();
},[])
    
    return (
        <div className="admindashboardsidemainComponent admintitle text-center">
           
            <div className="admincpbutton  " >
              Total  Projects
              <div className="adminsiderbarfont">{totalcompletedprojects}</div> 
          </div>
         
          
            <div className="adminptbutton ">
              Total Cilents
              <div className="adminsiderbarfont">{totalpending}</div>
              </div>
            
            <div className="adminctbutton ">
              Total Employees
              <div className="adminsiderbarfont">{totalcompletedtasks}</div>
              
              
          </div>
        </div>
    )
}

export default SideBar
