import {UPDATE_USER} from '../actions/action_update_user'
import {UPDATE_USER_STATUS} from '../actions/action_update_user_status'

const initState = {
    username: '',
    email: '',
    uid: '',
    signedIn: false
}

export default function(state=initState, action){
    switch(action.type){
        case UPDATE_USER:
            return {...state, ...action.payload}
        case UPDATE_USER_STATUS:
            return {...state, signedIn: action.payload}
        default:
            return state
    }
}