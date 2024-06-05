import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CourseDetails() {
  const [id, setId] = useState(-1);
  const [course, setCourse] = useState("");
  const { data } = useParams();
  const [boxes, setBoxes] = useState([]);
  let newPageFlag = 0;

  useEffect(() => {
    const [_, newCourse] = data.split("@");
    setCourse(newCourse);

    axios.get("http://localhost:8000/loadOnline").then((res) => {
      setId(res.data[0].user_id);
    });

    axios
      .post("http://localhost:8000/loadCourse", data.split("@"))
      .then((res) => {
        const loaded = res.data[0];
        const items = loaded.item.split("#");
        const averages = loaded.average.split("#");
        const denoms = loaded.denom.split("#");
        const percentages = loaded.percentage.split("#");

        const newdata = items.map((data, i) => {
          return {
            item: data,
            average: parseInt(averages[i]),
            denom: parseInt(denoms[i]),
            percentage: parseInt(percentages[i]),
          };
        });
        setBoxes(newdata);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const addBox = () => {
    // console.log("Add Boxes", boxes);
    const newdata = [
      ...boxes,
      {
        item: "sample",
        average: 0,
        denom: 1,
        percentage: 0,
      },
    ];
    setBoxes(newdata);
  };
  const removeBox = (i) => {
    const newdata = [...boxes];
    newdata.splice(i, 1);
    setBoxes(newdata);
  };

  const handleSave = (e) => {
    if (course.length === 0) alert("Enter course name!");
    else if (boxes[0] === null || boxes[0] === undefined) alert("Add subject!");
    else {
      let comb_item = "" + boxes[0].item;
      let comb_avg = "" + boxes[0].average;
      let comb_den = "" + boxes[0].denom;
      let comb_per = "" + boxes[0].percentage;
      boxes.forEach((data, i) => {
        if (i !== 0) {
          comb_item += "#" + data.item;
          comb_avg += "#" + data.average;
          comb_den += "#" + data.denom;
          comb_per += "#" + data.percentage;
        }
      });

      const newdata = {
        user_id: id,
        course: course,
        item: comb_item,
        average: comb_avg,
        denom: comb_den,
        percentage: comb_per,
      };
      axios
        .post("http://localhost:8000/updateGradeEval", newdata, {})
        .then((response) => {})
        .catch((error) => {
          console.error("Error:", error);
        });
      alert("saved!");
      window.location.href = "/gradeEval";
    }
  };

  const handleChange = (onChangeValue, i, change) => {
    const newdata = [...boxes];
    if (change === 1) newdata[i].item = onChangeValue.target.value;
    else if (change === 2) newdata[i].average = onChangeValue.target.value;
    else if (change === 3) newdata[i].denom = onChangeValue.target.value;
    else newdata[i].percentage = onChangeValue.target.value;
    setBoxes(newdata);
  };
  const handleCourse = (onChangeValue) => {
    setCourse(onChangeValue.target.value);
  };

  const boxForm = (i, item, average, denom, percentage) => {
    return (
      <div className="section" key={i}>
        <input value={item} onChange={(e) => handleChange(e, i, 1)}></input>
        <div className="item">
          <span className="score">
            <input value={average} onChange={(e) => handleChange(e, i, 2)} />
            {"/"}
            <input value={denom} onChange={(e) => handleChange(e, i, 3)} />
          </span>
          <button className="delete-button" onClick={() => removeBox(i)}>
            🗑️
          </button>
          <div className="percentage">
            Percentage:{" "}
            {
              <input
                value={percentage}
                onChange={(e) => handleChange(e, i, 4)}
              />
            }{" "}
            / 100
          </div>
        </div>
      </div>
    );
  };

  function ActiveLink({ to, children, ...props }) {
    //Special type to treat navigation
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  }

  return (
    <main className="course-details">
      <ActiveLink className="navbutton" to="/gradeEval">
        ←
      </ActiveLink>
      <button className="add-item-button" onClick={() => addBox()}>
        + Add Item
      </button>
      <h1>Course Name</h1>
      <h2>
        <input value={course} onChange={(e) => handleCourse(e)} />
      </h2>
      {boxes.map((data, i) => {
        return boxForm(i, data.item, data.average, data.denom, data.percentage);
      })}
      <button className="delete-course-button">Delete this course</button>
      <button className="save-button" onClick={() => handleSave()}>
        Save
      </button>
    </main>
  );
}
