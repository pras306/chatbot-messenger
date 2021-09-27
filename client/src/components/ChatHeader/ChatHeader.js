import React, { useState } from 'react';
import { Avatar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import { AddCircle, Delete, ExitToApp } from '@material-ui/icons';
import { connect } from 'react-redux';
// import axios from 'axios';

import './ChatHeader.css';
import history from '../../history';
import { auth } from '../../api/firebase';
import { signOut, getChatDetails, getChatMessages, getChatRooms, setLoader } from '../../actions';
import { CHAT_ROOMS } from '../../api/requests';

const ChatHeader = ({ user, chats, signOut, getChatDetails, getChatMessages, getChatRooms, setLoader }) => {
    const[open, setOpen] = useState(false);
    const[roomName, setRoomName] = useState("");

    const onSignOut = () => {
        if(user){
            try {
                setLoader(true);
                signOut();
                auth.signOut();
                getChatDetails(null);
                getChatMessages('');
                getChatRooms('');
                history.push('/');
                setLoader(false);
            } catch(err) {
                alert(err.message);
                setLoader(false);
            }
        }
    };

    const addChatRoom = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createRoom = () => {
        setLoader(true);
        fetch(`${CHAT_ROOMS}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.user.email,
                roomName: roomName
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                alert(data.error.message);
                setLoader(false);
            } else {
                getChatRooms(user.user.email);
                handleClose();
                setLoader(false);
            }
        })
        .catch(err => {
            setLoader(false);
            alert("Unable to create a new room. Please try again later.")
        });
        setRoomName('');
    };

    const deleteChatRoom = () => {
        if(!chats.chatDetails) {
            alert("Please select a room that you want to delete.");
        } else {
            setLoader(true);
            fetch(`${CHAT_ROOMS}${chats.chatDetails.chatName}`,{
                method: "DELETE"
            })
            .then(response => response.json())
            .then(data => {
                if(data.error) {
                    setLoader(false);
                    alert(data.error.message);
                } else {
                    alert(data.data.message);
                    getChatRooms(user.user.email);
                    getChatDetails(null);
                    setLoader(false);
                }
            })
            .catch(err => {
                setLoader(false);
                alert("Unable to delete the room. Please try again later.")
            });
        }
    };

    return (
        <div>
            <div className="chat-header">
                <div className="chat-header__container">
                    <Avatar className="chat-header__avatar" alt="Avatar" src={user.user.avatar} />
                    <span>{user.user.name}</span>
                </div>
                <div className="chat-header__actions">
                    <IconButton className="chat-header__actions__button" onClick={addChatRoom}>
                        <AddCircle />
                    </IconButton>
                    <IconButton className="chat-header__actions__button" onClick={deleteChatRoom}>
                        <Delete />
                    </IconButton>
                    <IconButton className="chat-header__actions__button" onClick={onSignOut}>
                        <ExitToApp />
                    </IconButton>
                </div>
            </div>
            <React.Fragment>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Room</DialogTitle>
                    <DialogContent>
                        <TextField 
                            autoFocus 
                            margin="dense" 
                            id="roomName" 
                            label="Enter Room Name" 
                            type="text" 
                            fullWidth
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => createRoom()}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.authUser,
        chats: state.chats
    }
};

export default connect(
    mapStateToProps,
    { signOut, getChatDetails, getChatMessages, getChatRooms, setLoader }
)(ChatHeader);
