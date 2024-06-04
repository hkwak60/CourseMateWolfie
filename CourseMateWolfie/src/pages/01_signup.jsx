import { useState } from 'react';

export default function SignUp() {
  return (
    <div className="flexible_body">
      <form className="container">
        <h2 className="center-align">Sign up</h2>
        <div>
          <div>ID: </div>
          <input className="id" type="text"></input>
        </div>
        <div>
          <div>Password: </div>
          <input
            className="password"
            type="password"
            placeholder="minimum 4 characters"
          ></input>
        </div>
        <div className="align_right auth_button">
          <input className="button" type="submit" value={'Create'}></input>
        </div>
      </form>
    </div>
  );
}
