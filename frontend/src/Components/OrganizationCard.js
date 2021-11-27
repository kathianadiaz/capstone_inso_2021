import React, { useState, useEffect } from "react";
import { Image, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function OrganizationCard(props) {
  const [imageSpinner, setImageSpinner] = useState(true);
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
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
          new Blob(binaryData, { type: "application/zip" })
        );
        setImageData(image);
        console.log(response);
        setImageSpinner(false);
      })
      .catch((error) => {
        console.log(error);
        setImageSpinner(false);
      });
  }, []);

  return (
    <div className="organization-cards">
      <div className="organization-cards-logo">
        {imageSpinner && (
          <Spinner animation="border" role="status" size="bg">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {!imageSpinner && imageData.length === 0 ? (
          <Image src="/defaultorganization.png" fluid />
        ) : (
          <Image src={imageData} fluid />
        )}
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
