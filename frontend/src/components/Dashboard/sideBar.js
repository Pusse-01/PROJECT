import React from 'react'
import "./sideBarStyle.css"

function sideBar() {
    function myFunction() {
        alert("I am an alert box!");
      }
    return (
        <div className="dashboardmainComponent title">
            <div className="ps-3 pe-3  mt-3">
            <button className="cpbutton col-12 " onClick={myFunction}>
              Completed Projects
          </button>
          </div>
          <div className="ps-3 pe-3  mt-3">
            <button className="ptbutton col-12 " onClick={myFunction}>
              Pending tasks
          </button>
          </div>
          <div className="ps-3 pe-3  mt-3">
            <button className="ctbutton col-12 " onClick={myFunction}>
              Completed Tasks
          </button>
          </div>
        </div>
    )
}

export default sideBar
