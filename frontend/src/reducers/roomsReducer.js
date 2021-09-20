import { GET_CHAT_ROOMS } from '../actions/types';

const INITIAL_STATE = {
    chatRooms: []
};

const roomsReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_CHAT_ROOMS:
            return { ...state, chatRooms: action.payload }
        default:
            return state
    }
};

export default roomsReducer;