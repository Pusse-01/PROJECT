import axios from "axios";
import { useState, useEffect } from "react";
import "./profile.css";


function Profile({logout}) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    token: "",
    id: "",
    role: "",
    profileImage: "",
  });
  const [changepassword, setpass] = useState({ old: "", new: "", confirm: "" });
  const [visible, setvisible] = useState(false);
  const [error, seterror] = useState("");
  const[pic,setpic]=useState('');
  
  

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const founduser = JSON.parse(loggedInUser);
      setUser({
        name: founduser.employee.name,
        email: founduser.employee.email,
        token: founduser.token,
        id: founduser.employee.id,
        role: founduser.employee.role,
        profileImage: founduser.employee.profileImage,
      });
    }
  }, []);
  async function changepassworduser(event){
    console.log(user.id);
    event.preventDefault();
    if(changepassword.old!=""&&changepassword.new!=""&&changepassword.confirm!=""){
      if(changepassword.old==changepassword.new){
        seterror("You cant Use Old password as Your new Password");
      }else if(changepassword.confirm!=changepassword.new){
        seterror("New Password and Confirm Passwords are not matching");
      }else{
      await axios.post("http://localhost:8070/employee/updatePasswordEmployee/",{
          employee_id:user.id,
          old_password:changepassword.old,
          new_password:changepassword.new
         
      }).then(function(response){
        
         seterror("Success You will need to log in again")
         setTimeout(() => {logout(); }, 1000);
        }).catch(error=>{
          seterror("Check Your Old Password and try again ")
        })
      }
    }else{
      seterror("Please Fill All Fields")
    }
  }
 

  function show() {
    if (visible) {
      setvisible(false);
    } else {
      setvisible(true);
    }
  }
  return (
    <div>
     
      <span>
        <img
          src={"http://localhost:8070/"+user.profileImage}
          className="profileimg"
        />
      </span>
      <div className="usernametext">
        <div className="text-center">{user.name}</div>

        <div className="useremail text-center">
          {user.email}
          <button className="changepbutton btn btn-danger" onClick={show}>
            Change Password
          </button>
        </div>
      </div>
      
      <div>
        
        {visible ? (
          <div className="popup-boxpassword">
            <div className="popup-innerpassword">
              <div className="errorlog">
              {error}
              </div>
              <br/>
              <form onSubmit={changepassworduser}>
                <label>Old Password</label>
                <br />
                <input
                  onChange={(e) =>
                    setpass({ ...changepassword, old: e.target.value })
                  }
                  type="password"
                  className="form-group mt-3 col-sm-12 col-md-12"
                />
                <br />
                <label>New Password</label>
                <br />
                <input
                  type="password"
                  onChange={(e) =>
                    setpass({ ...changepassword, new: e.target.value })
                  }
                  className="form-group mt-3 col-sm-12 col-md-12"
                />
                <br />
                <label>Confirm Password</label>
                <br />
                <input
                  type="password"
                  onChange={(e) =>
                    setpass({ ...changepassword, confirm: e.target.value })
                  }
                  className="form-group mt-3 col-sm-12 col-md-12"
                />
                <br />
                <div className="text-center">
                  <input
                    type="submit"
                    className="btn  btn-dark col-12 col-md-5 mt-3"
                    value="Confirm"
                  />
                  <button
                    className="btn  btn-danger col-12 col-md-5 mt-3 ms-md-3"
                    onClick={show}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
      
    
  );
}

export default Profile;
