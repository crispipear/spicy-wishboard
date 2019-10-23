import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { API_URL, post} from './services/apiUtils';
import { updateUserStatus } from './actions/action_update_user_status';

import Login            from './components/Login';
import Dashboard        from './components/Dashboard';
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
  }
]

const ProtectedRoute = ({allowed, ...props}) => allowed ? <Route {...props}/> :  <Redirect to="/"/>;

class App extends Component{
  componentDidMount(){
    post(API_URL('/user/status'))
      .then(res => {
        if(res.data){
          this.props.updateUserStatus(res.data.online)
          if(res.data.online){
            this.props.history.push('/dashboard')          
          }
        }
      }
    )
  }

  render(){
    return (
      <Router>
          <Switch>
              {routes.map((route, index) => (
                route.protected ?
                <ProtectedRoute
                  allowed={this.props.online}
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
    updateUserStatus
  }, dispatch)
}
const mapStateToProps = state => ({
  siteTitle: state.main.siteTitle,
  online: state.user.online
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
