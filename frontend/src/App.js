import { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./components/SignUp";

function App() {
  const [user,setUser]=useState({name:"",email:""});
  const [error,setError]=useState("")
  const[logorcreate,setLogorCreate]=useState(false);
  const Login=(data)=>{
    setUser({name:data.name,email:data.email});
  }
  const Logout=()=>{
    setUser({name:"",email:""})
    setError("")
    setLogorCreate(false)
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

  
 
  return (
    <div>
      {(user.email!=="")?(
        <div>
        <h2>Welcome {user.name}</h2>
        <button onClick={Logout}>Logout</button>
        </div>
      ):( (logorcreate==true)?(<div>
          <SignUp Login={Login} Logerror={Logerror} error={error} check={Logorcreate}/>
      </div>):(
        <div>
           <LoginForm Login={Login} Logerror={Logerror} error={error} check={Logorcreate}/>
        </div>
      ))}    
   </div>  
  );
}

export default App;
