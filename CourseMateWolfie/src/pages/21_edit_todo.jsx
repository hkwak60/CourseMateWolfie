import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function TodoDetails() {
  const [courseName, setCourseName] = useState("CSE 316");
  const [taskName, setTaskName] = useState("Project Proposal");
  const [postedDate, setPostedDate] = useState({
    mm: "04",
    dd: "24",
    yyyy: "2024",
    time: "10:00 AM",
  });
  const [dueDate, setDueDate] = useState({
    mm: "04",
    dd: "29",
    yyyy: "2024",
    time: "11:59 PM",
  });
  const [memo, setMemo] = useState("Write a team project proposal");

  function dueDateInput(date) {
    return (
      <div className="dateInput">
        <div className="dates">
          <input
            type="text"
            value={date.mm}
            onChange={(e) => setDueDate({ ...date, mm: e.target.value })}
            placeholder="MM"
          />
          /
          <input
            type="text"
            value={date.dd}
            onChange={(e) => setDueDate({ ...date, dd: e.target.value })}
            placeholder="DD"
          />
          /
          <input
            type="text"
            value={date.yyyy}
            onChange={(e) => setDueDate({ ...date, yyyy: e.target.value })}
            placeholder="YYYY"
          />
        </div>
        <input
          type="text"
          value={date.time}
          onChange={(e) => setDueDate({ ...date, time: e.target.value })}
          placeholder="hh"
        />
        {":"}
        <input
          type="text"
          value={date.time}
          onChange={(e) => setDueDate({ ...date, time: e.target.value })}
          placeholder="mm"
        />
      </div>
    );
  }

  function postDateInput(date) {
    return (
      <div className="dateInput">
        <div className="dates">
          <input
            type="text"
            value={date.mm}
            onChange={(e) => setPostedDate({ ...date, mm: e.target.value })}
            placeholder="MM"
          />
          /
          <input
            type="text"
            value={date.dd}
            onChange={(e) => setPostedDate({ ...date, dd: e.target.value })}
            placeholder="DD"
          />
          /
          <input
            type="text"
            value={date.yyyy}
            onChange={(e) => setPostedDate({ ...date, yyyy: e.target.value })}
            placeholder="YYYY"
          />
        </div>

        <input
          type="text"
          value={date.time}
          onChange={(e) => setPostedDate({ ...date, time: e.target.value })}
          placeholder="Time"
        />
      </div>
    );
  }

  const [id, setId] = useState(-1);
  const [task, setTask] = useState("");
  const { data } = useParams();
  const [info, setInfo] = useState({
    course: "",
    posted_date: "",
    due_date: "",
    memo: "",
  });

  useEffect(() => {
    const [_, newTask] = data.split("@");
    setTask(newTask);
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
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <h4>Task</h4>
        <input
          className=" taskbox"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <h4>Posted Date</h4>
        {postDateInput(postedDate)}
        <h4>Due Date</h4>
        {dueDateInput(dueDate)}
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
