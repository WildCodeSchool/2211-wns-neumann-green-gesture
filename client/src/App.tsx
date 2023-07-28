import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import SingleGroup from "./pages/SingleGroup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateGroup from "./pages/CreateGroup/CreateGroup";
import Profile from "./pages/Profile";
import Register from "./pages/Register/Register";
import Layout from "./containers/Layout";
import { Loading } from "./pages/Loading";
import { FriendList } from "./pages/FriendList";
import SingleEcoAction from "./pages/SingleEcoAction";
import { useCurrentUser } from "./hooks/useCurrentUser";

function App() {
  const { currentUser, loading } = useCurrentUser();

  if (loading) return <Loading />;

  return (
    <Routes>
      <Route
        element={<ProtectedRoute isAllowed={currentUser ? false : true} />}
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isAllowed={currentUser ? true : false}
            redirectPath="/login"
          />
        }
      >
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<FriendList />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/groups" element={<h1>Groups / Challenges</h1>} />
          <Route path="/groups/:id" element={<SingleGroup />} />
          <Route path="/eco-actions" element={<h1>Eco-actions</h1>} />
          <Route path="/eco-actions/:id/" element={<SingleEcoAction />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
