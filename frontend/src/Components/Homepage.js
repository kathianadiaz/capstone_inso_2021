import React from "react";
import "./Homepage.scss";
import { Link } from "react-router-dom";
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
            What do <span className="green-text ">we</span> do?
          </h2>
          <p className="service-text">
            Our goal is to give students a way to join student organizations or
            any other kind of professional organization in a simple but
            straightforward way. This means getting rid of the need of visiting
            multiple sites to get organization information and instead doing it
            all in one single space. These organizations will help students
            explore different interests in their field of study and inspire them
            to pursue those interests in their future careers.
          </p>
        </div>
      </div>
      <div className="features" id="feature">
        <h2 className="features-h2">
          <span span className="green-text ">
            Features
          </span>{" "}
          <span className="blue-text"> Provided </span>
        </h2>
        <div className="features-wrapper">
          <div className="features-box">
            <img src="/settings.png" alt="" className="feature-image" />
            <h3 className="features-name">Filter search</h3>
            <p>
              Our web-application has the feature of being able to search for
              the organizations that you are interested in, by giving you the
              option of searching for what you are interested in.
            </p>
          </div>
          <div className="features-box">
            <img src="/settings.png" alt="" className="feature-image" />
            <h3 className="features-name">No account needed</h3>
            <p>
              Want to search organizations without the need of a account? With
              this web-application you can do exactly that. Aditionally,
              organization leaders have the option of adding members to their
              organization.
            </p>
          </div>
          <div className="features-box">
            <img src="/settings.png" alt="" className="feature-image" />
            <h3 className="features-name">Join requests</h3>
            <p>
              Our web-application also features join requests that users that
              have created an account can utilize to join the organizations they
              are interested in.
            </p>
          </div>
        </div>
      </div>
      <div className="before-footer">
        <h2>
          Start joining <span className="green-text ">others</span> today
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
          <img src="/TempLogo.png" className="navigation-logo-footer" alt="" />
        </div>
      </footer>
      <div className="credits-section">
        <p className="attribution">
          Icons and images used in this web-app credits to:
        </p>
        <p className="attribution">
          Illustrations used in this web-app are by{" "}
          <a href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6">
            Icons 8
          </a>{" "}
          from <a href="https://icons8.com/illustrations">Ouch!</a>
        </p>
        <p className="attribution">
          Icons used in this web-app are made by{" "}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default Homepage;
