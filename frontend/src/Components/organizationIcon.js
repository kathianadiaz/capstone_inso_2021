import React, { useState, useEffect } from "react";
import { Spinner, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function OrganizationIcon(props) {
  const [imageSpinner, setImageSpinner] = useState(true);
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    if (props.type === "Organization") {
      const config = {
        responseType: "blob",
      };
      axios
        .get(
          `http://localhost:8000/organization/${props.organizationId}/image`,
          config
        )
        .then((response) => {
          let binaryData = [];
          binaryData.push(response.data);
          let image = window.URL.createObjectURL(
            new Blob(binaryData, { type: response.data.type })
          );
          setImageData(image);
          // console.log(response);
          setImageSpinner(false);
        })
        .catch((error) => {
          console.log(error);
          setImageSpinner(false);
        });
    }
  }, []);

  return (
    <div className="organization-wrapper">
      {props.type === "Organization" && (
        <Card className="organization-card" style={{ width: "11rem" }}>
          {imageSpinner && (
            <Spinner animation="border" role="status" size="bg">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {!imageSpinner && imageData.length !== 0 && (
            <Card.Img
              className="card-userorgs-image"
              variant="top"
              src={imageData}
            />
          )}

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

export default OrganizationIcon;
