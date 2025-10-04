import { NavLink, Route, Routes } from "react-router";
import "./App.css";
import { Login, Signup } from "./components";
import { Lists } from "./routes/Lists/Lists";
import Statistics from "./routes/Statistics/Statistics";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/" element={<NavLink to="/lists" />} />
      </Routes>
    </div>
  );
}

export default App;
