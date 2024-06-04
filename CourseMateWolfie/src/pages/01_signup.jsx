import { useState } from "react";

export default function SignUp() {
  return (
    <div className="flexible_body">
      <form className="container">
        <h2 className="center-align">Sign up</h2>
        <div>
          <div>ID: </div>
          <input type="text"></input>
        </div>
        <div>
          <div>Password: </div>
          <input type="password" placeholder="minimum 4 characters"></input>
        </div>
        <div className="align_right" style={{ width: "55%" }}>
          <input type="submit" value={"Create"}></input>
        </div>
      </form>
    </div>
  );
}
