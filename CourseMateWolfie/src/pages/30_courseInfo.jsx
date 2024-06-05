import React from "react";
import { useEffect, useState } from "react";

export default function CourseInfo() {
  const [courses, setCourses] = useState([
    {
      name: "CSE 310",
      classroom: "B204",
      professor: "Aruna",
      memo: "Computer Network",
    },
    {
      name: "CSE 316",
      classroom: "B203",
      professor: "Mione",
      memo: "Webpage Development",
    },
    {
      name: "CSE 320",
      classroom: "B205",
      professor: "Aruna",
      memo: "Software Development",
    },
    { name: "New Course", classroom: "-", professor: "-", memo: "-" },
    { name: "New Course", classroom: "-", professor: "-", memo: "-" },
    { name: "New Course", classroom: "-", professor: "-", memo: "-" },
    { name: "New Course", classroom: "-", professor: "-", memo: "-" },
  ]);
  return (
    <main className="flexible_body background_box">
      <table className="grade_display">
        <thead className="line">
          <tr className="grade_header">
            <th className="course_name1" scope="col">
              Course Name
            </th>
            <th className="course_room" scope="col">
              <div className="margin_right">Classroom</div>
            </th>
            <th className="course_prof" scope="col">
              Professor
            </th>
            <th className="course_memo" scope="col">
              Memo
            </th>
          </tr>
        </thead>
        {/* <div className="horizontal_line"></div> */}
        <tbody>
          {courses.map((course, index) => (
            <tr className="course_contents" key={index}>
              <td scope="row" className="course_name1 ">
                <div className="course_name">{course.name}</div>
              </td>
              <td className="course_room">
                <div className="course_details padding_right">
                  {course.classroom}
                </div>
              </td>
              <td className="course_prof">
                <div className="course_details">{course.professor}</div>
              </td>
              <td className="course_memo">
                <div className="course_details">{course.memo}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a
        className="button navbutton margin_top display-right"
        href="http://localhost:5173/edit_courseInfo"
      >
        Add Course
      </a>
    </main>
  );
}
