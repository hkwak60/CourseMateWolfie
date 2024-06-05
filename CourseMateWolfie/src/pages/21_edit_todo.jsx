import React, { useState } from 'react';

export default function TodoDetails() {
  const [courseName, setCourseName] = useState('CSE 316');
  const [taskName, setTaskName] = useState('Project Proposal');
  const [postedDate, setPostedDate] = useState({
    mm: '04',
    dd: '24',
    yyyy: '2024',
    time: '10:00 AM',
  });
  const [dueDate, setDueDate] = useState({
    mm: '04',
    dd: '29',
    yyyy: '2024',
    time: '11:59 PM',
  });
  const [memo, setMemo] = useState('Write a team project proposal');

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
          placeholder="Time"
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
  return (
    <div className="flexible_body background_box edit_box">
      <a
        href="http://localhost:5173/todo"
        className="margin_left margin_top returnbutton biggest-size button"
      >
        ←
      </a>
      <div className="background_box detail_box">
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
            value={'Delete this task'}
          ></input>
          <input className="button" type="submit" value={'Save'}></input>
        </div>
      </div>
    </div>
  );
}
