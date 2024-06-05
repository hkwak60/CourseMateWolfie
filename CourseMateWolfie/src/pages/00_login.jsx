import { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
  const [userData, setUserData] = useState();
  const [nameInput, setNameInput] = useState("");
  const [pwInput, setPwInput] = useState("");

  const handleName = (onChangeValue) => {
    setNameInput(onChangeValue.target.value);
  };
  const handlePassword = (onChangeValue) => {
    setPwInput(onChangeValue.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let idx = -1;
    userData.forEach((data, i) => {
      if (data.user_name === nameInput) idx = i;
    });
    if (idx >= 0) {
      const answer = userData[idx].user_password;
      if (pwInput === answer) {
        const idpw = {
          user_id: idx,
          user_name: nameInput,
          user_password: pwInput,
        };
        axios
          .post("http://localhost:8000/updateOnline", idpw, {})
          .then((response) => {})
          .catch((error) => {
            console.error("Error:", error);
          });

        window.location.href = "/gradeEval";
      } else alert("Login failed!");
    } else alert("Login failed!");
  };

  const handleSignup = (e) => {
    window.location.href = "/signup";
  };

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
  }, []);

  return (
    <div className="flexible_body">
      <form className="margin container">
        <h2>Course Mate Wolfie</h2>
        <div>
          <div>ID: </div>
          <input className="id" type="text" onChange={handleName}></input>
        </div>
        <div>
          <div>Password: </div>
          <input
            className="password"
            type="password"
            onChange={handlePassword}
          ></input>
        </div>
        <div className=" align_right auth_button">
          <input
            className="button"
            type="submit"
            value={"Log in"}
            onClick={handleLogin}
          ></input>
        </div>
      </form>
      <div style={{ height: "30px" }}></div>
      <div className="align_center">
        <span style={{ marginRight: "10px" }}>No Account?</span>
        <input
          className="button"
          type="button"
          value={"Sign up"}
          onClick={handleSignup}
        ></input>
      </div>
    </div>
  );
}
