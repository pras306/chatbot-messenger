import React from 'react';
import { connect } from 'react-redux';

import './Chat.css';
import { getChatDetails, getChatMessages, setLoader } from '../../actions';

const Chat = (props) => {
    const { selected, chatName, chatTime, getChatDetails, getChatMessages, setLoader } = props;

    const onChatClick = () => {
        try {
            setLoader(true);
            getChatDetails({ chatName: chatName, chatTime: chatTime});
            getChatMessages(chatName);
            setLoader(false);
        } catch(err) {
            alert(err.message);
            setLoader(false);
        }
    }

    return (
        <div className={`chat ${selected ? "chat-list__selected" : ""}`} onClick={() => onChatClick()}>
            <span className="chat__title">{chatName}</span>
            <span className="chat__time">{chatTime ? new Date(chatTime).toDateString() : "No Messages Sent"}</span>
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
    { getChatDetails, getChatMessages, setLoader }
)(Chat);
