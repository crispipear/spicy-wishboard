import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Welcome from './components/Welcome';
import Login from './components/Login';

import './styles/app.scss';

const routes = [
  {
    path: "/",
    main: Welcome
  },
  {
    path: "/login",
    main: Login
  }
]

class App extends Component{
  render(){
    return (
      <Router>
          <Switch>
              {routes.map((route, index) => (
                <Route
                  exact
                  key={index}
                  path={route.path}
                  component={route.main}
                />
              ))}
          </Switch>
      </Router>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}
const mapStateToProps = state => ({
  siteTitle: state.main.siteTitle
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
