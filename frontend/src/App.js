import logo from "./logo.svg";
import "./App.css";
import Homepage from "./Components/Homepage";
import SignIn from "./Components/Sign-in";
import SignUp from "./Components/Sign-up";
import OrgCreation from "./Components/OrganizationCreation";
import UserPage from "./Components/UserProfile";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/SignIn">
            <SignUp />
          </Route>
          <Route path="/SignUp">
            <UserPage
              name="Josh Walker Hernandez"
              email="joshwalker44@gmail.com"
              phone="787-450-4934"
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
