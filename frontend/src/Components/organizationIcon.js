import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function organizationIcon(props) {
  return (
    <div className="organization-wrapper">
      <Card className="organization-card" style={{ width: "11rem" }}>
        <Card.Img variant="top" src={props.imageLocation} roundedCircle />
        <Card.Body className="organization-card">
          <Link
            className="organization-card-name card-name-color"
            to={`/organization-profile/${props.organizationId}`}
          >
            <a className="organization-card-name">{props.organizationName}</a>
          </Link>
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
