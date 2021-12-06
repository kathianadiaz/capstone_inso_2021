import React from "react";
import { Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";

function NotFound(props) {
  const { message } = props;

  return (
    <Container>
      <Col align="center" className="my-3">
        <FontAwesomeIcon icon={faFrown} size="9x" />
        <h1>{message}</h1>
      </Col>
    </Container>
  );
}

export default NotFound;
