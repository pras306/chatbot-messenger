import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { Send, MoreHoriz } from '@material-ui/icons';
import axios from 'axios';

import './MessageBox.css';
import { getChatMessages, getChatRooms, getChatDetails } from '../../actions';
import { CHATBOT_API, CHAT_MESSAGES } from '../../api/requests';

const MessageBox = ({ user, chats, getChatMessages, getChatDetails, getChatRooms }) => {
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const messageEndRef = useRef(null);
    const messageLoadRef = useRef();

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom();
        if(loader && messageLoadRef.current) {
            messageLoadRef.current.style.visibility = "visible";
        } else if(messageLoadRef.current) {
            messageLoadRef.current.style.visibility = "hidden";
        }
    }, [chats.chatMessages, loader, messageLoadRef]);

    const renderTitle = () => {
        if(chats.chatDetails){
            return(
                <div className="message-box__header">
                    <div className="message-box__header__title">{chats.chatDetails.chatName}</div>
                    <div className="message-box__header__time">{chats.chatDetails.chatTime ? `Last Active Chat on ${new Date(chats.chatDetails.chatTime).toDateString()} ${new Date(chats.chatDetails.chatTime).toLocaleTimeString()}` : "No Messages to show"}</div>
                </div>
            )
        } else {
            return(
                <div className="message-box__header">
                    <div className="message-box__header__title">No Chat Selected</div>
                    <div className="message-box__header__time">No Messages to show</div>
                </div>
            );
        }
    };

    const renderMessages = () => {
        if(chats.chatMessages.length > 0) {
            return (
                <div className="message-box__content">
                    {chats.chatMessages.map((chat,idx) => {
                        return (
                            <div key={idx} className={`message-box__content__message__container ${user.user.name === chat.name ? "message-box__content__left" : "message-box__content__right"}`}>
                                <span className="message-box__content__message__sender">{chat.name}</span>
                                <span className="message-box__content__message">{`${chat.message}`}</span>
                                <span className="message-box__content__message-time">{new Date(chat.message_time).toLocaleTimeString()}</span>
                            </div>
                        );
                    })}
                    <div className="message-box__content__loader" ref={messageLoadRef}><MoreHoriz /></div>
                    <div ref={messageEndRef}></div>
                </div>
            );
        } else {
            return(
                <div className="message-box__content"></div>
            );
        }
    };

    const sendMessage = async () => {
        if(!chats.chatDetails) {
            alert("Please select a room to send messages");
            setMessage("");
            return;
        }
        const sentMssg = message;

        const data = {
            email: user.user.email,
            roomName: chats.chatDetails.chatName,
            message: sentMssg
        };

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post(`${CHAT_MESSAGES}`, data, config);
        getChatMessages(response.data.roomName);
        setMessage("");
        getChatRooms(user.user.email);
        getChatDetails({ chatName: chats.chatDetails.chatName, chatTime: response.data.message_time });

        setLoader(true);
        const botQuery = await axios.post(`${CHATBOT_API}`,JSON.stringify({
            query: sentMssg
        }));

        const botResponse = await axios.post(`${CHAT_MESSAGES}`, JSON.stringify({
            email: "chat@bot.com",
            roomName: chats.chatDetails.chatName,
            message: botQuery.data.response
        }), {
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        getChatMessages(botResponse.data.roomName);
        getChatRooms(user.user.email);
        getChatDetails({ chatName: chats.chatDetails.chatName, chatTime: botResponse.data.message_time });
        setLoader(false);
    };

    return (
        <div className="message-box">
            {renderTitle()}
            {renderMessages()}
            <div className="message-box__footer">
                <input className="message-box__footer__input" type="text" placeholder="Type your message here..." value={message} onChange={(e) => setMessage(e.target.value)} />
                <IconButton className="message-box__footer__button" onClick={sendMessage}>
                    <Send />
                </IconButton>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return { 
        user: state.authUser, 
        chats: state.chats 
    }
};

export default connect(
    mapStateToProps,
    { getChatMessages, getChatDetails, getChatRooms }
)(MessageBox);
