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
    <main>
      <table className="rwd-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Scores</th>
            <th>Expected Grade</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td className="course">{course.name}</td>
              <td className="score">{course.score}</td>
              <td className="grade">{course.grade}</td>
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
