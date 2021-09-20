import axios from 'axios';

import * as actionTypes from './types';
import { CHAT_ROOMS, CHAT_MESSAGES } from '../api/requests';

export const signIn = (user) => {
    return {
        type: actionTypes.SIGN_IN,
        payload: user
    }
};

export const signOut = () => {
    return {
        type: actionTypes.SIGN_OUT
    }
};

export const getChatDetails = (chat) => {
    return {
        type: actionTypes.GET_CHAT_DETAILS,
        payload: chat
    }
};

export const getChatRooms = (email) => {
    return async (dispatch) => {
        const response = await axios.get(`${CHAT_ROOMS}${email}`);

        dispatch({ type: actionTypes.GET_CHAT_ROOMS, payload: response.data });
    }
};

export const getChatMessages = (roomName) => {
    return async (dispatch) => {
        const response = await axios.get(`${CHAT_MESSAGES}${roomName}`);
        
        dispatch({ type: actionTypes.GET_CHAT_MESSAGES, payload: response.data });
    }
};