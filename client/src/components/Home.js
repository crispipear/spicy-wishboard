import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Home extends Component {
    state = {}
    render() {
        return (
            <section>
                <h1>{this.props.siteTitle}</h1>
                <button onClick={() => this.props.history.push('/login')}>login</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);