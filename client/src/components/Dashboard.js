import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { post, API_URL } from '../services/apiUtils';

class Dashboard extends Component {
    state = {}
    
    signOut = () => {
        post(API_URL('/user/signout'))
        this.props.history.push('/')
    }

    render() {
        return (
            <section className="dashboard">
                <p>Welcome! {this.props.user.username}</p>
                <button onClick={this.signOut}>sign out</button>
                <p>online: {this.props.online ? 'true' : 'false'}</p>
            </section>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}
const mapStateToProps = state => ({
    user: state.user,
    online: state.user.online
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);