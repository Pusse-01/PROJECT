import React, { useState, useEffect } from "react";

import "./Timelines.css";
const axios = require("axios").default;

function Timelines(email) {
  const [data,setdata] = useState([]);
  async function summery(){
    const response=await axios.get("http://localhost:8070/Dashboard/summery/"+email.email).then(function(response){
          setdata(response.data.summery);
        })
  }
  useEffect(() => {
    summery();
   }, []);
  return (
    <div className="scroll hides">
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">Project Name</th>
          <th scope="col">Task name</th>
          <th scope="col">Memo</th>
          <th scope="col">Start time</th>
          <th scope="col">End time</th>
        </tr>
      </thead>
      <tbody >
      {data.map((numList, i) => (
          <tr   key={i}>
            {numList.map((num, j) => (
              <td key={j}>{num}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default Timelines;
