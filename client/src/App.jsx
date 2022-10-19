import "./app.scss";
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";

const App = () => {
  // return <Home/>;
  // return (
  //   <Router>
  //     <Switch>
  //       <Route exact path="/" />
  //         <Home/>
  //       <Route />
  //       <Route path="/movies" />
  //         <Home type="movies"/>
  //       <Route />
  //       <Route path="/series" />
  //        <Home type="series" />
  //       <Route />
  //       <Route path="/watch" />
  //         <Watch />
  //       <Route />
  //     </Switch>
  //   </Router>
  // );
  // return <Home />;
  // return <Login />;
  return <Register/>;
};

export default App;