import { Link, useMatch, useResolvedPath } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/loadOnline")
      .then((res) => {
        const newdata = {
          user_id: res.data[0].user_id,
          user_name: res.data[0].user_name,
          user_password: res.data[0].user_password,
        };
        console.log(newdata);
        setName(newdata.user_name);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handleLogout = (e) => {
    window.location.href = "/login";
  };

  return (
    <>
      <div className="logout">
        <span className="username">username: {name}</span>
        <input type="submit" value={"Log Out"} onClick={handleLogout}></input>
      </div>
      <div className="top_align">
        <nav className=" nav">
          <ul>
            {/* <ActiveLink to="/login">Log In</ActiveLink>
        <ActiveLink to="/signup">Sign Up</ActiveLink> */}
            <ActiveLink to="/gradeEval">Grade Evaluation</ActiveLink>
            {/* <ActiveLink to="/edit_gradeEval">Edit Grade Evaluation</ActiveLink> */}
            <ActiveLink to="/todo">Todo</ActiveLink>
            {/* <ActiveLink to="/edit_todo">EditTodo</ActiveLink> */}
            <ActiveLink to="/schedule">Schedule</ActiveLink>
            {/* <ActiveLink to="/edit_schedule">Edit Schedule</ActiveLink> */}
          </ul>
        </nav>
      </div>
    </>
  );
}

function ActiveLink({ to, children, ...props }) {
  //Special type to treat navigation
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
