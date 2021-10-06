import React from "react";

const organizationEvent = (props) => {
  return (
    <div className="event-wrapper">
      <h3>{props.type}</h3>
      <p>{props.description}</p>
    </div>
  );
};

export default organizationEvent;
