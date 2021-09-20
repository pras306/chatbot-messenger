import { GET_CHAT_DETAILS, GET_CHAT_MESSAGES } from '../actions/types';

const INITIAL_STATE = {
    chatDetails: null,
    chatMessages: []
};

const chatReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_CHAT_DETAILS:
            return { ...state, chatDetails: action.payload };
        case GET_CHAT_MESSAGES:
            return { ...state, chatMessages: action.payload }
        default:
            return state;
    }
};

export default chatReducer;