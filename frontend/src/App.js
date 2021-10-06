import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Homepage from "./Components/Homepage";
import SignIn from "./Components/Sign-in";
import SignUp from "./Components/Sign-up";
import OrgCreation from "./Components/OrganizationCreation";
import UserPage from "./Components/UserProfile";
import OrganizationProfile from "./Components/OrganizationProfile";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import UserProfile from "./Components/UserProfile";
import { useState } from "react";
import { Nav } from "react-bootstrap";

function App() {
  const [userdata, setuserdata] = useState("");
  const [navbarhidden, setnavbarhidden] = useState(false);

  // console.log(navbarhidden);
  const dasd = () => {
    console.log(navbarhidden);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* <Route path="/SignUp">
     

            <SignUp />
          </Route> */}
          <Route path="/SignIn">
            {/* <UserPage
              name="Josh Walker Hernandez"
              email="joshwalker44@gmail.com"
              phone="787-450-4934"
            /> */}

            <SignIn userData={setuserdata} navbartoggle={setnavbarhidden} />
          </Route>
          <>
            <Navbar
              navbartoggle={navbarhidden}
              navbarchange={setnavbarhidden}
            />
            <Route exact path="/">
              {console.log(navbarhidden)}
              <Homepage />
            </Route>
            <Route path="/SignUp">
              <UserPage
                name="Josh Walker"
                email="joshwalker44@gmail.com"
                phone="7874504934"
              />
              {/* <OrganizationProfile
                status="Recruiting"
                description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste laborum, delectus soluta, dolor adipisci modi eius maxime totam nisi facere sit, esse natus vel necessitatibus?"
              /> */}
            </Route>
          </>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
