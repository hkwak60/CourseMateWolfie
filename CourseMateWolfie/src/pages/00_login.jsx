import { useState } from 'react';

export default function Login() {
  return (
    <>
      <form>
        <h2 className="center-align">Course Mate Wolfie</h2>
        <div>
          <div>ID: </div>
          <input type="text"></input>
        </div>
        <div>
          <div>Password: </div>
          <input type="password"></input>
        </div>
        <input type="submit" value={'login'}></input>
        <div>
          <span>No Account?</span>
          <input type="button" value={'sign in'}></input>
        </div>
      </form>
    </>
  );
}
