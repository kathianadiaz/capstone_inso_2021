import React from "react";
import { Card } from "react-bootstrap";

function organizationIcon(props) {
  return (
    <div className="organization-wrapper">
      <Card className="organization-card" style={{ width: "11rem" }}>
        <Card.Img variant="top" src={props.imageLocation} roundedCircle />
        <Card.Body className="organization-card">
          <a className="organization-card-name">{props.organizationName}</a>
        </Card.Body>
      </Card>
      {/* <div className="organization-box">
        <Image className="organization-box-image" src="/testPerson.jpg" fluid />
      </div>
      <p>{props.organizationName}</p> */}
    </div>
  );
}

export default organizationIcon;
