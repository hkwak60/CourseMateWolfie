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
    <main className="container">
      <table className="grade_display">
        <thead className="line">
          <tr className="grade_header">
            <th className="course_name" scope="col">
              Course Name
            </th>
            <th className="course_score" scope="col">
              Scores
            </th>
            <th className="course_letter" scope="col">
              Expected Grade
            </th>
          </tr>
        </thead>
        {/* <div className="horizontal_line"></div> */}
        <tbody>
          {courses.map((course, index) => (
            <tr className="course_contents" key={index}>
              <td scope="row" className="course_name ">
                <div className="course_name">{course.name}</div>
              </td>
              <td className="course_score">
                <div className="course_details">{course.score}</div>
              </td>
              <td className="course_letter">
                <div className="course_details">{course.grade}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a className="navbutton" href="http://localhost:5173/edit_gradeEval">
        Add Course
      </a>
    </main>
  );
}
