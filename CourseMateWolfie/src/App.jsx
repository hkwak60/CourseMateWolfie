import Login from "./pages/00_login.jsx";
import SignUp from "./pages/01_signup.jsx";
import Navbar from "./pages/02_navbar.jsx";
import GradeEval from "./pages/gradeEval.jsx";
import EditGradeEval from "./pages/edit_gradeEval.jsx";
import Todo from "./pages/todo.jsx";
import EditTodo from "./pages/edit_todo.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/gradeEval" element={<GradeEval />} />
        <Route path="/edit_gradeEval" element={<EditGradeEval />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/editTodo" element={<EditTodo />} />
      </Routes>
    </>
  );
}

export default App;
