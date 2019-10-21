import {combineReducers} from 'redux';
import main         from './reducer_main';
import user         from './reducer_user';

export default combineReducers({
    main,
    user
})