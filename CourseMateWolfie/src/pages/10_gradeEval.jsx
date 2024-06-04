import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const courses = [
  { name: 'CSE 310', score: '89/100', grade: 'B+' },
  { name: 'CSE 316', score: '95/100', grade: 'A' },
  { name: 'CSE 320', score: '92/100', grade: 'A-' },
  { name: 'New Course', score: '0/100', grade: '-' },
];

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

export default function CourseTable() {
  return (
    <main className="flexible_body">
      <table className="grade_display container">
        <thead className="grade_header">
          <tr>
            <th scope="col">Course Name</th>
            <th scope="col">Scores</th>
            <th scope="col">Expected Grade</th>
          </tr>
        </thead>
        {/* <div className="horizontal_line"></div> */}
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td scope="row" className="">
                {course.name}
              </td>
              <td className="">{course.score}</td>
              <td className="">{course.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ActiveLink className="navbutton" to="/edit_gradeEval">
        Add Course
      </ActiveLink>
    </main>
  );
}
