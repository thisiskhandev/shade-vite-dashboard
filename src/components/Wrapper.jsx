import React from "react";

const Wrapper = ({
  children,
  style: customStyles,
  className: customClasses,
}) => {
  return (
    <main
      className={
        "container flex flex-col items-center justify-center" +
        " " +
        customClasses
      }
      style={{ ...styles, ...customStyles }}
    >
      {children}
    </main>
  );
};

export default Wrapper;

const styles = {
  height: "90vh",
};
