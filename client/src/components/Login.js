import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { post, API_URL } from '../services/apiUtils';

class Login extends Component {
    state = {
        username: '',
        password: '',
        email: ''
    }
    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    } 

    onSubmit = () => {
        let data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        post(API_URL('/user/create'), data)
            .then(res => {
                if(res.status == 200){
                    window.alert('account created!')
                }
            })
            .catch(err => {

            })
    }

    render() {
        return (
            <section>
                <input type="text"
                    name="email"
                    placeholder="email"
                    value={this.state.email} 
                    onChange={this.handleChange}/>
                <input type="text"
                    name="username"
                    placeholder="username"
                    value={this.state.username} 
                    onChange={this.handleChange}/>
                <input type="password"
                    name="password" 
                    placeholder="password"
                    value={this.state.password} 
                    onChange={this.handleChange}/>
                <button onClick={this.onSubmit}>create</button>
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