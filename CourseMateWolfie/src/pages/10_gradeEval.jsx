import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const courses = [
  { name: "CSE 310", score: "89/100", grade: "B+" },
  { name: "CSE 316", score: "95/100", grade: "A" },
  { name: "CSE 320", score: "92/100", grade: "A-" },
  { name: "New Course", score: "0/100", grade: "-" },
];

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

export default function CourseTable() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/loadGradeEval")
      .then((res) => {
        const newdata = res.data.map((data) => {
          return {
            user_id: data.user_id,
            course: data.course,
            item: data.item,
            average: data.average,
            denom: data.denom,
            percentage: data.percentage,
          };
        });
        setBoxes(newdata);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handlePage = (e, i) => {
    if (i == -1) {
      let path = "edit_gradeEval/@";
      window.location.href = path;
    } else {
      // axios
      //   .post("http://localhost:8000/removeCourse", boxes[i])
      //   .then((response) => {})
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });
      let conv = boxes[i].user_id + "@" + boxes[i].course;
      let path = "edit_gradeEval/" + conv;
      window.location.href = path;
    }
  };

  const boxForm = (name, average, denom, percentage, i) => {
    const averages = average.split("#");
    const denoms = denom.split("#");
    const percentages = percentage.split("#");
    let perc_sum = 0;
    percentages.forEach((data) => {
      perc_sum += parseFloat(data);
    });
    let sum = 0;
    averages.forEach((data, i) => {
      let avg = parseFloat(data);
      let den = parseFloat(denoms[i]);
      let per = parseFloat(percentages[i]);
      sum += (avg / den) * 100 * (per / perc_sum);
    });
    let letter = "";
    let op = "";
    if (sum / 10 >= 9) letter = "A";
    else if (sum / 10 >= 8) letter = "B";
    else if (sum / 10 >= 7) letter = "C";
    else letter = "F";

    if (sum % 10 >= 7 && letter !== "A" && letter !== "F") op = "+";
    if (sum % 10 <= 3 && letter !== "F") op = "-";

    const letterGrade = letter + op;
    return (
      <tr className="course_contents" key={i}>
        <td scope="row" className="course_name ">
          <div onClick={(e) => handlePage(e, i)} className="course_name">
            {name}
          </div>
        </td>
        <td className="course_score">
          <div className="course_details">{sum}/100</div>
        </td>
        <td className="course_letter">
          <div className="course_details">{letterGrade}</div>
        </td>
      </tr>
    );
  };

  return (
    <main className="container">
      <table className="grade_display">
        <thead className="line">
          <tr className="grade_header">
            <th className="course_name" scope="col">
              Course Name
            </th>
            <th className="course_score" scope="col">
              Scores
            </th>
            <th className="course_letter" scope="col">
              Expected Grade
            </th>
          </tr>
        </thead>
        <tbody>
          {boxes.map((data, i) =>
            boxForm(data.course, data.average, data.denom, data.percentage, i)
          )}
        </tbody>
      </table>
      <a className="navbutton" onClick={(e) => handlePage(e, -1)}>
        Add Course
      </a>
    </main>
  );
}
