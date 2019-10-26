import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router-dom'

class Menu extends Component {
    state = {}
    render() {
        return (
            <div>
              <Link to='/dashboard'>Dashboard</Link>
              <Link to='/wishlist'>Wishlist</Link>
              <Link to='/group'>Group</Link>
              <Link 
                    to={{ 
                    pathname: '/friend', 
                    state: {id: 'testingid123'} 
                }}>
                    Friend
             </Link>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}
const mapStateToProps = state => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Menu);