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
        {name: 'password', type: 'password'},
        {name: 'first name'},
        {name: 'last name'},
        {name: 'birthday', placeholder: 'MM/DD/YYYY', dateInput: true}
    ]
}

class Login extends Component {
    state = {
        modal: false,
        modalCode: '',
        username: '',
        password: '',
        email: '',
        'first name': '',
        'last name': '',
        birthday: '',
        mode: 'login',
        modalMessage: {msg: 'enter group invite code', err: false},
        formMessage: {msg: '   ', err: false},
        prevDateLength: 0
    }
    handleChange = (event, dateInput = false) => {
        const name = event.target.name;
        const value = event.target.value;
        if(dateInput){
            let strLength = value.length;
            let thisVal = value;
            if(value.length > this.state.prevDateLength && (strLength === 2 || strLength === 5)){
                thisVal += '/';
            }
            this.setState({
                [name]: thisVal,
                prevDateLength: strLength
            })
        }else{
            this.setState({
                [name]: value
            })
        }
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
                groupId: this.state.modalCode
            }
            const validation = this.validateData(data)
            if(validation.success){
                this.setState({
                    formMessage: {msg: 'creating your new account, please wait...', err: false}
                })
                post(API_URL(endPoint), data)
                .then(res => {
                    if(res.data.success){
                        this.reset()
                    }else{
                        this.setState({
                            formMessage: {msg: res.data.message, err: true}
                        })
                    }
                })
            }else{
                this.setState({
                    formMessage: {msg: validation.message, err: true}
                })
            }
        }else if (this.state.mode == 'login'){
            data = {
                email: this.state.email,
                password: this.state.password
            }
            if(Validator.validateEmail(data.email)){
                post(API_URL(endPoint), data)
                .then(res => {
                    if(res.data.success){
                        this.getUserData(res.data.user.user.uid)
                    }else{
                        this.setState({
                            formMessage: {msg: res.data.message, err: true}
                        })
                    }
                })
            }else{
                this.setState({
                    formMessage: {msg: 'Please enter a valid email.', err: true}
                })
            }
        }
    }

    getUserData = uid => {
        get(API_URL('/user/info/' + uid))
        .then(res => {
            if(res.data.success){
                this.props.updateUser({...res.data.user, uid})
                this.reset()
                this.props.updateUserStatus(true)
                this.props.history.push('/dashboard')
            }else{
                this.setState({
                    formMessage: {msg: res.data.message, err: true}
                })
            }
        })
    }

    validateGroupId = () => {
        if(this.state.modalCode.length < 1 || !this.state.modalCode){
            this.setState({modalMessage: {msg: 'you must enter a valid group Id!', err: true}})
        }else{
            this.setState({modalMessage: {msg: 'validating group id, please wait...', err: false}})
            post(API_URL('/wishboard/validate-groupId'), {reqId: this.state.modalCode})
            .then(res => {
                if(res.data.idFound){
                    this.setState({modal: false}) 
                    this.setState({mode: 'create', formMessage: {msg: '', err: false}})
                }else{
                    this.setState({modalMessage: {msg: res.data.message, err: true}})
                }
            })
        }   
    }

    validateData = data => {
        let success = true;
        let message = '';
        let fieldsLength = Object.keys(data).length
        let curIndex = 0
        while(curIndex !== fieldsLength){
            for (let field in data){
                if(Validator.isEmpty(data[field])){
                    success = false;
                    message = 'please fill out all fields';
                    return {success, message}
                }
                curIndex++
            }
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
            modalCode: '',
            username: '',
            password: '',
            email: '',
            'first name': '',
            'last name': '',
            birthday: '',
            mode: 'login',
            modalMessage: {msg: 'enter group invite code', err: false},
            formMessage: {msg: '   ', err: false},
            prevDateLength: 0
        })
    }

    componentDidMount(){
        post(API_URL('/user/status'))
        .then(res => {
          if(res.data){
            this.props.updateUserStatus(res.data.online)
            if(res.data.online){
              this.getUserData(res.data.uid)
              this.props.history.push('/dashboard')          
            }
          }
        }
      )
    }

    render() {
        return (
            <section className='home'>
                <HomeDecor/>
                {
                    this.state.modal &&
                    <div className='login-modal'>
                        <h2>Join with Group Id</h2>
                        <input name='modalCode' value={this.state.modalCode} onChange={this.handleChange}/>
                        <p className='login-modal-message'
                           style={{color: this.state.modalMessage.err ? '#bf2932' : '#504d4d'}}
                        >{this.state.modalMessage.msg}</p>
                        <div className='login-modal-buttons'>
                            <button onClick={() => this.setState({modal: false, modalCode: ''})}>cancel</button>
                            <button onClick={this.validateGroupId}>submit</button>
                        </div>
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
                                        onChange={evt => item.dateInput ? this.handleChange(evt, item.dateInput): this.handleChange(evt)}
                                    />
                                </div>
                                )
                            }
                            <p style={{color: this.state.formMessage.err ? '#bf2932' : '#504d4d'}}>{this.state.formMessage.msg}</p>
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