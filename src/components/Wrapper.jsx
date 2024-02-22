import React from "react";

const Wrapper = ({ children }) => {
  return (
    <main
      className="container flex flex-col items-center justify-center"
      style={{ ...styles }}
    >
      {children}
    </main>
  );
};

export default Wrapper;

const styles = {
  height: "90vh",
};
