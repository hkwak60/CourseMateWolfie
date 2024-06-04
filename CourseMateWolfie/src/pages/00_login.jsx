import { useState } from 'react';

export default function Login() {
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
          <input className="button" type="submit" value={'Log in'}></input>
        </div>
      </form>
      <div style={{ height: '30px' }}></div>
      <div className="align_center">
        <span style={{ marginRight: '10px' }}>No Account?</span>
        <input className="button" type="button" value={'Sign up'}></input>
      </div>
    </div>
  );
}
