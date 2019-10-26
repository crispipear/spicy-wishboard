import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Menu             from './components/Menu';
import Login            from './containers/Login';
import Dashboard        from './containers/Dashboard';
import Wishlist         from './containers/Wishlist';
import Group            from './containers/Group';
import Friend           from './containers/Friend';

import './styles/app.scss';

const routes = [
  {
    path: "/",
    main: Login,
    protected: false
  },
  {
    path: "/dashboard",
    main: Dashboard,
    protected: true
  },
  {
    path: "/wishlist",
    main: Wishlist,
    protected: true
  },
  {
    path: "/group",
    main: Group,
    protected: true
  },
  {
    path: "/friend",
    main: Friend,
    protected: true
  }
]

const ProtectedRoute = ({allowed, ...props}) => allowed ? <Route {...props}/> :  <Redirect to="/"/>;

class App extends Component{
  render(){
    return (
      <Router>
          {
            this.props.signedIn && <Menu/>
          }
          <Switch>
              {routes.map((route, index) => (
                route.protected ?
                <ProtectedRoute
                  allowed={this.props.signedIn}
                  exact
                  key={index}
                  path={route.path}
                  component={route.main}
                />
                :
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
  siteTitle: state.main.siteTitle,
  signedIn: state.user.signedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
