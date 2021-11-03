import React, { useState } from "react";
const axios=require('axios').default;

function Clockin({email,show,workdetails,setstatus}) {
    const [work, setwork] = useState({ projectname: "", taskname: "", memo: "" });
    async function startwork(event) {
        event.preventDefault();
        const response = await axios
          .post("http://localhost:8070/dashboard/record/" + email,{
              projectname:work.projectname,
              taskname:work.taskname,
              memo:work.memo
          })
          .then(function (response) {
            const workdata=response.data;
            localStorage.setItem('workdata',JSON.stringify(workdata));
            localStorage.setItem('stime',new Date());
            console.log(workdata);
            workdetails(workdata);
            setstatus(true);
            setwork({
              projectname: response.data.memo,
              taskname: response.data.memo,
              memo: response.data.memo,
            });
            show();
          });
      }
    return (
        
        <div className="popup-box">
        <div className="popup-inner">
          <form className=" mt-4 ms-5 col-sm-6 col-md-12 " onSubmit={startwork}>
            <div className="form-group mt-3 col-sm-auto col-md-10 ">
              <label for="name">Project Name :</label>
              <input
                className="form-control"
                onChange={(e) =>
                  setwork({ ...work, projectname: e.target.value })
                }
                value={work.projectname}
                type="text"
                placeholder="Project Name"
              />
            </div>
            <div className="form-group mt-3 col-sm-auto col-md-10 ">
              <label for="email">Task Name :</label>
              <input
                className="form-control"
                onChange={(e) =>
                  setwork({ ...work, taskname: e.target.value })
                }
                value={work.taskname}
                type="text"
                placeholder="Task Name"
              />
            </div>
            <div className="form-group mt-3 col-sm-auto col-md-10  ">
              <label for="posistion">Memo :</label>
              <input
                className="form-control"
                onChange={(e) =>
                  setwork({ ...work, memo: e.target.value })
                }
                value={work.memo}
                type="text"
                placeholder="Memo"
              />
            </div>
            <br />
            <input
              type="submit"
              className="btn  btn-dark col-sm-12 col-md-10 "
              value="Start"
              
              
            />
            <br />
            <input
              type="button"
              className="btn btn-danger  mt-3 col-sm-12 col-md-10 "
              value="Feeling Lazy??? XD"
              onClick={show}
            />
          </form>
        </div>
      </div>
    )
}

export default Clockin
