import React from "react";
import "./Homepage.scss";
import { Link } from "react-router-dom";
import NavigationBar from "./Navbar";
import { Button } from "react-bootstrap";
function Homepage() {
  return (
    <div className="homepage-container">
      {/* <NavigationBar /> */}
      <div className="welcome">
        <div className="welcome-image">
          <img src="/WelcomeImage.png" alt="" className="girl-studying" />
        </div>

        <div className="welcome-container">
          <h1 className="welcome-title">
            <span className="blue-text">Welcome to the place to join </span>
            <span className="green-text">student organizations</span>
          </h1>
          <div className="welcome-buttons">
            <Button variant="link-btn search-button" size="lg">
              <Link to="/OrganizationsList" className="custom-link">
                Start searching now
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="service" id="about">
        <div className="service-image">
          <img src="/About-image.png" alt="" className="serviceImage" />
        </div>
        <div className="service-information">
          <h2>
            What do <span>we</span> do?
          </h2>
          <p className="service-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            quibusdam impedit delectus ea. Alias, beatae perferendis repellat
            nesciunt laudantium illum, fugit suscipit odio odit esse hic, at
            quod magni vero error a! Sint harum provident id odio ullam ex dolor
            aliquam facilis, rem vitae, suscipit nobis repellendus dicta
            expedita labore.
          </p>
        </div>
      </div>
      <div className="features" id="feature">
        <h2 className="features-h2">
          <span>Features</span> <span className="blue-text"> Provided </span>
        </h2>
        <div className="features-wrapper">
          <div className="features-box">
            <img src="/settings.png" alt="" className="feature-image" />
            <h3 className="features-name">lorem</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              tempore dolor, recusandae velit enim aut?
            </p>
          </div>
          <div className="features-box">
            <img src="/settings.png" alt="" className="feature-image" />
            <h3 className="features-name">lorem</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              tempore dolor, recusandae velit enim aut?
            </p>
          </div>
          <div className="features-box">
            <img src="/settings.png" alt="" className="feature-image" />
            <h3 className="features-name">lorem</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              tempore dolor, recusandae velit enim aut?
            </p>
          </div>
        </div>
      </div>
      <div className="before-footer">
        <h2>
          Start joining <span>others</span> today
        </h2>
        <div className="welcome-buttons">
          <Button variant="link-btn search-button" size="lg">
            <Link to="/OrganizationsList" className="custom-link">
              Start searching now
            </Link>
          </Button>
        </div>
      </div>
      <footer className="creators">
        <div className="creators-information">
          <p>More about us:</p>
          <div className="creators-container">
            <a
              href="https://github.com/edisonzapata20"
              className="creators-name"
            >
              Edison
            </a>
            <a
              href="https://github.com/SamuelDiazBidot"
              className="creators-name"
            >
              Samuel
            </a>
            <a href="https://github.com/kathianadiaz" className="creators-name">
              Kathiana
            </a>
          </div>
        </div>

        <div className="creators-notes">
          <p>Copyright © 2021</p>
          <img src="/TempLogo.png" className="navigation-logo" alt="" />
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
