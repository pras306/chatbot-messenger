import React from 'react';
import { connect } from 'react-redux';

import './Chat.css';
import { getChatDetails, getChatMessages } from '../../actions';

const Chat = (props) => {
    const { selected, chatName, chatTime, getChatDetails, getChatMessages } = props;

    const onChatClick = () => {
        getChatDetails({ chatName: chatName, chatTime: chatTime});
        getChatMessages(chatName);
    }

    return (
        <div className={`chat ${selected ? "chat-list__selected" : ""}`} onClick={() => onChatClick()}>
            <span className="chat__title">{chatName}</span>
            <span className="chat__time">{new Date(chatTime).toDateString()}</span>
        </div>
    );
}

Chat.defaultProps = {
    selected: false,
    chatName: "No Name provided",
    chatTime: ""
};

export default connect(
    null,
    { getChatDetails, getChatMessages }
)(Chat);
