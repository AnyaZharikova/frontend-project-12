/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-expression-statement */
import React from 'react';
import { useSelector } from 'react-redux';

const Messages = ({ activeChannelId }) => {
  const messages = useSelector((state) => state.messages.messages);
  const filteredMessages = messages.filter((message) => message.channelId === activeChannelId);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {filteredMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          {`: ${message.body}`}
        </div>
      ))}
    </div>
  );
};

export default Messages;
