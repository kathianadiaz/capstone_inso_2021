import { React, useState, useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./Navbar.scss";
import { Router, Link, Redirect } from "react-router-dom";
import SignIn from "./Sign-in";
import { AuthContext } from "./AuthContext";

function NavigationBar(props) {
  const [loggedIn, setloggedIn] = useState(true);
  const [state, setState] = useContext(AuthContext);
  const changeNavbartoggle = () => {
    // props.navbarchange(false);
    setState(null);
  };
  // if (props.navbartoggle === false) {
  if (state === null) {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light">
        <Nav.Link as={Link} to="/">
          {" "}
          <img
            src="/TempLogo.png"
            width="30"
            height="30"
            className="navigation-logo"
            alt="React Bootstrap logo"
          />
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#about">About us</Nav.Link>
            <Nav.Link href="#feature">Features</Nav.Link>
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
  } else {
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
            <Navbar.Brand>Welcome {state.user} !</Navbar.Brand>
          </Nav>
          <Nav>
            {/* <Nav.Link as={Link} to="/SignIn">
              Log-out
            </Nav.Link> */}
            <Nav.Link as={Link} to="/MyOrganization">
              My organization
            </Nav.Link>
            <Nav.Link as={Link} to="/UserProfile">
              User Profile
            </Nav.Link>
            <Button className="btn logout-button" onClick={changeNavbartoggle}>
              Log-out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
