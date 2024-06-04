import { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/loadAccount")
      .then((res) => {
        const newdata = res.data.map((data) => ({
          user_name: data.user_name,
          user_password: data.user_password,
        }));
        setUserData(newdata);
      })
      .catch((e) => {
        console.error(e);
      });
    console.log(userData);
  }, []);

  return (
    <div className="flexible_body">
      <form className="container">
        <h2>Course Mate Wolfie</h2>
        <div>
          <div>ID: </div>
          <input className="id" type="text"></input>
        </div>
        <div>
          <div>Password: </div>
          <input className="password" type="password"></input>
        </div>
        <div className=" align_right auth_button">
          <input className="button" type="submit" value={"Log in"}></input>
        </div>
      </form>
      <div style={{ height: "30px" }}></div>
      <div className="align_center">
        <span style={{ marginRight: "10px" }}>No Account?</span>
        <input className="button" type="button" value={"Sign up"}></input>
      </div>
    </div>
  );
}
