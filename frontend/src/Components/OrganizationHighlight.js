import React from "react";

const organizationHighlight = (props) => {
  return (
    <div className="highlight-wrapper">
      <h3>{props.award}</h3>
      <p>{props.description}</p>
    </div>
  );
};

export default organizationHighlight;
