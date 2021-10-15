import React from "react";
import { Image } from "react-bootstrap";
function OrganizationCard() {
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
        <h3 className="organization-cards-title">Test</h3>
        <p className="organization-cards-info">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
          nobis.
        </p>
      </div>
    </div>
  );
}

export default OrganizationCard;
