import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Dashboard extends Component {
    state = {}
    render() {
        return (
            <section>

            </section>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}
const mapStateToProps = state => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);