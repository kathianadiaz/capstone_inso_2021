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
import { BrowserRouter, Route, Switch, useLocation, Redirect } from "react-router-dom";
import UserProfile from "./Components/UserProfile";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import {AuthProvider} from "./Components/AuthContext";
import NotFound from "./Components/NotFound";

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
      <AuthProvider>
          <Navbar navbartoggle={navbarhidden} navbarchange={setnavbarhidden}/>
          <Switch>
            {/* <Route path="/SignUp">
      

              <SignUp />
            </Route> */}
            
              <Route exact path="/">
                {console.log(navbarhidden)}
                <Homepage />
              </Route>
              <Route path="/SignIn">
                <SignIn userData={setuserdata} navbartoggle={setnavbarhidden} />
              </Route>
              <Route path="/SignUp">
                <OrganizationProfile
                  status="Recruiting"
                  description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste laborum, delectus soluta, dolor adipisci modi eius maxime totam nisi facere sit, esse natus vel necessitatibus?"
                />
              </Route>
            <Route path="*">
                <NotFound message="404 Not Found"/>
            </Route>
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
