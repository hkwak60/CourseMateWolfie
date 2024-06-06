import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Details() {
  const [course, setCourse] = useState("");
  const [classroom, setRoom] = useState("B204");
  const [professor, setProf] = useState("Aruna");
  const [memo, setMemo] = useState("Computer Network");

  const { data } = useParams();
  useEffect(() => {
    const [_, newCourse] = data.split("@");
    setCourse(newCourse);
  });

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
        ></input>{" "}
        <h4 className="inherit">Professor</h4>
        <input className="inputbox" defaultValue={professor}></input>
        <h4 className="inherit">Memo</h4>
        <textarea className="memobox" defaultValue={memo}></textarea>
        <div className="display-right">
          <input className="button " type="submit" value={"Save"}></input>
        </div>
      </div>
    </div>
  );
}
