import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Signup from "./signup/signup";
import Login from "./login/login";
import Boards from "./boards/boards";
import Processes from "./processes/processes";
import * as dragndrop from "../dragDropPolifill";

const App = () => (
  <BrowserRouter>
    <>
      <Switch>
        <Route path="/boards/:boardId" component={Processes} />
        <Route path="/boards" component={Boards} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={() => <Redirect to="/boards" />} />
      </Switch>
      <script src={dragndrop} />
    </>
  </BrowserRouter>
);

export default App;
