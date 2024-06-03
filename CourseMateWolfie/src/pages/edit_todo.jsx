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

  return (
    <div className="app">
      <button className="back-button">←</button>
      <div className="form">
        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="input-field course-name"
          />
        </div>
        <div className="form-group">
          <label>Task</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="input-field task-name"
          />
        </div>
        <div className="form-group">
          <label>Posted Date</label>
          <div className="date-time-group">
            <input
              type="text"
              value={postedDate.mm}
              onChange={(e) =>
                setPostedDate({ ...postedDate, mm: e.target.value })
              }
              className="input-field date-field"
              placeholder="MM"
            />
            <input
              type="text"
              value={postedDate.dd}
              onChange={(e) =>
                setPostedDate({ ...postedDate, dd: e.target.value })
              }
              className="input-field date-field"
              placeholder="DD"
            />
            <input
              type="text"
              value={postedDate.yyyy}
              onChange={(e) =>
                setPostedDate({ ...postedDate, yyyy: e.target.value })
              }
              className="input-field date-field"
              placeholder="YYYY"
            />
            <input
              type="text"
              value={postedDate.time}
              onChange={(e) =>
                setPostedDate({ ...postedDate, time: e.target.value })
              }
              className="input-field time-field"
              placeholder="Time"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <div className="date-time-group">
            <input
              type="text"
              value={dueDate.mm}
              onChange={(e) => setDueDate({ ...dueDate, mm: e.target.value })}
              className="input-field date-field"
              placeholder="MM"
            />
            <input
              type="text"
              value={dueDate.dd}
              onChange={(e) => setDueDate({ ...dueDate, dd: e.target.value })}
              className="input-field date-field"
              placeholder="DD"
            />
            <input
              type="text"
              value={dueDate.yyyy}
              onChange={(e) => setDueDate({ ...dueDate, yyyy: e.target.value })}
              className="input-field date-field"
              placeholder="YYYY"
            />
            <input
              type="text"
              value={dueDate.time}
              onChange={(e) => setDueDate({ ...dueDate, time: e.target.value })}
              className="input-field time-field"
              placeholder="Time"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Memo</label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="input-field memo-field"
          />
        </div>
        <button className="delete-button">Delete this task</button>
        <button className="save-button">Save</button>
      </div>
    </div>
  );
}
