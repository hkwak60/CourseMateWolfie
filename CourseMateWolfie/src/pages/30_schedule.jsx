import React from 'react';

export default function Todo() {
  function Task({ course, task, postedDate, dueDate, memo }) {
    return (
      <div className="task">
        <div className="course">{course}</div>
        <div className="task-name">{task}</div>
        <div className="posted-date">
          <strong>Posted Date:</strong> {postedDate}
        </div>
        <div className="due-date">
          <strong>Due Date:</strong> {dueDate}
        </div>
        <div className="memo">{memo}</div>
      </div>
    );
  }
  return (
    <div className="app">
      <div className="header">
        <button className="order-button">Order</button>
        <button className="add-task-button">+ Add Task</button>
      </div>
      <div className="task-list">
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
  );
}
