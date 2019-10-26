import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Friends extends Component {
    state = {}
    render() {
        return (
            <div>
                <p>Group Home Page
                </p>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}
const mapStateToProps = state => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Friends);