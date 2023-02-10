import { Route, Routes } from "react-router-dom";
import "./App.css";

// PAGES
// - Auth
// - Home
// - Profile
// - CreateGroup
// - Challenge/:id

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<h1>Authentication</h1>} />
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
        <Route path="/create-group" element={<h1>CreateGroup</h1>} />
        <Route path="/challenge/:id" element={<h1>Challenge</h1>} />
      </Routes>
    </div>
  );
}

export default App;
