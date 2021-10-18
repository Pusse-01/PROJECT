import DatePicker from 'react-date-picker'
import React, { useState } from 'react';
import "./view.css"

function ShowTaskBackLog(){
    const [value, onChange] = useState(new Date());
    return (
        <body class='table'>
        <div>
            <h2>
                T A S K B A C K L O G
            </h2>
            </div>    

        <div>

        <div class='datepicker'>
      <DatePicker
        onChange={onChange}
        value={value}
      />
    </div>

   <table class="table">
  <thead>
    <tr>
      <th scope="col">Task</th>
      <th scope="col">Start Time</th>
      <th scope="col">End Time</th>
      <th scope="col">Total Hours</th>
      <th scope="col">Memo</th>
      <th scope="col">Who Logged</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
  </tbody>
</table>
        </div>
        </body>
    )
}

export default ShowTaskBackLog;