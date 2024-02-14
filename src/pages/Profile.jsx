import React from "react";

const Profile = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  return (
    <main>
      <section>
        <h1 className="text-2xl mt-64 text-center">
          Hi, {auth.user_display_name} 👋
        </h1>
      </section>
    </main>
  );
};

export default Profile;
