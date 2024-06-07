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
      <div className="center">
        <nav className="nav">
          <ul>
            <ActiveLink to="/gradeEval">Grade Evaluation</ActiveLink>
            <ActiveLink to="/todo">Todo</ActiveLink>
            <ActiveLink to="/courseInfo">Course Info</ActiveLink>
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
