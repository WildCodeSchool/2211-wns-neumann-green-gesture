import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import SingleGroup from "./pages/SingleGroup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewGroup from "./pages/CreateGroup";
import Profile from "./pages/Profile";
import Register from "./pages/Register/Register";
import Layout from "./containers/Layout";

function App() {
  const isLoggedIn = window.localStorage.getItem("gg_logged") === "isLogged";

  return (
    <Routes>
      {/* <Route element={<ProtectedRoute isAllowed={!isLoggedIn} />}> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* </Route> */}

      {/* <Route
        element={
          <ProtectedRoute isAllowed={isLoggedIn} redirectPath="/login" />
        }
      > */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-group" element={<NewGroup />} />
        <Route path="/group/:id" element={<SingleGroup />} />
      </Route>
      {/* </Route> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
