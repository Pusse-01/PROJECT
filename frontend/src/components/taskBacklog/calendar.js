import React, { useEffect, useState } from "react";



function GetCalendarLogs() {
  const [logs, setLogs] = useState([{
      id:-1,
      title:"",
      roomId:-1,
      members:[-1],
      startDate:Date(),
      endDate:Date(),
      rRule:"",
      exDate:"",
  }])

useEffect(()=> {
  fetch('/api/calendarTaskBackLog').then(res => {
      if(res.ok){
          console.log(res.json)
          return res.json();
      }
  }).then(jsonRes => setLogs(jsonRes));
})

console.log(logs.body);

return (
    <div zindex="0">
        <h1>Hello get request</h1>
        {logs.map(log=><li></li>)}
    </div>
)

}


export default GetCalendarLogs;