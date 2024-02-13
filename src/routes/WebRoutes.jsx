import { Dashboard } from "@/pages/Dashboard";
import { Login } from "@/pages/Login";
import { Routes, Route } from "react-router-dom";

const WebRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>THIS IS MAIN PAGE</h1>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
};

export default WebRoutes;
