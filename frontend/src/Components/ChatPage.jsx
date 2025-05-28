/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
import { Container, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { setMessages } from '../slices/messagesSlice.js';
import { setActiveChannel } from '../slices/channelsSlice.js';
import { getChannelsQuery, getMessagesQuery } from '../services/chatApi';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { data: channels = [] } = getChannelsQuery();
  const activeChannelId = useSelector((state) => state.channelsReducer.activeChannelId);
  const {
    data: messages,
    isError: isErrorMessages,
    isLoading: isLoadingMessages,
  } = getMessagesQuery();

  useEffect(() => {
    if (messages) {
      dispatch(setMessages(messages));
    }
  }, [messages, dispatch]);

  useEffect(() => {
    const activeChannel = channels.find((c) => c.id === activeChannelId);
    if (!activeChannel && channels.length > 0) {
      dispatch(setActiveChannel(channels[0].id));
    }
  }, [channels, activeChannelId, dispatch]);

  if (isLoadingMessages) {
    return <div className="text-center mt-5">Загрузка...</div>;
  }

  if (isErrorMessages) {
    return <div className="text-center mt-5 text-danger">Ошибка загрузки данных</div>;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default ChatPage;
