import React from "react";
import spinner from "../../../images/spinner.gif";

const Spinner = () => {
  return (
    <img
      src={spinner}
      style={{
        width: "130px",
        margin: "auto",
        display: "block",
        padding: "130px 0",
        background: "none",
      }}
      alt="Loading"
    />
  );
};

export default Spinner;
