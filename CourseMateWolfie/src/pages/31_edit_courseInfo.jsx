import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Details() {
  const [course, setCourse] = useState();
  const [classroom, setRoom] = useState();
  const [professor, setProf] = useState();
  const [memo, setMemo] = useState();
  const { data } = useParams();
  const [id, setId] = useState();

  useEffect(() => {
    const [id, newCourse] = data.split("@");
    setCourse(newCourse);
    setId(id);
    axios
      .post("http://localhost:8000/loadCourse", data.split("@"))
      .then((res) => {
        const newdata = res.data[0];
        setRoom(newdata.classroom);
        setProf(newdata.professor);
        setMemo(newdata.memo);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  function handleRoom(e) {
    setRoom(e.target.value);
  }
  function handleProf(e) {
    setProf(e.target.value);
  }
  function handleMemo(e) {
    setMemo(e.target.value);
  }

  function handleSave() {
    const details = {
      user_id: id,
      course: course,
      classroom: classroom,
      professor: professor,
      memo: memo,
    };
    axios
      .post("http://localhost:8000/updateCourseDetails", details, {})
      .then((response) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
    alert("saved!");
    window.location.href = "/courseInfo";
  }

  return (
    <div className="flexible_body background_box edit_box">
      <a
        className="margin_left margin_top returnbutton biggest-size button"
        href="http://localhost:5173/courseInfo"
      >
        ←
      </a>
      <div className="background_box detail_box">
        <h4 className="inherit">Course Name</h4>
        <input className="inputbox" defaultValue={course} disabled></input>
        <h4 className="inherit">Classroom</h4>
        <input
          className="inputbox roomNo"
          defaultValue={classroom}
          onChange={(e) => handleRoom(e)}
        ></input>{" "}
        <h4 className="inherit">Professor</h4>
        <input
          className="inputbox"
          defaultValue={professor}
          onChange={(e) => handleProf(e)}
        ></input>
        <h4 className="inherit">Memo</h4>
        <textarea
          className="memobox"
          defaultValue={memo}
          onChange={(e) => handleMemo(e)}
        ></textarea>
        <div className="display-right">
          <input
            className="button "
            type="submit"
            value={"Save"}
            onClick={() => handleSave()}
          ></input>
        </div>
      </div>
    </div>
  );
}
