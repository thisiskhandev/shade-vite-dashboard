import { Dashboard } from "@/pages/Dashboard";
import { Login } from "@/pages/Login";
import Profile from "@/pages/Profile";
import AddPost from "@/pages/AddPost";
import { Routes, Route } from "react-router-dom";
import Homepage from "@/pages/Homepage";

const WebRoutes = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  return (
    <Routes>
      <Route path="*" element={<Homepage />}></Route>
      {!auth ? (
        <Route path="/login" element={<Login />}></Route>
      ) : (
        <>
          <Route path="/admin" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/add-post" element={<AddPost />}></Route>
        </>
      )}
    </Routes>
  );
};

export default WebRoutes;
