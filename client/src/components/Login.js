import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Login extends Component {
    state = {}
    render() {
        return (
            <section>
                <p>Hello</p>
            </section>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}
const mapStateToProps = state => ({
    siteTitle: state.main.siteTitle
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);