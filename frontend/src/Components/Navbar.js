import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Container from "react-bootstrap";
import "./Navbar.scss";
import { Router, Link } from "react-router-dom";
import SignIn from "./Sign-in";

function NavigationBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Navbar.Brand href="#home">
        <img
          src="/TempLogo.png"
          width="30"
          height="30"
          className="navigation-logo"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>{" "}
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#about">About us</Nav.Link>
          <Nav.Link href="#pricing">Features</Nav.Link>
          <Nav.Link href="#pricing">Contact us</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/SignUp">
            Sign Up
          </Nav.Link>{" "}
          <Nav.Link as={Link} to="/SignIn">
            Sign In
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
