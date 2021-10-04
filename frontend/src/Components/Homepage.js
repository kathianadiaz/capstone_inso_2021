import React from "react";
import "./Homepage.scss";
import NavigationBar from "./Navbar";
import { Button } from "react-bootstrap";
function Homepage() {
  return (
    <div className="homepage-container">
      <NavigationBar />
      <div className="welcome" id="about">
        <div className="welcome-image">
          <img src="/WelcomeImage.png" alt="" className="girl-studying" />
        </div>

        <div className="welcome-container">
          <h1 className="welcome-title">
            Welcome to the place to join{" "}
            <span className="green-text">student organizations</span>
          </h1>
          <div className="welcome-buttons">
            {/* <a href="" className="link-btn search-button">
              Start searching now
            </a> */}
            {/* <a href="" className="link-btn learn-button">
              Learn more
            </a> */}
            <Button variant="btn learn-button" size="lg">
              Learn more
            </Button>
            <Button variant="link-btn search-button" size="lg">
              Start searching now
            </Button>
          </div>
        </div>
      </div>
      <div className="service">
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
        <h2>Features Provided</h2>
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
            Start searching now
          </Button>
          <Button variant="link-btn learn-button" size="lg">
            Learn more
          </Button>

          {/* <a href="" className="link-btn search-button">
            Start searching now
          </a>
          <a href="" className="link-btn learn-button">
            Learn more
          </a> */}
        </div>
      </div>
      <footer className="creators">
        <div className="creators-information">
          <p>More about us:</p>
          <div className="creators-container">
            <a href="" className="creators-name">
              Edison
            </a>
            <a href="" className="creators-name">
              Samuel
            </a>
            <a href="" className="creators-name">
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