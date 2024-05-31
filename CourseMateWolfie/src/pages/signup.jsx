import { useState } from 'react';

export default function SignUp() {
  const [count, setCount] = useState(0);

  return (
    <form>
      <h2 className="center-align">Sign up</h2>
      <div>
        <div>ID: </div>
        <input type="text"></input>
      </div>
      <div>
        <div>Password: </div>
        <input type="password" placeholder="minimum 4 characters"></input>
      </div>
      <button type="submit">Create</button>
    </form>
  );
}
