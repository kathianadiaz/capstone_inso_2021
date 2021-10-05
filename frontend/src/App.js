import logo from "./logo.svg";
import "./App.css";
import Homepage from "./Components/Homepage";
import SignIn from "./Components/Sign-in";
import SignUp from "./Components/Sign-up";
import OrgCreation from "./Components/OrganizationCreation";
import UserPage from "./Components/UserProfile";
import OrganizationProfile from "./Components/OrganizationProfile";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserProfile from "./Components/UserProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/SignIn">
            <UserPage
              name="Josh Walker Hernandez"
              email="joshwalker44@gmail.com"
              phone="787-450-4934"
            />
          </Route>
          <Route path="/SignUp">
            {/* <UserPage
              name="Josh Walker Hernandez"
              email="joshwalker44@gmail.com"
              phone="787-450-4934"
            /> */}
            <OrganizationProfile
              status="Recruiting"
              description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste laborum, delectus soluta, dolor adipisci modi eius maxime totam nisi facere sit, esse natus vel necessitatibus?"
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
