import React from "react";

const organizationEvent = (props) => {
  return (
    <div className="event-wrapper">
      <h3>{props.eventname}</h3>
      <h4 className="event-time"> {"Date: " + props.date} </h4>
      <p>{props.description}</p>
    </div>
  );
};

export default organizationEvent;
