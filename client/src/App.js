import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/views/NavBar";
import LandingPage from "./components/views/LandingPage";
import Footer from "./components/views/Footer";
import LoginPage from "./components/views/LoginPage";
import RegisterPage from "./components/views/RegisterPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/LandingPage" element={<LandingPage />} />
          <Route exact path="/Login" element={<LoginPage />} />
          <Route exact path="/Register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
