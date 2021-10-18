import { useState,useEffect } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./components/SignUp";
import Navbar from "./components/navBar/Navbar";
import Sidebar from "./components/sideBar/sideBar";
//18th oct
import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'; //this will provide ability to navigate among pages
import ShowTaskBackLog from "./components/taskBacklog/view"

function App() {
  const [user,setUser]=useState({name:"",email:"",token:""});
  const [error,setError]=useState("")
  const[logorcreate,setLogorCreate]=useState(false);
  
  const Login=(data)=>{
    setUser({name:data.employee.name,email:data.employee.email,token:data.token});
  }
  const Logout=()=>{
    setUser({name:"",email:""})
    setError("")
    setLogorCreate(false)
    localStorage.clear();
  }
  const Logerror=err=>{
    setError(err)
  }
  const Logorcreate=()=>{
  if(logorcreate){
    setLogorCreate(false)
  }else{
    setLogorCreate(true)
  }
  setError("")
  }
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        const founduser=JSON.parse(loggedInUser)
        setUser({name:founduser.employee.name,email:founduser.employee.email,token:founduser.token});
    }
  }, []);

  
 
  return (
    <Router>
      <Route>
      <Navbar/>
      <Sidebar/>
      </Route>
      <Route path='/' exact>
      <div>
      {(user.email!=="")?(
        <div>

        <h2>Welcome {user.name}</h2>
        <button onClick={Logout}>Logout</button>
        </div>
      ):( (logorcreate===true)?(<div>
          <SignUp Login={Login} Logerror={Logerror} error={error} check={Logorcreate} />
      </div>):(
        <div>
           <LoginForm Login={Login} Logerror={Logerror} error={error} check={Logorcreate}/>
        </div>
      ))}    
   </div>  

      </Route>
   
   
   <Route path='/api/taskBackLog'>
   <ShowTaskBackLog />
   </Route>
   </Router>
  );
}

export default App;
