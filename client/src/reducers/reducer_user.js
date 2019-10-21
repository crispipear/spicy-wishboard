import {UPDATE_USER} from '../actions/action_update_user'

const initState = {
    username: '',
    email: '',
    uid: ''
}

export default function(state=initState, action){
    switch(action.type){
        case UPDATE_USER:
            return {...state, ...action.payload}
        default:
            return state
    }
}