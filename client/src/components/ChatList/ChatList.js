import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './ChatList.css';
import Chat from '../Chat/Chat';
import { getChatRooms } from '../../actions';

const ChatList = ({ user, rooms, chats, getChatRooms }) => {

    useEffect(() => {
        try {
            getChatRooms(user.user.email);
        } catch(err) {
            alert(err.message);
        }
    }, [user, getChatRooms]);

    const renderChats = rooms.chatRooms.length > 0 ? rooms.chatRooms.map((room, idx) => {
        return <Chat key={idx} selected={ !chats.chatDetails ? false :chats.chatDetails.chatName === room.room_name} chatName={room.room_name} chatTime={room.max ? room.max : undefined}/>
    }) : [];

    return (
        <div className="chat-list">
            {renderChats}
        </div>
    )
}

const mapStateToProps = state => {
    return { 
        user: state.authUser,
        rooms: state.rooms,
        chats: state.chats
    };
};

export default connect(
    mapStateToProps,
    { getChatRooms }    
)(ChatList);
