/* eslint-disable functional/no-expression-statement */
import React from 'react';
import cn from 'classnames';
import { getChannelsQuery } from '../services/chatApi';

const Channels = ({ activeChannelId, setActiveChannelId }) => {
  const { data: channels = [] } = getChannelsQuery();

  const handleClick = (channelId) => {
    setActiveChannelId(channelId);
  };

  return (
    <ul id="channels-id" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => {
        const channelClasses = cn('w-100 rounded-0 text-start btn', {
          'btn-secondary': channel.id === activeChannelId,
        });

        return (
          <li key={channel.id} className="nav-item w-100">
            <button
              id={channel.id}
              type="button"
              className={channelClasses}
              onClick={() => handleClick(channel.id)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Channels;
