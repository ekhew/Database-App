import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./components/App";
import Create from "./components/Create";
import Update from "./components/Update";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/update" component={Update} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
