/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  styled, createTheme, ThemeProvider, useTheme, alpha,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { io } from 'socket.io-client';
import { useContext, useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import AppContext from '../../../context/AppContext';
import './Messages.css';

export default function SeekerSideMessage() {
  // const sokect = io('http://localhost:8800');
  const { socket } = useContext(AppContext);
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [messageList, setMessageList] = useState([]);

  const joinRoom = () => {
    if (userName !== '' && room !== '') {
      console.log(room);
      console.log(userName);
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };
  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room,
        author: userName,
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
      };
      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Chart */}

        <Grid item xs={12} md={8} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {!showChat
              ? (
                <div className="App">
                  <div className="joinChatContainer">
                    <h3>Join A chat</h3>
                    <input type="text" placeholder="Jhone" onChange={(e) => setUserName(e.target.value)} />
                    <input type="text" placeholder="Rooom Id" onChange={(e) => setRoom(e.target.value)} />
                    <Button onClick={joinRoom}>Join a Room</Button>
                  </div>
                </div>
              )
              : (
                <div className="chat-window">
                  <div className="chat-header">
                    <p>Live Chat</p>
                  </div>
                  <div className="chat-body">
                    <ScrollToBottom className="message-container">
                      {messageList.map((el) => (
                        <div className="message" id={userName === el.author ? 'you' : 'other'}>
                          <div>
                            <div className="message-content">
                              <p>{el.message}</p>
                            </div>
                            <div className="message-meta">
                              <p id="time">{el.time}</p>
                              <p id="author">{el.author}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollToBottom>
                  </div>
                  <div className="chat-footer">
                    <input
                      value={currentMessage}
                      type="text"
                      placeholder="hey.."
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => {
                        e.key === 'Enter' && sendMessage();
                      }}
                    />
                    <Button onClick={sendMessage}>S</Button>
                  </div>

                </div>
              )}

          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={0}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          />
        </Grid>
        {/* Recent Deposits */}
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} />
        </Grid>
      </Grid>
    </Box>
  );
}
