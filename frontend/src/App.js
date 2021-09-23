import logo from "./logo.svg";
import "./App.css";
import Homepage from "./Components/Homepage";
import SignIn from "./Components/Sign-in";
import SignUp from "./Components/Sign-up";
import OrgCreation from "./Components/OrganizationCreation";

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
            <SignIn />
          </Route>
          <Route path="/SignUp">
            <OrgCreation />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
