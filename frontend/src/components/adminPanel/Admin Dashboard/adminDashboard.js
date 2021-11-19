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
          
        }
      });
  }

  useEffect(() => {
    admintimeline();
  }, []);
  return (
    <div className="adminmain adminhides">
      <div>
        <div>
          <Sidebar />
        </div>
        <div className="row">
          <div className=" admintimeline col-lg-5 col-sm-12 col-md-12 mt-3">
            <h1 className="text-center admintableheader">
              Employee Worklogs
            </h1>
            <div className="searchbarplacement">
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
            {projecttimeline.length > 0 ? (
              <div className=" timelinetable adminhides">
                <ul className="  employelist mt-3 timelinetext list-group-flush">
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
                    .map((numList,i) => (
                      <li key={i} >
                        {numList[0]} has Worked on {numList[1]} at {numList[3]}
                        <br />
                        Task : {numList[2]}
                        <br />
                        Duration : {numList[5]}
                        <br />
                      
                      </li>
                    ))}
                </ul>
              </div>
            ) : (
              <div>
                <h2 className="text-center">No Records Found</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(AdminPanel);
