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

    componentDidMount(){
        console.log(this.props.user)
    }

    render() {
        return (
            <section className="dashboard">
                <p>Welcome! {this.props.user.firstName}</p>
                <p>Birthday: {this.props.user.birthday}</p>
                <button onClick={this.signOut}>sign out</button>
            </section>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}
const mapStateToProps = state => ({
    user: state.user,
    signedIn: state.user.signedIn
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);