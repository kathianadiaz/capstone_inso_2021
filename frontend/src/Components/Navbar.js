import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Container from "react-bootstrap";
import "./Navbar.scss";

function NavigationBar() {
  return (
    <header>
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
            <Nav.Link href="#deets">Sign up</Nav.Link>
            <Nav.Link href="#deets">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <nav className="navigation">
	  <img src="/TempLogo.png" className="navigation-logo" alt="" />
	  <img src="/Hamburger.png" className="navigation-hamburger" alt="" />
	</nav> */}
    </header>
  );
}

export default NavigationBar;
