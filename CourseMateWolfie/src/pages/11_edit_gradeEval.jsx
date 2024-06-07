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
        item: "ITEM",
        average: 100,
        denom: 100,
        percentage: 100,
      },
    ];
    setBoxes(newdata);
  };
  const removeBox = (i) => {
    const newdata = [...boxes];
    newdata.splice(i, 1);
    setBoxes(newdata);
  };

  const handleDelete = (course) => {
    console.log(course);
    axios
      .post("http://localhost:8000/deleteGradeEval", [id, course])
      .then((response) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
    alert("deleted!");
    window.location.href = "/gradeEval";
  };

  const handleSave = (e) => {
    if (course.length === 0) {
      alert("Enter course name!");
    } else if (boxes[0] === null || boxes[0] === undefined)
      alert("Add at least 1 item!");
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
      console.log(newdata);
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
      <div className="itembox" key={i}>
        <div className="space-between">
          <input
            className="item-input"
            value={item}
            onChange={(e) => handleChange(e, i, 1)}
          ></input>
          <div className="dates flex margin-top-right">
            <input
              className="number-input"
              value={average}
              onChange={(e) => handleChange(e, i, 2)}
            />
            {"/"}
            <input
              className="number-input"
              value={denom}
              onChange={(e) => handleChange(e, i, 3)}
            />
            <button className="trashcan" onClick={() => removeBox(i)}>
              🗑️
            </button>
          </div>
        </div>
        <h4 className="percentage">
          Percentage:{" "}
          {
            <input
              className="number-input"
              value={percentage}
              onChange={(e) => handleChange(e, i, 4)}
            />
          }{" "}
          / 100
        </h4>
      </div>
    );
  };

  return (
    <div className="flexible_body background_box">
      <div className="edit_background_box detail_box">
        <div className="buttons_display">
          <a
            href="http://localhost:5173/gradeEval"
            className="margin_left margin_top returnbutton biggest-size button"
          >
            ←
          </a>
          <button className="button navbutton" onClick={() => addBox()}>
            + Add Item
          </button>
        </div>
        <h4>Course Name</h4>
        <input
          className="inputbox"
          value={course}
          onChange={(e) => handleCourse(e)}
          disabled={data !== "@"}
        />
        {boxes.map((data, i) => {
          return boxForm(
            i,
            data.item,
            data.average,
            data.denom,
            data.percentage
          );
        })}
        <div className="buttons_display">
          <button className="deletebutton" onClick={() => handleDelete(course)}>
            Delete this course
          </button>
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
