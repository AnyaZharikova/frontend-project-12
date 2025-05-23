import React from 'react';
import { getMessagesQuery } from '../services/chatApi';

const Messages = ({ activeChannelId }) => {
  const { data: messages = [] } = getMessagesQuery();
  const filteredMessages = messages.filter((message) => message.channelId === activeChannelId);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {filteredMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          `: `
          {message.body}
        </div>
      ))}
    </div>
  );
};

export default Messages;
