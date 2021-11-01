import React from "react";

const organizationHighlight = (props) => {
  return (
    <div className="highlight-wrapper">
      <h3>{props.award}</h3>
      {/* <h4 className="event-time"> {"Date: " + props.date} </h4> */}
      <p>{props.description}</p>
    </div>
  );
};

export default organizationHighlight;
