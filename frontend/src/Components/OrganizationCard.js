import React from "react";
import { Image } from "react-bootstrap";
function OrganizationCard(props) {
  return (
    <div className="organization-cards">
      <div className="organization-cards-logo">
        <Image
          className="organization-cards-image"
          src="/testPerson.jpg"
          fluid
        />
      </div>
      <div className="organization-cards-info">
        <h3 className="organization-cards-title">{props.organizationName}</h3>
        <p className="organization-cards-info">{props.organizationInfo}</p>
      </div>
    </div>
  );
}

export default OrganizationCard;
