import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../actions/action_update_user';
import { updateUserStatus } from '../actions/action_update_user_status';
import { post, get, API_URL } from '../services/apiUtils';
import Validator from '../services/validator';

import LOGO from '../assets/logo.png';
import HomeDecor from './HomeDecor';

const forms = {
    login: [
        {name: 'email'},
        {name: 'password', type: 'password'}
    ],
    create: [
        {name: 'email'},
        {name: 'username'},
        {name: 'first name'},
        {name: 'last name'},
        {name: 'birthday', placeholder: 'MM/DD/YYYY'},
        {name: 'password', type: 'password'}
    ]
}

class Login extends Component {
    state = {
        modal: false,
        invCode: '',
        username: '',
        password: '',
        email: '',
        'first name': '',
        'last name': '',
        birthday: '',
        mode: 'login'
    }
    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    } 

    onSubmit = () => {
        let data = {}
        let endPoint = this.state.mode == 'create' ? '/user/create' : '/user/login'

        if (this.state.mode == 'create'){
            data = {
                username: this.state.username,
                password: this.state.password,
                birthday: this.state.birthday,
                firstName: this.state['first name'],
                lastName: this.state['last name'],
                email: this.state.email,
                groupId: this.state.invCode
            }
            const validation = this.validateData(data)
            if(validation.success){
                post(API_URL(endPoint), data)
                .then(res => {
                    if(res.data.success){
                        window.alert('account created!')
                        this.reset()
                    }else{
                        window.alert(res.data.message)
                    }
                })
            }else{
                window.alert(validation.message)
            }
        }else if (this.state.mode == 'login'){
            data = {
                email: this.state.email,
                password: this.state.password
            }
            post(API_URL(endPoint), data)
            .then(res => {
                if(res.data.success){
                    this.getUserData(res.data.user.user.uid)
                }else{
                    window.alert(res.data.message)
                }
            })
        }
    }

    getUserData = uid => {
        get(API_URL('/user/info/' + uid))
        .then(res => {
            if(res.data.success){
                this.props.updateUser({...res.data.user, uid})
                this.reset()
                window.alert('account signed in!')
                this.props.updateUserStatus(true)
                this.props.history.push('/dashboard')
            }else{
                window.alert(res.data.message)
            }
        })
    }

    validateGroupId = () => {
        if(this.state.invCode.length < 1 || !this.state.invCode){
            window.alert('You must enter a group id!')
        }else{
            post(API_URL('/wishboard/validate-groupId'), {reqId: this.state.invCode})
            .then(res => {
                if(res.data.idFound){
                    this.setState({mode: 'create'})
                }else{
                    window.alert(res.data.message)
                }
            })
        }   
        this.setState({modal: false}) 
    }

    validateData = data => {
        let success = true;
        let message = '';
        for (let field in data){
            if(Validator.isEmpty(data[field])){
                success = false;
                message = 'please fill out all fields';
                return {success, message}
            }
            break;
        }
        if(!Validator.validateEmail(data.email)){
            success = false
            message = 'please enter a valid email'
        }
        else if(!Validator.validateDate(data.birthday)){
            success = false
            message = 'please enter birthday format in MM/DD/YYYY'
        }
        return {success, message}
    }

    reset = () => {
        this.setState({
            modal: false,
            invCode: '',
            username: '',
            password: '',
            email: '',
            'first name': '',
            'last name': '',
            birthday: '',
            mode: 'login'
        })
    }

    render() {
        return (
            <section className='home'>
                <HomeDecor/>
                {
                    this.state.modal &&
                    <div className='login-modal'>
                        <p>enter group invite code</p>
                        <input name='invCode' value={this.state.invCode} onChange={this.handleChange}/>
                        <button style={{marginTop: 16}} onClick={this.validateGroupId}>submit</button>
                    </div>
                }
                <div className='home-title'>
                    <img src={LOGO} alt="logo"/>
                    <p>start your wishlist today uwu</p>
                </div>
                <div className='home-login'>
                    <div className='home-login-form'>
                        <div style={{marginRight: '5%'}}>
                            {
                                forms[this.state.mode].map((item, key) => 
                                <div className='input-group' key={key}>
                                    <label>{item.name} *</label>
                                    <input type={item.type || 'text'}
                                        name={item.name}
                                        value={this.state[item.name]} 
                                        placeholder={item.placeholder || ''}
                                        onChange={this.handleChange}/>
                                </div>
                                )
                            }
                        </div>
                        <div>
                            <button onClick={this.onSubmit}>{this.state.mode}</button>
                        </div>
                    </div>
                    {
                        this.state.mode == 'login' &&
                        <p className='create-account' onClick={() => this.setState({modal: true})}>
                            create account with group id
                        </p>
                    }
                </div>
            </section>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateUser,
        updateUserStatus
    }, dispatch)
}
const mapStateToProps = state => ({
    siteTitle: state.main.siteTitle,
    user: state.user
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);