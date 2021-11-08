import React, { useState ,useEffect} from 'react';
const axios=require('axios').default;


function LoginForm({Login,Logerror,error,check}) {
    const [logindetails,setDetails]=useState({email:"",password:""});
    async function Auth(event) {
        event.preventDefault();
        if(logindetails.email==="" || logindetails.password===""){
          Logerror("Please Fill all Required Fields")
        }else{
        const response = await axios.post("http://localhost:8070/employee/auth/", {
            email:logindetails.email,
            password:logindetails.password
    }).then(function(response){
      
      const data=response.data;
      localStorage.setItem('user',JSON.stringify(data))
      Login(data)
      
    }).catch(function(err){
      Logerror("User Not Exists")
    });}
  }
        //added by Malaka, will change your project page title - delete after read :)
  useEffect(() => {
    document.title = "PROJECT LOG IN"
  }, [])
    return (
        <form className="col-12 " onSubmit={Auth}>
        <div className="col-2 offset-5  text-danger">{error}</div>
        <div className="form-group mt-3 col-2 offset-5">
        <label for="email">E-mail :</label>
        <input  className="form-control" onChange={e => setDetails({...logindetails,email:e.target.value})} value={logindetails.email} type="text" placeholder="Email"/>
        </div>
        <div className="form-group col-2 offset-5">
        <label for="password">Password :</label>
        <input className="form-control" onChange={e => setDetails({...logindetails,password:e.target.value})} value={logindetails.password} type="password" placeholder="Password"/>
        </div>
        <br />
        <input type="submit" className="btn btn-dark col-2 offset-5" value="Login" />
        <input type="button" className="btn btn-outline-dark col-2 offset-5 mt-3" value="Create New Account" onClick={check}/>
      </form>
    )

}

export default LoginForm
