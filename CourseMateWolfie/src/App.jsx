import Login from "./pages/00_login.jsx";
import SignUp from "./pages/01_signup.jsx";
import Navbar from "./pages/02_navbar.jsx";
import ShowNavbar from "./pages/03_showNavbar.jsx";
import GradeEval from "./pages/10_gradeEval.jsx";
import EditGradeEval from "./pages/11_edit_gradeEval.jsx";
import Todo from "./pages/20_todo.jsx";
import EditTodo from "./pages/21_edit_todo.jsx";
import CourseInfo from "./pages/30_courseInfo.jsx";
import EditCourseInfo from "./pages/31_edit_courseInfo.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <ShowNavbar>
        <Navbar />
      </ShowNavbar>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/gradeEval" element={<GradeEval />} />
        <Route path="/edit_gradeEval/:data" element={<EditGradeEval />} />
        <Route path="/edit_gradeEval/" element={<EditGradeEval />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/edit_todo/:data" element={<EditTodo />} />
        <Route path="/edit_todo" element={<EditTodo />} />
        <Route path="/courseInfo" element={<CourseInfo />} />
        <Route path="/edit_courseInfo/:data" element={<EditCourseInfo />} />
        <Route path="/edit_courseInfo" element={<EditCourseInfo />} />
      </Routes>
    </div>
  );
}

export default App;
