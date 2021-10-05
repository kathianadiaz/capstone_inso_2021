import React from "react";
import Navbar from "./Navbar.js";
import { Image, Button } from "react-bootstrap";
import OrgHighlight from "./OrganizationHighlight.js";
import OrgEvent from "./OrganizationEvent.js";
import "./OrganizationProfile.scss";
function OrganizationProfile(props) {
  return (
    <div className="organizationpage-wrapper">
      <Navbar />
      <div className="organizationpage-container">
        <div className="organization-container">
          <div className="organization-heading">
            <div className="organization-heading-logo">
              <Image src="/Logo-IEEE.jpg" fluid />
            </div>
            <div className="organization-heading-info">
              <h2>Lorem ipsum dolor sit amet.</h2>
              <div className="organization-heading-buttons-container">
                <Button
                  variant="btn organization-heading-button remove-functions"
                  size="lg"
                >
                  Status: {props.status}
                </Button>
                <Button variant="btn organization-heading-button" size="lg">
                  Request to join
                </Button>
              </div>
            </div>
          </div>
          <div className="organization-description organization-layout">
            <h3 className="section-heading">Organization Description: </h3>
            <p>{props.description}</p>
          </div>
          <div className="organization-highlights organization-layout">
            <h3 className="section-heading">Organization's highlights:</h3>
            <OrgHighlight
              award="Competition 2015"
              description="   Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe quam
				magni quasi natus dicta nesciunt? "
            />
            <OrgHighlight
              award="Competition 2010"
              description="   Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe quam
				magni quasi natus dicta nesciunt? "
            />
            <OrgHighlight
              award="First place at UPRM"
              description="   Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe quam
						magni quasi natus dicta nesciunt? "
            />
          </div>
          <div className="organization-events organization-layout">
            <h3 className="section-heading">Organization's Events:</h3>
            <OrgEvent
              event="Pizza- august 2015"
              description=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe quam
		  magni quasi natus dicta nesciunt?"
            />
            <OrgEvent
              event="Chocolate sale- august 2020"
              description=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe quam
		  magni quasi natus dicta nesciunt?"
            />
            <OrgEvent
              event="Guacamole sale- October 2020"
              description=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe quam
		  magni quasi natus dicta nesciunt?"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationProfile;
