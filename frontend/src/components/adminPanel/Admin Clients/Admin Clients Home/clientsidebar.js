import axios from "axios";
import React, { useState, useEffect } from "react";
import "./clientsidebarstyle.css"

function Clientsidebar({id,email}) {
  const[totalcompletedtasks,setcompletedt]=useState();
  const[totalcompletedprojects,setcompletedp]=useState();
  const[totalpending,setpending]=useState();

  async function getdetails(){
  await axios.get("http://localhost:8070/dashboard//totalclients/").then(function(response){
      setcompletedp(response.data);
    })
  
 await axios.get("http://localhost:8070/dashboard/totalcontracts/"+id).then(function(response){
      setpending(response.data.pendingtasks);
    })
  }
  useEffect(()=>{
    getdetails();
},[])
    
    return (
        <div className="admindashboardsidemainComponent admintitle text-center">
           
            <div className="admincpbutton mt-3" >
              Total  Cilents
              <div className="adminsiderbarfont">{totalclients}</div> 
          </div>
         
          
            <div className="adminptbutton mt-3">
              Total Contracts
              <div className="adminsiderbarfont">{totalcontracts}</div>
              </div>
            
        </div>
    )
}

export default Clientsidebar
