import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import SingleGroup from "./pages/SingleGroup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewGroup from "./pages/CreateGroup";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { useGetCurrentUserQuery } from "./gql/generated/schema";

function App() {
  const { data, loading } = useGetCurrentUserQuery();
  const currentUser = data?.getCurrentUser;

  const isLoggedIn = loading || (currentUser ? true : false);

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        element={
          <ProtectedRoute isAllowed={isLoggedIn} redirectPath="/login" />
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-group" element={<NewGroup />} />
        <Route path="/group/:id" element={<SingleGroup />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
