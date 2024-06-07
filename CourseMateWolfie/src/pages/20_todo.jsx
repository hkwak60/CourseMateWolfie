import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Todo() {
  const [boxes, setBoxes] = useState([]);
  const [idx, setIdx] = useState(-1);
  useEffect(() => {
    // Call todo lists only belong to current user id
    axios
      .get("http://localhost:8000/loadOnline")
      .then((res) => {
        return axios.post("http://localhost:8000/loadTodoList", [
          res.data[0].user_id,
        ]);
      })
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

  // Pass data of user id and task name to edit page
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
    // Make the format clear considering null value
    const [mm, dd, yyyy, h, m, ampm] = date.split("#");
    const month =
      months[
        parseInt(mm) - 1 <= 12 ? parseInt(mm) - 1 : Math.abs(parseInt(mm) % 12)
      ];
    const ff = isnull(h) || isnull(m) ? "" : [month, dd].join(" ");
    const ss =
      isnull(h) || isnull(m) ? "" : [digitMod(h), digitMod(m)].join(":");
    return ff.length === 0 ? ss : ss.length === 0 ? ff : ff + ", " + ss;
  };
  const digitMod = (val) => {
    return val.length === 1 ? "0" + val : val;
  };
  const isnull = (val) => {
    return val.length === 0 || val === null || val === undefined;
  };
  const handleRemove = () => {
    const newdata = [...boxes];
    const toRmv = newdata[idx];
    axios
      .post("http://localhost:8000/deleteTodo", [toRmv.user_id, toRmv.task])
      .then((res) => {})
      .catch((e) => {
        console.error(e);
      });
    newdata.splice(idx, 1);
    setBoxes(newdata);
    alert("Task done!");
  };
  const trackRadio = (i) => {
    setIdx(i);
  };
  const boxForm = (data, i) => {
    return (
      <div className="task-display inline-block" key={i}>
        <input
          type="radio"
          name="finished"
          value="done"
          onClick={() => trackRadio(i)}
        />
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
        <button
          className="button done-button display-right"
          onClick={() => handleRemove()}
        >
          Done!
        </button>
      </div>
    </div>
  );
}
