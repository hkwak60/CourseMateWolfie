import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Todo() {
  const [boxes, setBoxes] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/loadTodoList")
      .then((res) => {
        const newdata = res.data.map((data) => {
          return {
            user_id: data.user_id,
            task: data.task,
            course: data.course,
            posted_date: data.posted_date,
            due_date: data.due_date,
            memo: data.memo,
          };
        });
        setBoxes(newdata);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const checkBox = () => {
    console.log("debug", boxes);
  };

  const handlePage = (e, i) => {
    if (i == -1) {
      let path = "edit_todo/@";
      window.location.href = path;
    } else {
      let conv = boxes[i].user_id + "@" + boxes[i].task;
      let path = "edit_todo/" + conv;
      window.location.href = path;
    }
  };

  const dateForm = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Dec",
      "Nov",
      "Dec",
    ];
    const [mm, dd, yy, h, m, ampm] = date.split("#");
    const month = months[parseInt(mm) - 1 <= 12 ? parseInt(mm) - 1 : 0];
    return [month, dd].join(" ") + ", " + [h, m].join(":") + ampm;
  };
  const boxForm = (data, i) => {
    return (
      <div className="task-display inline-block" key={i}>
        <input type="radio" name="finished" value="done" />
        <div onClick={(e) => handlePage(e, i)} key={i} className="task">
          <div>
            <div className="course big-size">{data.course}</div>
            <div className="task-name big-size task-color">{data.task}</div>
            <div className="posted-date">{dateForm(data.posted_date)}</div>
            <div className="due-date">{dateForm(data.due_date)}</div>
          </div>
          <div className="memo">{data.memo}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flexible_body">
      <div className="align align_right">
        <p>Order: </p>
        <select id="sort" name="cars">
          <option value="postedDate">Posted Date</option>
          <option value="dueDate">Due Date</option>
        </select>
        {/* <button className="margin_left navbutton">+ </button> */}
        <a
          className="button margin_left navbutton"
          onClick={(e) => handlePage(e, -1)}
        >
          + Add Task
        </a>
      </div>
      <div className="background_box">
        <ul className="header">
          <li className="course">Course</li>
          <li className="task-name">Task</li>
          <li className="posted-date">Posted Date</li>
          <li className="due-date">Due Date</li>
        </ul>
        {boxes.map((data, i) => {
          return boxForm(data, i);
        })}
        <button className="button done-button display-right" onClick={checkBox}>
          Done!
        </button>
      </div>
    </div>
  );
}
