import React from "react";
import { Button, Image } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import "./JoinRequest.scss";
import axios from "axios";
import { useMutation } from "react-query";

function JoinRequest(props) {
  const handleAcceptJoinRequest = useMutation(
    async () => {
      axios.defaults.headers.post["Authorization"] = `Bearer ${props.token}`;
      await axios.post(
        `http://localhost:8000/organization/${props.o_id}/request/${props.r_id}/accept`
      );
    },
    {
      onSuccess: async () => {
        props.requestDeleted(props.r_id);
      },
    }
  );

  const handleDenyJoinRequest = useMutation(
    async () => {
      axios.defaults.headers.post["Authorization"] = `Bearer ${props.token}`;
      await axios.post(
        `http://localhost:8000/organization/${props.o_id}/request/${props.r_id}/decline`
      );
    },
    {
      onSuccess: async () => {
        props.requestDeleted(props.r_id);
      },
    }
  );

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
            <p>
              {props.requestinfo.name.charAt(0).toUpperCase() +
                props.requestinfo.name.slice(1)}
            </p>
            <p>
              {props.requestinfo.message.charAt(0).toUpperCase() +
                props.requestinfo.message.slice(1)}
            </p>
            <p>{props.requestinfo.date}</p>
          </div>
        </div>
        <div className="join-request-card-buttons">
          <Button
            variant="outline-success"
            onClick={() => handleAcceptJoinRequest.mutate()}
          >
            Accept
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => handleDenyJoinRequest.mutate()}
          >
            Deny
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JoinRequest;
