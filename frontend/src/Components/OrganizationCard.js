import React from "react";
import { Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
function OrganizationCard(props) {
  return (
    <div className="organization-cards">
      <div className="organization-cards-logo">
        <Image
          className="organization-cards-image"
          src="/defaultorganization.png"
          fluid
        />
      </div>
      <div className="organization-cards-info">
        <h3 className="organization-cards-title">
          <Link
            className="organization-card-name card-name-color"
            to={`/organization-profile/${props.organizationId}`}
          >
            {props.organizationName}
          </Link>
        </h3>
        <p className="organization-cards-info-description">
          {props.organizationInfo}
        </p>
      </div>
    </div>
  );
}

export default OrganizationCard;
