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
import {
  BrowserRouter,
  Route,
  Switch,
  useLocation,
  Redirect,
} from "react-router-dom";
import UserProfile from "./Components/UserProfile";
import { useState } from "react";
import { AuthProvider } from "./Components/AuthContext";
import OrganizationLists from "./Components/OrganizationsList";
import NotFound from "./Components/NotFound";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const [userdata, setuserdata] = useState("");
  const [navbarhidden, setnavbarhidden] = useState(false);

  const queryClient = new QueryClient();

  // console.log(navbarhidden);
  const dasd = () => {
    console.log(navbarhidden);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/SignIn">
              <SignIn userData={setuserdata} navbartoggle={setnavbarhidden} />
            </Route>
            <Route path="/UserProfile">
              <UserPage
                name="test"
                email="joshwalker44@gmail.com"
                phone="787-450-4934"
              />
            </Route>
            <Route path="/OrganizationCreation">
              <OrgCreation />
            </Route>
            <Route path="/organization-profile">
              <OrganizationProfile
                status="Recruiting"
                description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste laborum, delectus soluta, dolor adipisci modi eius maxime totam nisi facere sit, esse natus vel necessitatibus?"
              />
            </Route>
            <Route path="/OrganizationsList">
              <OrganizationLists />
            </Route>
            <Route path="*">
              <NotFound message="404 Not Found" />
            </Route>
          </Switch>
        </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
