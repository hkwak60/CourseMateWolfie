import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function TodoDetails() {
  const [postedDate, setPostedDate] = useState({
    mm: "04",
    dd: "24",
    yyyy: "2024",
    h: 10,
    m: 0,
    ampm: 1,
  });
  const [dueDate, setDueDate] = useState({
    mm: "04",
    dd: null,
    yyyy: null,
    h: null,
    m: null,
    ampm: null,
  });
  const [memo, setMemo] = useState("Course memo");

  const [id, setId] = useState(-1);
  const [task, setTask] = useState("");
  const { data } = useParams();
  const [info, setInfo] = useState({
    course: "",
    posted_date: "",
    due_date: "",
    memo: "",
  });

  const comb = (data) => {
    const ampm = data.ampm === 1 ? "am" : "pm";
    return (
      data.mm +
      "#" +
      data.dd +
      "#" +
      data.yyyy +
      "#" +
      data.h +
      "#" +
      data.m +
      "#" +
      ampm
    );
  };

  const handleSave = (e) => {
    // if (info.course.length === 0) alert("Enter course name!");
    // else if (task.length === 0) alert("Enter a task!");
    // else {
    const posted_comb = comb(postedDate);
    const due_comb = comb(dueDate);

    // const newdata = {
    //   user_id: id,
    //   course: course,
    //   item: comb_item,
    //   average: comb_avg,
    //   denom: comb_den,
    //   percentage: comb_per,
    // };
    // axios
    //   .post("http://localhost:8000/updateGradeEval", newdata, {})
    //   .then((response) => {})
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    // alert("saved!");
    // window.location.href = "/gradeEval";
    // }
  };

  useEffect(() => {
    // const [_, newTask] = data.split("@");
    // setTask(newTask);
    axios.get("http://localhost:8000/loadOnline").then((res) => {
      setId(res.data[0].user_id);
    });

    // axios
    //   .post("http://localhost:8000/loadTodo", data.split("@"))
    //   .then((res) => {
    // const loaded = res.data[0];
    // const newdata = {
    //   course: loaded.course,
    //   posted_date: loaded.posted_date,
    //   due_date: loaded.due_date,
    //   memo: loaded.memo,
    // };
    // setInfo(newdata);
    // })
    // .catch((e) => {
    //   console.error(e);
    // });
  }, []);

  const dateInput = (date, i) => {
    const func = i === 1 ? setPostedDate : setDueDate;
    return (
      <div className="dateInput">
        <div className="dates">
          <input
            type="number"
            value={date.mm}
            onChange={(e) => func({ ...date, mm: e.target.value })}
            placeholder="MM"
          />
          /
          <input
            type="number"
            value={date.dd}
            onChange={(e) => func({ ...date, dd: e.target.value })}
            placeholder="DD"
          />
          /
          <input
            type="number"
            value={date.yyyy}
            onChange={(e) => func({ ...date, yyyy: e.target.value })}
            placeholder="YYYY"
          />
        </div>
        <input
          type="number"
          value={date.h}
          onChange={(e) => func({ ...date, time: e.target.value })}
          placeholder="hh"
        />
        {":"}
        <input
          type="number"
          value={date.m}
          onChange={(e) => func({ ...date, time: e.target.value })}
          placeholder="mm"
        />
        {date.ampm === 1 ? "am" : "pm"}
      </div>
    );
  };

  return (
    <div className="flexible_body background_box edit_box">
      <a
        href="http://localhost:5173/todo"
        className="margin_left margin_top returnbutton biggest-size button"
      >
        ←
      </a>
      <div className="edit_background_box detail_box">
        <h4>Course Name</h4>
        <input
          className="inputbox"
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <h4>Task</h4>
        <input
          className=" taskbox"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <h4>Posted Date</h4>
        {dateInput(postedDate, 1)}
        <h4>Due Date</h4>
        {dateInput(dueDate, 2)}
        <h4>Memo</h4>
        <textarea
          className="memobox"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        <div className="buttons_display">
          <input
            className="deletebutton"
            type="submit"
            value={"Delete this task"}
          ></input>
          <input className="button" type="submit" value={"Save"}></input>
        </div>
      </div>
    </div>
  );
}
