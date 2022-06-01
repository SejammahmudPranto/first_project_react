import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../Contexts/AuthContext";
import "../Styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/signup" element={<PublicRoute />}>
              <Route exact path="/signup" element={<Signup />} />
            </Route>
            <Route exact path="/login" element={<PublicRoute />}>
              <Route exact path="/login" element={<Login />} />
            </Route>
            <Route exact path="/quiz/:id" element={<PrivateRoute />}>
              <Route exact path="/quiz/:id" element={<Quiz />} />
            </Route>
            <Route exact path="/result/:id" element={<PrivateRoute />}>
              <Route exact path="/result/:id" element={<Result />} />
            </Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}
