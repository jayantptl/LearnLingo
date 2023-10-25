import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./components/Home";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import EnglishQuiz from "./components/EnglishQuiz";
import ExcerciseScore from "./components/ExcerciseScore";
import UserDashboard from "./components/UserDashboard";
import LeaderBoard from "./components/LeaderBoard";


function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] h-screen">
      {/* App routing */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Show protected routes only when user is logged in using jwt token */}
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/englishquiz"
            element={user ? <EnglishQuiz /> : <Navigate to="/login" />}
          />

          <Route
            path="/excerciseScore"
            element={user ? <ExcerciseScore /> : <Navigate to="/login" />}
          />
          <Route
            path="/getUserDashbord"
            element={user ? <UserDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/getUserLeaderboard"
            element={user ? <LeaderBoard /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
