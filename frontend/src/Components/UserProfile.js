import React from "react";
import Navbar from "./Navbar.js";
import { Button, Image, Card } from "react-bootstrap";
import "./UserProfile.scss";
import OrgIcon from "./organizationIcon.js";

function UserProfile(props) {
  return (
    <div className="user-page-wrapper">
      <Navbar />
      <div className="user-page">
        <div className="user-info-wrapper">
          <div className="user-info">
            <Image
              className="user-info-photo"
              src="/testPerson.jpg"
              roundedCircle
            />
            <h1 className="user-info-name text-color">{props.name}</h1>
          </div>
          <div className="user-contact">
            <h2 className="user-contact-header"> Contact Information</h2>
            <p className="white-text">{"Email: " + props.email}</p>
            <p className="white-text">{"Phone number: " + props.phone}</p>
          </div>
        </div>

        <div className="user-options-wrapper">
          <div className="user-resume">
            <h2 className="user-resume-heading text-color">Resume</h2>
            <Button variant="btn user-resume-button" size="lg">
              Add / Update your resume
            </Button>
          </div>
          <div className="user-organizations">
            <h2 className="user-organizations-heading text-color">
              My Organizations
            </h2>
            <div className="user-organizations-cards">
              <OrgIcon
                organizationName="IEEE"
                imageLocation="/testPerson.jpg"
              />
              <OrgIcon
                organizationName="Lorem"
                imageLocation="/testPerson.jpg"
              />
              <OrgIcon
                organizationName="Lorem"
                imageLocation="/testPerson.jpg"
              />
              <OrgIcon
                organizationName="Lorem"
                imageLocation="/testPerson.jpg"
              />
              <OrgIcon
                organizationName="Lorem"
                imageLocation="/testPerson.jpg"
              />
              <OrgIcon
                organizationName="Lorem"
                imageLocation="/testPerson.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
