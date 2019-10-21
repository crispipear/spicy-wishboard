import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../actions/action_update_user';

import { post, API_URL } from '../services/apiUtils';


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
                    if(res.status == 200 && this.state.mode == 'create'){
                        window.alert('account created!')
                        this.reset()
                    }
                })
                .catch(err => {
                    console.log(err)
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
                if(res.status == 200){
                    window.alert('account signed in!')
                    this.reset()
                }else{
                    window.alert('cannot log in')
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    validateGroupId = () => {
        post(API_URL('/wishboard/validate-groupId'), {reqId: this.state.invCode})
            .then(res => {
                if(res.data.idFound){
                    this.setState({mode: 'create'})
                }else{
                    window.alert(res.data.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
        this.setState({modal: false})        
    }

    validateData = data => {
        let success = true;
        let message = '';
        for (let field in data){
            if(data[field] == "" || data[field] == null || !data[field]){
                success = false;
                message = 'please fill out all fields';
                return {success, message}
            }
            break;
        }
        if(!this.validateEmail(data.email)){
            success = false
            message = 'please enter a valid email'
        }
        else if(!this.validateDate(data.birthday)){
            success = false
            message = 'please enter birthday format in MM/DD/YYYY'
        }

        return {success, message}
    }

    validateEmail = email => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    validateDate = dateString => {
        if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

        // Parse the date parts to integers
        var parts = dateString.split("/");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if(year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        // Adjust for leap years
        if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
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
            <section className='login'>
                {
                    this.state.modal &&
                    <div className='login-modal'>
                        <p>enter group invite code</p>
                        <input name='invCode' value={this.state.invCode} onChange={this.handleChange}/>
                        <button style={{marginTop: 16}} onClick={this.validateGroupId}>submit</button>
                    </div>
                }
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
                <button onClick={this.onSubmit}>{this.state.mode}</button>
                {
                    this.state.mode == 'login' &&
                    <p className='create-account' onClick={() => this.setState({modal: true})}>
                        create account with group id
                    </p>
                }
            </section>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateUser
    }, dispatch)
}
const mapStateToProps = state => ({
    siteTitle: state.main.siteTitle
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);