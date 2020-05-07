import React from "react";
// import './styles/style.css';
import "./App.css";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

import Home from "./components/home";
import Play from "./components/quiz/Play";
import Result from './components/quiz/Result';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/play/Quiz" component={Play} />
          <Route exact path="/play/Result" component={Result} />
          <Redirect to="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
