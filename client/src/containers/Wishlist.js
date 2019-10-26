import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Wishlist extends Component {
    state = {}
    render() {
        return (
            <div>
                <p>wishlist page</p>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}
const mapStateToProps = state => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);