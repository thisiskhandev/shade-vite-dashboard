import { Dashboard } from "@/pages/Dashboard";
import { Login } from "@/pages/Login";
import Profile from "@/pages/Profile";
import { Routes, Route } from "react-router-dom";

const WebRoutes = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  return (
    <Routes>
      <Route path="/" element={<h1>THIS IS MAIN PAGE</h1>}></Route>
      {!auth ? (
        <Route path="/login" element={<Login />}></Route>
      ) : (
        <>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </>
      )}
    </Routes>
  );
};

export default WebRoutes;
