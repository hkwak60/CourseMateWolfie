import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav">
      <ul>
        {/* <ActiveLink to="/login">Log In</ActiveLink>
        <ActiveLink to="/signup">Sign Up</ActiveLink> */}
        <ActiveLink to="/gradeEval">Grade Evaluation</ActiveLink>
        {/* <ActiveLink to="/edit_gradeEval">Edit Grade Evaluation</ActiveLink> */}
        <ActiveLink to="/todo">Todo</ActiveLink>
        {/* <ActiveLink to="/edit_todo">EditTodo</ActiveLink> */}
        <ActiveLink to="/schedule">Schedule</ActiveLink>
        {/* <ActiveLink to="/edit_schedule">Edit Schedule</ActiveLink> */}
      </ul>
    </nav>
  );
}

function ActiveLink({ to, children, ...props }) {
  //Special type to treat navigation
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
