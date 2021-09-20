import React from 'react';

import './ChatRooms.css';
import ChatHeader from '../../components/ChatHeader/ChatHeader';
import ChatList from '../../components/ChatList/ChatList';
import MessageBox from '../../components/MessageBox/MessageBox';

const ChatRooms = () => {

    return (
        <div className="chat-rooms">
            <div className="chat-rooms__chats">
                <ChatHeader />
                <ChatList  />
            </div>
            <div className="chat-rooms__messages">
                <MessageBox />
            </div>
        </div>
    )
}

export default ChatRooms;
