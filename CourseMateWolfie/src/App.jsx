import Navbar from './pages/navbar';
import Login from './pages/login.jsx';
import SignUp from './pages/signup.jsx';
import GradeEval from './pages/gradeEval.jsx';
import EditCourse from './pages/edit_gradeEval.jsx';
import Todo from './pages/todo.jsx';
import EditTodo from './pages/edit_todo.jsx';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/gradeEval" element={<GradeEval />} />
        <Route path="/editCourse" element={<EditCourse />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/editTodo" element={<EditTodo />} />
      </Routes>
    </>
  );
}

export default App;
