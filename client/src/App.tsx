import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import SingleGroup from "./pages/SingleGroup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewGroup from "./pages/CreateGroup";
import Profile from "./pages/Profile";
import Register from "./pages/Register/Register";
import { useGetCurrentUserQuery } from "./gql/generated/schema";
import Layout from "./containers/Layout";
import { Loading } from "./pages/Loading";
import { FriendList } from "./pages/FriendList";
import SingleEcoAction from "./pages/SingleEcoAction";

function App() {
  const { data: currentUser, loading } = useGetCurrentUserQuery({
    errorPolicy: "ignore",
  });

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
          <Route path="/create-group" element={<NewGroup />} />
          <Route path="/group/:id" element={<SingleGroup />} />
          <Route
            path="/single-ecoaction/:id/:id"
            element={<SingleEcoAction />}
          />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
