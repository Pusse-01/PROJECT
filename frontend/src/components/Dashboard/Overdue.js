import React, { useState, useEffect } from "react";
import "./Timelines.css";
const axios = require("axios").default;


function Overdue({id}) {
    const[overdue,setoverdue]=useState([]);
    async function overduetasks(){
        const response=await axios.get("http://localhost:8070/dashboard/getoverduetasks/"+id).then(function(response){
            if (response.data.length>0){
                setoverdue(response.data)
              }
        })
    }
    useEffect(()=>{
        overduetasks();
    },[])
    return (
        <div className ="col-sm-12 col-md-12 ">
        <div>
      <h4 className="overdueheader text-center">Overdue Tasks</h4>
        <div className="scrolloverdue hides ">
        
          <table className="table table-dark table-striped">
           
            {overdue.length!=0?(<tbody>
                {overdue.map((numList, i) => (
                <tr className="overduebackgroud overduefc" key={i}>
                  {numList.map((num, j) => (
                    <td  key={j}>{num}</td>
                  ))}
                </tr>
              ))}
            </tbody>):(  <tbody>
             
             </tbody>)}
            
          </table>
        </div>
      </div>
         
        </div>
    )
}

export default Overdue
