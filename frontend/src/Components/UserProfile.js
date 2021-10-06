import React, { useState, useRef } from "react";
import Navbar from "./Navbar.js";
import { Button, Image, Card } from "react-bootstrap";
import "./UserProfile.scss";
import OrgIcon from "./organizationIcon.js";
import EditM from "./EditModal.js";

function UserProfile(props) {
  const userInfo = {
    email: props.email,
    phone: props.phone,
  };
  const [userData, setUserData] = useState(userInfo);
  const [resume, setresume] = useState("");
  const [fileuploaded, setfileuploaded] = useState(false);
  const inputRef = useRef();

  const openFiles = () => {
    inputRef.current.click();
  };

  const handleResume = (e) => {
    const resumefile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(resumefile);
    reader.onload = () => {
      setresume(e.target.files[0]);
      setfileuploaded(true);
    };
    reader.onerror = () => {
      console.log("file errors", reader.error);
    };
  };

  let resumeDoc = "";
  if (fileuploaded) {
    resumeDoc = URL.createObjectURL(resume);
  }

  console.log(userData);
  console.log(resume);
  console.log(resumeDoc);

  return (
    <div className="user-page-wrapper">
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
            <h2 className="user-contact-header">
              Contact Information:{" "}
              <EditM mdata={userData} setdata={setUserData} type="User" />
            </h2>
            <div className="user-contact-information">
              <p className="white-text">{"Email: " + userData.email}</p>
              <p className="white-text">{"Phone number: " + userData.phone}</p>
            </div>
          </div>
        </div>

        <div className="user-options-wrapper">
          <div className="user-resume">
            <h2 className="user-resume-heading text-color">Resume:</h2>
            <div className="user-resume-upload">
              <Button
                onClick={openFiles}
                variant="btn user-resume-button"
                size="lg"
              >
                Add / Update your resume
              </Button>
              <input type="file" ref={inputRef} onChange={handleResume} />
              <a className="download-link" href={resumeDoc} download="resume">
                Click here to download resume
              </a>
            </div>
          </div>
          <div className="user-organizations">
            <h2 className="user-organizations-heading text-color">
              My Organizations:
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
