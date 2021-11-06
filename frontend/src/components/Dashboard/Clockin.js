import React, { useState,useEffect } from "react";
const axios=require('axios').default;

function Clockin({email,id,show,workdetails,setstatus}) {
    const [work, setwork] = useState({ projectname: "", taskname: "", memo: "" });
    const[error,seterror]=useState("");
    const [projects,setprojects]=useState([""]);
    const[tasks,settasks]=useState([""]);
    const [pid,setpid]=useState([""]);
  
    
    async function startwork(event) {
        event.preventDefault();
        if(work.projectname==""||work.taskname==""||work.memo==""){
          seterror("Please Fill all parts");
        }else{
        const response = await axios
          .post("http://localhost:8070/dashboard/record/" + id,{
              projectname:work.projectname,
              taskname:work.taskname,
              memo:work.memo
          })
          .then(function (response) {
            const workdata=response.data;
            localStorage.setItem('workdata',JSON.stringify(workdata));
            localStorage.setItem('stime',new Date());
        
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
      }
      async function getprojects(){
        const response=await axios.get("http://localhost:8070/employee/projects/"+email).then(function(response){
         if (response.data.length>0){
           setprojects(response.data.map(project=>project.name))
         }
         
        })
      }
      async function getpids(){
        const getid=await axios.get("http://localhost:8070/dashboard/getpid/"+work.projectname).then(function(getid){
        const pidof=getid.data;
         setpid(pidof);
         })
      }
      async function gettasks(){
        const response=await axios.get("http://localhost:8070/dashboard/gettasksbyprojectandemployee?id="+id+"&pid="+pid).then(function(response){
         if (response.data.tasksummery.length>0){
           settasks(response.data.tasksummery);
         }

        })
      }
      useEffect(() => {
        let mounted=true;
        if(mounted){
        getprojects();
        
        if(work.projectname!=""){
          settasks([""]);
          getpids();
          gettasks();
        }
      }
      return () => {
        mounted = false
     };
       
    }, [pid,work.projectname,work.taskname]);
      
      
    return (
        
        <div className="popup-box">
        <div className="popup-inner">
        <div className="col-3 offset-4  text-danger">{error}</div>
          <form className=" mt-4 ms-5 col-sm-6 col-md-12 " onSubmit={startwork}>
            <div className="form-group mt-3 col-sm-auto col-md-10 ">
              <label for="name">Project Name :</label>
              <select className="form-select"  onChange={(e) =>
                  setwork({ ...work, projectname: e.target.value }) }>
                    <option disabled  defaultValue selected> -- Select a Project -- </option>
              {projects.map(item => {
                return (<option  key={item} value={item}>{item}</option>);
              })}
            </select>
              
            </div>
            <div className="form-group mt-3 col-sm-auto col-md-10 ">
              <label for="email">Task Name :</label>
              <select className="form-select"  onChange={(e) =>
                  setwork({ ...work, taskname: e.target.value })} >
                    <option disabled defaultValue selected> -- Select a Task -- </option>
              {tasks.map(item => {
                return (<option  key={item} value={item}>{item}</option>);
              })}
            </select>
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
              className="btn  btn-dark col-12 col-md-10 "
              value="Start"
              
              
            />
            <br />
            <input
              type="button"
              className="btn btn-danger  mt-3 col-12 col-md-10 "
              value="Feeling Lazy??? XD"
              onClick={show}
            />
          </form>
        </div>
      </div>
    )
}

export default Clockin
