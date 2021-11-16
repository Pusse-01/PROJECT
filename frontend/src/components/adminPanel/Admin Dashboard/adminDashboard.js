import React, { Component, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Sidebar from "./sideBar";
import "./adminDashboard.css";
const axios = require("axios").default;

function AdminPanel() {
  const [projecttimeline, settimeline] = useState([]);
  const [searchterm, setsearchterm] = useState("");
  async function admintimeline() {
    await axios
      .get("http://localhost:8070/dashboard/admintimeline/")
      .then(function (response) {
        if (response.data.length > 0) {
          settimeline(response.data);
          console.log(response.data);
        }
      });
  }
  useEffect(() => {
    admintimeline();
  }, []);
  return (
    <div>
      <div>
        <div>
          <Sidebar />
        </div>
        <div className="row">
          <div className=" admintimeline col-sm-12 col-md-12 col-lg-9 mt-3">
            <h1 className="text-center admintableheader">
              Employee Work Details
            </h1>
            <div className="text-center">
              <img
                src={require("../../../assests/images/redSearch2.png").default}
                className="searchtimlineimage"
              />
              <input
                type="text"
                placeholder=" Search by Employee, Project, Task, or Date"
                className="searchbartimline "
                onChange={(e) => setsearchterm(e.target.value)}
              />
            </div>
            {projecttimeline.length>0?(
            <div className=" timelinetable hides">
              <table className="  table table-dark table-striped table-bordered mt-3">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      Employee
                    </th>
                    <th scope="col" className="text-center">
                      Project Name
                    </th>
                    <th scope="col" className="text-center">
                      Task name
                    </th>
                    <th scope="col" className="text-center">
                      Start time
                    </th>
                    <th scope="col" className="text-center">
                      End time
                    </th>
                    <th scope="col" className="text-center">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projecttimeline
                    .filter((val) => {
                      if (searchterm == "") {
                        return val;
                      } else if (
                        val[0].toLowerCase().includes(searchterm.toLowerCase())
                      ) {
                        return val;
                      } else if (
                        val[1].toLowerCase().includes(searchterm.toLowerCase())
                      ) {
                        return val;
                      } else if (
                        val[2].toLowerCase().includes(searchterm.toLowerCase())
                      ) {
                        return val;
                      } else if (
                        val[4].toLowerCase().includes(searchterm.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((numList, i) => (
                      <tr key={i}>
                        {numList.map((num, j) => (
                          <td className="text-center" key={j}>
                            {num}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>):(<div>
                <h2 className="text-center">No Records Found</h2>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(AdminPanel);
