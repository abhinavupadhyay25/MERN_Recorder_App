import { Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Homepage from "./pages/homepage/Homepage";
import { useAuth } from "./context/authContext";

function App() {
  const [auth] = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/recorder"
          element={auth?.user ? <Homepage /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
