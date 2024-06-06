import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function TodoDetails() {
  // window.location.reload();
  const [postedDate, setPostedDate] = useState({
    mm: null,
    dd: null,
    yyyy: null,
    h: null,
    m: null,
    ampm: null,
  });
  const [dueDate, setDueDate] = useState({
    mm: null,
    dd: null,
    yyyy: null,
    h: null,
    m: null,
    ampm: null,
  });
  const [id, setId] = useState(-1);
  const [task, setTask] = useState("");
  const [course, setcourse] = useState("");
  const [memo, setMemo] = useState("");
  const [ampm1, setAmpm1] = useState(1);
  const [ampm2, setAmpm2] = useState(1);
  const { data } = useParams();
  const [info, setInfo] = useState(["", "", "", "Course memo"]);
  // course, posted_date, due_date, memo

  useEffect(() => {
    const [_, newTask] = data.split("@");
    setTask(newTask);
    axios.get("http://localhost:8000/loadOnline").then((res) => {
      setId(res.data[0].user_id);
    });

    axios
      .post("http://localhost:8000/loadTodo", data.split("@"))
      .then((res) => {
        const loaded = res.data[0];
        const newdata = [
          loaded.course,
          loaded.posted_date,
          loaded.due_date,
          loaded.memo,
        ];
        setInfo(newdata);
        setcourse(loaded.course);
        setMemo(loaded.memo);
        setDate(loaded.posted_date, 1);
        setDate(loaded.due_date, 2);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handleChange = (onChangeValue, i) => {
    const val = onChangeValue;
    let newdata = [...info];
    if (i === 1) {
      newdata[0] = val;
    } else {
      // i===2
      newdata[3] = val;
    }
    setInfo(newdata);
  };
  const handleAmpm = (e, i) => {
    const func = i === 1 ? setPostedDate : setDueDate;
    const ap = e.target.value == "am" ? 1 : 2;
    func({ ...date, ampm: ap });
  };

  const setDate = (date, i) => {
    const [mm, dd, yy, h, m, ampm] = date.split("#");
    const func = i === 1 ? setPostedDate : setDueDate;
    func({
      ...date,
      mm: mm,
      dd: dd,
      yyyy: yy,
      h: h,
      m: m,
      ampm: ampm === "am" ? 1 : 2,
    });
  };

  const comb = (data) => {
    const ampm = data.ampm === 1 ? "am" : "pm";
    return [data.mm, data.dd, data.yyyy, data.h, data.m, ampm].join("#");
  };

  const lenzero = (str) => {
    return str.length === 0;
  };
  const handleSave = (e) => {
    const [mm1, dd1, yy1, h1, m1, ampm1] = info[1].split("#");
    const [mm2, dd2, yy2, h2, m2, ampm2] = info[2].split("#");

    if (info[0].length === 0) alert("Enter course name!");
    else if (task.length === 0) alert("Enter a task!");
    else if (info[3].length === 0) alert("Enter a memo!");
    else if (
      lenzero(mm1) ||
      lenzero(dd1) ||
      lenzero(yy1) ||
      lenzero(h1) ||
      lenzero(m1) ||
      lenzero(mm2) ||
      lenzero(dd2) ||
      lenzero(yy2) ||
      lenzero(h2) ||
      lenzero(m2)
    ) {
      alert("Enter date and time!");
    } else {
      const posted_comb = comb(postedDate);
      const due_comb = comb(dueDate);
      console.log("date1:", posted_comb);
      const newdata = {
        user_id: id,
        task: task,
        course: info[0],
        posted_date: posted_comb,
        due_date: due_comb,
        memo: info[3],
      };
      console.log("debug info", info);
      axios
        .post("http://localhost:8000/updateTodo", newdata)
        .then((response) => {})
        .catch((error) => {
          console.error("Error:", error);
        });
      alert("saved!");
      window.location.href = "/todo";
    }
  };
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
        <select
          defaultValue={date.ampm == 1 ? "am" : "pm"}
          id="time"
          name="timeperiod"
          onChange={(e) => handleAmpm(e, i)}
        >
          <option value="am">AM</option>
          <option value="pm">PM</option>
        </select>
      </div>
    );
  };
  return (
    <div className="flexible_body background_box edit_box">
      <a
        href="/todo"
        className="margin_left margin_top returnbutton biggest-size button"
      >
        ←
      </a>
      <div className="edit_background_box detail_box">
        <h4>Course Name</h4>
        <input
          className="inputbox"
          type="text"
          defaultValue={course}
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
          defaultValue={memo}
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
