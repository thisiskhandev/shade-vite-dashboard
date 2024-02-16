import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  // const auth = JSON.parse(localStorage.getItem("user"));
  const auth = useSelector((state) => state.auth.user);
  return (
    <main>
      <section>
        <h1 className="text-2xl mt-64 text-center">
          Hi,{" "}
          <span className="font-extrabold uppercase">
            {auth.user_display_name}
          </span>{" "}
          👋
        </h1>
      </section>
    </main>
  );
};

export default Profile;
