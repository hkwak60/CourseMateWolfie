import axios from "axios";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (onChangeValue) => {
    setName(onChangeValue.target.value);
    console.log(name);
  };
  const handlePassword = (onChangeValue) => {
    setPassword(onChangeValue.target.value);
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (password.length < 4) {
      alert("Use password of at least 4 characters!");
    } else {
      const idpw = {
        user_name: name,
        user_password: password,
      };
      console.log("check1");
      axios
        .post("http://localhost:8000/postAccount", idpw, {})
        .then((response) => {
          console.log("New account created!");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      console.log("check2");
      alert("New account created!");
      // window.location.href = "/login";
    }
  };

  return (
    <div className="flexible_body">
      <form className="container">
        <h2 className="center-align">Sign up</h2>
        <div>
          <div>ID: </div>
          <input className="id" type="text" onChange={handleName}></input>
        </div>
        <div>
          <div>Password: </div>
          <input
            className="password"
            type="password"
            placeholder="minimum 4 characters"
            onChange={handlePassword}
          ></input>
        </div>
        <div className="align_right auth_button">
          <input
            className="button"
            type="submit"
            value={"Create"}
            onClick={handleSave}
          ></input>
        </div>
      </form>
    </div>
  );
}
