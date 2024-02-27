import { Dashboard } from "@/pages/Dashboard";
import { Login } from "@/pages/Login";
import Profile from "@/pages/Profile";
import AddPost from "@/pages/AddPost";
import Archive from "@/pages/posts/Archive";
import { Routes, Route } from "react-router-dom";
import Homepage from "@/pages/Homepage";
import { useSelector } from "react-redux";
import SinglePost from "@/pages/posts/SinglePost";

const WebRoutes = () => {
  // const auth = JSON.parse(localStorage.getItem("user"));
  const auth = useSelector((state) => state.auth.user);
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      {auth.token && (
        <>
          <Route path="/add-post" element={<AddPost />}></Route>
          <Route path="/admin" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </>
      )}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/blogs" element={<Archive />}></Route>
      <Route path="/blogs/:id" element={<SinglePost />}></Route>
      <Route path="/tag/:id" element={<Archive />}></Route>
      <Route path="/category/:id" element={<Archive />}></Route>

      <Route path="*" element={<h1>404 NO URL FOUND</h1>}></Route>
    </Routes>
  );
};

export default WebRoutes;
