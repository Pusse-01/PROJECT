import { useState, useEffect } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp";
import Navbar from "./components/navBar/Navbar";
import Sidebar from "./components/sideBar/sideBar";
import Dashboard from "./components/Dashboard/Dashboard";
//18th oct
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; //this will provide ability to navigate among pages
import ShowTaskBackLog from "./components/taskBacklog/view";
import Tasks from "./components/tasks/tasks";
import { Redirect } from "react-router-dom";
import TasksMore from "./components/tasksMore/tasksMore";
import TasksBoard from "./components/tasksBoard/tasksBoard";

function App() {
  const [user, setUser] = useState({ name: "", email: "", token: "" });
  const [error, setError] = useState("");
  const [logorcreate, setLogorCreate] = useState(false);

  const Login = (data) => {
    setUser({
      name: data.employee.name,
      email: data.employee.email,
      token: data.token,
    });
  };
  const Logout = () => {
    setUser({ name: "", email: "" });
    setError("");
    setLogorCreate(false);
    localStorage.clear();
    <Redirect to="/"/>
  };
  const Logerror = (err) => {
    setError(err);
  };
  const Logorcreate = () => {
    if (logorcreate) {
      setLogorCreate(false);
    } else {
      setLogorCreate(true);
    }
    setError("");
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const founduser = JSON.parse(loggedInUser);
      setUser({
        name: founduser.employee.name,
        email: founduser.employee.email,
        token: founduser.token,
      });
    }
  }, []);

  return (
    <Router>
      <div>
        {user.email !== "" ? (
          <div>
            <Route>
              <Navbar />
              <Sidebar />
            </Route>
            <div className="row">
              <div className="col-sm-3 offset-md-4">
                <h2 className="text-dark">Welcome {user.name}</h2>
              </div>
              <div className="col-md-2 mt-2 ">
                <button
                  onClick={Logout}
                  className="btn  btn-dark col-sm-3 col-md-7"
                >
                  Logout
                </button>
              </div>
            </div>
            <Route exact path="/">
              <Redirect to="/Dashboard" />
            </Route>
            <Route path="/Dashboard">
              <Dashboard email={user.email} />
            </Route>
            <Route path="/api/taskBackLog">
              <ShowTaskBackLog />
            </Route>
            <Route path="/tasks">
              <Tasks />
            </Route>
            <Route path="/tasksMore">
              <TasksMore/>
            </Route>
            <Route path="/tasksBoard">
              <TasksBoard/>
            </Route>
          </div>
        ) : logorcreate === true ? (
          <div>
            <SignUp
              Login={Login}
              Logerror={Logerror}
              error={error}
              check={Logorcreate}
            />
          </div>
        ) : (
          <div>
            <LoginForm
              Login={Login}
              Logerror={Logerror}
              error={error}
              check={Logorcreate}
            />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
