/* eslint-disable functional/no-conditional-statement */
import React, { useState } from 'react';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import MessageForm from './MessageForm.jsx';
import { getChannelsQuery, getMessagesQuery } from '../services/chatApi';

const ChatPage = () => {
  const {
    data: channels,
    isError: isErrorChannels,
    isLoading: isLoadingChannels,
  } = getChannelsQuery();
  const {
    data: messages,
    isError: isErrorMessages,
    isLoading: isLoadingMessages,
  } = getMessagesQuery();

  const [activeChannelId, setActiveChannelId] = useState(null);

  if (isLoadingChannels || isLoadingMessages) {
    return <div className="text-center mt-5">Загрузка...</div>;
  }

  if (isErrorChannels || isErrorMessages) {
    return <div className="text-center mt-5 text-danger">Ошибка загрузки данных</div>;
  }

  const activeChannel = channels.find((channel) => channel.id === activeChannelId);
  const filteredMessages = messages.filter((message) => message.channelId === activeChannelId);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button
              type="button"
              className="p-0 text-primary btn btn-group-vertical"
              aria-label="Добавить канал"
            >
              <i className="bi bi-plus-square" />
            </button>
          </div>
          <Channels activeChannelId={activeChannelId} setActiveChannelId={setActiveChannelId} />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>{activeChannel?.name || '...'}</b>
                <span className="text-muted">
                  {filteredMessages.length}
                  сообщений
                </span>
              </p>
            </div>
            <Messages activeChannelId={activeChannelId} />
            <MessageForm
              activeChannelId={activeChannelId}
              onSend={(newMessage) => {
                // send message RTK Query
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
