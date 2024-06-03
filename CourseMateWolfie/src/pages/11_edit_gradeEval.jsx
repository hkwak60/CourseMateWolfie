import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function CourseDetails() {
  const Item = ({ name, score }) => {
    return (
      <div className="item">
        <span>{name}</span>
        <span className="score">{score}</span>
        <button className="delete-button">🗑️</button>
      </div>
    );
  };

  const Section = ({ title, items }) => {
    return (
      <div className="section">
        <h3>{title}</h3>
        {items.map((item, index) =>
          item.name ? (
            <Item key={index} name={item.name} score={item.score} />
          ) : (
            <div key={index} className="percentage">
              Percentage: {item.percentage}
            </div>
          )
        )}
      </div>
    );
  };
  function ActiveLink({ to, children, ...props }) {
    //Special type to treat navigation
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
      <li className={isActive ? 'active' : ''}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  }

  return (
    <div className="course-details">
      {/* <button className="back-button">←</button> */}
      <ActiveLink className="navbutton" to="/gradeEval">
        ←
      </ActiveLink>
      <button className="add-item-button">+ Add Item</button>
      <h1>Course Name</h1>
      <h2>CSE 316</h2>
      <Section
        title="QUIZ"
        items={[
          { name: 'Quiz 1', score: '4 / 5' },
          { name: 'Quiz 2', score: '5 / 5' },
          { percentage: '10 / 100' },
        ]}
      />
      <Section
        title="Assignment"
        items={[
          { name: 'Assignment 1', score: '19 / 20' },
          { name: 'Assignment 2', score: '18 / 20' },
          { percentage: '20 / 100' },
        ]}
      />
      <Section
        title="Midterm"
        items={[
          { name: 'Midterm 1', score: '85 / 100' },
          { percentage: '20 / 100' },
        ]}
      />
      <button className="delete-course-button">Delete this course</button>
      <button className="save-button">Save</button>
    </div>
  );
}
