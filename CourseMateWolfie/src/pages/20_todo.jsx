import React from 'react';

export default function Todo() {
  function Task({ course, task, postedDate, dueDate, memo }) {
    return (
      <div className="inline-block">
        <input type="radio" name="finished" value="done" />
        <div className="task">
          <div className="course big-size">{course}</div>
          <div className="task-name big-size">{task}</div>
          <div className="posted-date">{postedDate}</div>
          <div className="due-date">{dueDate}</div>
          <div className="memo">{memo}</div>
        </div>
      </div>
    );
  }
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
          href="http://localhost:5173/edit_todo"
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
        <div className="task-display">
          <Task
            course="CSE 310"
            task="Assignment 1"
            postedDate="Apr 18, 10:00 am"
            dueDate="Apr 25, 11:59 pm"
            memo="Programming assignment with Python"
          />
          <Task
            course="CSE 316"
            task="Project Proposal"
            postedDate="Apr 24, 10:00 am"
            dueDate="Apr 29, 11:59 pm"
            memo="Write a team project proposal"
          />
        </div>
        <button className="done-button">Done!</button>
      </div>
    </div>
  );
}
