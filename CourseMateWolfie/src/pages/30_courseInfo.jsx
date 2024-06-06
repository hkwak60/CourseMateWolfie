import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CourseInfo() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/loadGradeEval")
      .then((res) => {
        const newdata = res.data.map((data) => {
          return {
            user_id: data.user_id,
            course: data.course,
            classroom: data.classroom,
            professor: data.professor,
            memo: data.memo,
          };
        });
        setBoxes(newdata);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handlePage = (e, i) => {
    console.log(boxes[i]);
    if (i == -1) {
      let path = "edit_courseInfo/@";
      window.location.href = path;
    } else {
      let conv = boxes[i].user_id + "@" + boxes[i].course;
      let path = "edit_courseInfo/" + conv;
      window.location.href = path;
    }
  };

  function detailsBox(name, classroom, professor, memo, i) {
    return (
      <tr className="course_contents" key={i}>
        <td scope="row" className="course_name1 ">
          <div onClick={(e) => handlePage(e, i)} className="course_name">
            {name}
          </div>
        </td>
        <td className="course_room">
          <div
            onClick={(e) => handlePage(e, i)}
            className="course_details padding_right"
          >
            {classroom}
          </div>
        </td>
        <td className="course_prof">
          <div onClick={(e) => handlePage(e, i)} className="course_details">
            {professor}
          </div>
        </td>
        <td className="course_memo">
          <div onClick={(e) => handlePage(e, i)} className="course_details">
            {memo}
          </div>
          {/* <div onClick={(e) => handlePage(e, i)} className="course_details">
            {memo.length > 20 ? `${memo.substring(0, 20)}...` : memo}
          </div> */}
        </td>
      </tr>
    );
  }
  return (
    <main className="flexible_body background_box">
      <table className="grade_display">
        <thead className="line ">
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
          {boxes.map((data, i) =>
            detailsBox(
              data.course,
              data.classroom,
              data.professor,
              data.memo,
              i
            )
          )}
        </tbody>
      </table>
    </main>
  );
}
