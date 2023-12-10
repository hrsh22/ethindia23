import React from "react";
import "./spinner.css"; // Import the generated CSS file

const Spinner = () => {
  return (
    <div className="lds-spinner">
      {[...Array(12)].map((_, index) => (
        <div key={index} />
      ))}
    </div>
  );
};

export default Spinner;
