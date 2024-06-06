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
  const [id, setId] = useState(-1);
  const [task, setTask] = useState("");
  const { data } = useParams();
  const [info, setInfo] = useState({
    course: "",
    posted_date: "",
    due_date: "",
    memo: "Course memo",
  });

  const handleChange = (onChangeValue, i) => {
    const val = onChangeValue;
    let newdata;
    if (i === 1) {
      newdata = { ...info, course: val };
    } else {
      // i===2
      newdata = { ...info, memo: val };
    }
    setInfo(newdata);
  };

  useEffect(() => {
    const [_, newTask] = data.split("@");
    setTask(newTask);
    axios.get("http://localhost:8000/loadOnline").then((res) => {
      setId(res.data[0].user_id);
    });

    axios
      .post("http://localhost:8000/loadTodo", data.split("@"))
      .then((res) => {
        console.log("task?:", res.data[0]);
        // const loaded = res.data[0];
        // const newdata = {
        //   course: loaded.course,
        //   posted_date: loaded.posted_date,
        //   due_date: loaded.due_date,
        //   memo: loaded.memo,
        // };
        // setInfo(newdata);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const dateInput = (date, i) => {
    const func = i === 1 ? setPostedDate : setDueDate;
    return (
      <div className="dateInput">
        <div className="dates">
          <input
            type="number"
            defaultValue={date.mm}
            onChange={(e) => func({ ...date, mm: e.target.value })}
            placeholder="MM"
          />
          /
          <input
            type="number"
            defaultValue={date.dd}
            onChange={(e) => func({ ...date, dd: e.target.value })}
            placeholder="DD"
          />
          /
          <input
            type="number"
            defaultValue={date.yyyy}
            onChange={(e) => func({ ...date, yyyy: e.target.value })}
            placeholder="YYYY"
          />
        </div>
        <input
          type="number"
          defaultValue={date.h}
          onChange={(e) => func({ ...date, h: e.target.value })}
          placeholder="hh"
        />
        {":"}
        <input
          type="number"
          defaultValue={date.m}
          onChange={(e) => func({ ...date, m: e.target.value })}
          placeholder="mm"
        />
        {date.ampm === 1 ? "am" : "pm"}
      </div>
    );
  };

  const comb = (data) => {
    const ampm = data.ampm === 1 ? "am" : "pm";
    return [data.mm, data.dd, data.yyyy, data.h, data.m, ampm].join("#");
  };

  const handleSave = (e) => {
    console.log("posteds:", postedDate);
    console.log("due:", dueDate);
    if (info.course.length === 0) alert("Enter course name!");
    else if (task.length === 0) alert("Enter a task!");
    else {
      const posted_comb = comb(postedDate);
      const due_comb = comb(dueDate);
      console.log("date1:", posted_comb);
      const newdata = {
        user_id: id,
        task: task,
        course: info.course,
        posted_date: posted_comb,
        due_date: due_comb,
        memo: info.memo,
      };
      console.log("debug info", info);
      axios
        .post("http://localhost:8000/updateTodo", newdata)
        .then((response) => {})
        .catch((error) => {
          console.error("Error:", error);
        });
      // alert("saved!");
      // window.location.href = "/gradeEval";
    }
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
          defaultValue={info.course}
          onChange={(e) => handleChange(e.target.value, 1)}
        />
        <h4>Task</h4>
        <input
          className=" taskbox"
          type="text"
          defaultValue={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <h4>Posted Date</h4>
        {dateInput(postedDate, 1)}
        <h4>Due Date</h4>
        {dateInput(dueDate, 2)}
        <h4>Memo</h4>
        <textarea
          className="memobox"
          defaultValue={info.memo}
          onChange={(e) => handleChange(e.target.value, 2)}
        />
        <div className="buttons_display">
          <input
            className="deletebutton"
            type="submit"
            value={"Delete this task"}
          ></input>
          <input
            className="button"
            type="submit"
            value={"Save"}
            onClick={() => handleSave()}
          ></input>
        </div>
      </div>
    </div>
  );
}
