import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CourseInfo() {
  const [courses, setCourses] = useState([
    {
      user_id: "yo",
      name: "CSE 310",
      classroom: "B204",
      professor: "Aruna",
      memo: "Computer Network",
    },
    {
      user_id: "0",
      name: "CSE316",
      classroom: "B203",
      professor: "Mione",
      memo: "Webpage Development",
    },
    {
      user_id: "0",
      name: "CSE320",
      classroom: "B205",
      professor: "Aruna",
      memo: "Software Development",
    },
    {
      user_id: "0",
      name: "New Course",
      classroom: "-",
      professor: "-",
      memo: "-",
    },
    {
      user_id: "0",
      name: "New Course",
      classroom: "-",
      professor: "-",
      memo: "-",
    },
    {
      user_id: "0",
      name: "New Course",
      classroom: "-",
      professor: "-",
      memo: "-",
    },
    {
      user_id: "0",
      name: "New Course",
      classroom: "-",
      professor: "-",
      memo: "-",
    },
  ]);
  const handlePage = (e, i) => {
    if (i == -1) {
      let path = "edit_courseInfo/@";
      window.location.href = path;
    } else {
      let conv = courses[i].user_id + "@" + courses[i].name;
      let path = "edit_courseInfo/" + conv;
      window.location.href = path;
    }
  };
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
          {courses.map((course, i) => (
            <tr className="course_contents" key={i}>
              <td scope="row" className="course_name1 ">
                <div onClick={(e) => handlePage(e, i)} className="course_name">
                  {course.name}
                </div>
              </td>
              <td className="course_room">
                <div
                  onClick={(e) => handlePage(e, i)}
                  className="course_details padding_right"
                >
                  {course.classroom}
                </div>
              </td>
              <td className="course_prof">
                <div
                  onClick={(e) => handlePage(e, i)}
                  className="course_details"
                >
                  {course.professor}
                </div>
              </td>
              <td className="course_memo">
                <div
                  onClick={(e) => handlePage(e, i)}
                  className="course_details"
                >
                  {course.memo}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
