import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from "./authReducer";
import roomsReducer from './roomsReducer';
import chatReducer from './chatReducer';
import actionsReducer from './actionsReducer';

export default combineReducers({
    authUser: authReducer,
    form: formReducer,
    chats: chatReducer,
    rooms: roomsReducer,
    actions: actionsReducer
});