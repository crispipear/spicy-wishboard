import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Friend extends Component {
    state = {
        id: ''
    }
    componentDidMount(){
        let friend = this.props.location.state.id
        this.setState({
            id: friend
        })
    }
    render() {
        return (
            <div>
                <p>Friend page: {this.state.id}</p>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}
const mapStateToProps = state => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Friend);