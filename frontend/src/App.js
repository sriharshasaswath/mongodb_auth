import Home from "./components/Home";
import Login from "./components/login";
import Register from "./components/register";
import { Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
