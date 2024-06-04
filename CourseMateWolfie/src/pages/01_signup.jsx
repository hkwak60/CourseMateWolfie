import axios from "axios";
import { useEffect, useState } from "react";

export default function SignUp() {
  const [userData, setUserData] = useState();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

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

  const handleName = (onChangeValue) => {
    setName(onChangeValue.target.value);
    console.log(name);
  };
  const handlePassword = (onChangeValue) => {
    setPassword(onChangeValue.target.value);
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      alert("Enter an user name!");
    } else if (password.length < 4) {
      alert("Use password of at least 4 characters!");
    } else {
      let idx = -1;
      userData.forEach((data, i) => {
        if (data.user_name === name) idx = i;
      });

      if (idx != -1) {
        alert("ID already exists!");
      } else {
        const idpw = {
          user_name: name,
          user_password: password,
        };
        axios
          .post("http://localhost:8000/postAccount", idpw, {})
          .then((response) => {})
          .catch((error) => {
            console.error("Error:", error);
          });
        alert("New account created!");
        window.location.href = "/login";
      }
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
