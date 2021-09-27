import { SET_LOADER } from '../actions/types';

const INITIAL_STATE = {
    pageLoader: false
};

const actionsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_LOADER:
            return { ...state, pageLoader: action.payload }
        default:
            return state;
    }
};

export default actionsReducer;