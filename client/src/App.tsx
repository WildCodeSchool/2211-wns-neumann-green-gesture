import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Challenge from "./pages/Challenge";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewGroup from "./pages/NewGroup";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  const isAllowed = false;
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* <Route
        element={<ProtectedRoute isAllowed={isAllowed} redirectPath="/login" />}
      > */}
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-group" element={<NewGroup />} />
      <Route path="/challenge/:id" element={<Challenge />} />
      {/* </Route> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
