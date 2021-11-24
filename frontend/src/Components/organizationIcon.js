import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function organizationIcon(props) {
  return (
    <div className="organization-wrapper">
      {props.type === "Organization" && (
        <Card className="organization-card" style={{ width: "11rem" }}>
          <Card.Img variant="top" src={props.imageLocation} roundedCircle />
          <Card.Body className="organization-card">
            <Link
              className="organization-card-name card-name-color"
              to={`/organization-profile/${props.organizationId}`}
            >
              {props.organizationName}
            </Link>
          </Card.Body>
        </Card>
      )}

      {props.type === "User" && (
        <Card className="member-card">
          <Card.Body className="member-card">
            <div className="profile-image-container">
              <Card.Img variant="top" src={props.imageLocation} />
            </div>

            <div className="member-card-information">
              <p className="member-card-information-name">{props.memberName}</p>
              <p className="member-card-information-email">
                Contact email: {props.email}
              </p>
            </div>
          </Card.Body>
        </Card>
      )}
      {/* <div className="organization-box">
        <Image className="organization-box-image" src="/testPerson.jpg" fluid />
      </div>
      <p>{props.organizationName}</p> */}
    </div>
  );
}

export default organizationIcon;
