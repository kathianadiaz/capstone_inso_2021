import React from "react";
import { Button, Image } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import "./JoinRequest.scss";
function JoinRequest(props) {
  return (
    <div className="requests-container">
      <div className="join-request-card">
        <div className="join-request-card-user">
          <Image
            className="user-request-photo"
            src={props.image}
            roundedCircle
          />
          <div className="join-request-card-user-info">
            <p>{props.name}</p>
            <p>{props.email}</p>
            <p>{props.message}</p>
          </div>
        </div>
        <div className="join-request-card-buttons">
          <Button variant="outline-success">Accept</Button>
          <Button variant="outline-danger">Deny</Button>
        </div>
      </div>
    </div>
  );
}

export default JoinRequest;
