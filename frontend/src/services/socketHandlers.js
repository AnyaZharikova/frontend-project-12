/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-expression-statement */
import { chatApi } from './chatApi.js';

const setupSocketHandlers = (socket, store) => {
  socket.on('newMessage', (message) => {
    store.dispatch(
      chatApi.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(message);
      }),
    );
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(
      chatApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(channel);
      }),
    );
  });

  socket.on('renameChannel', (updatedChannel) => {
    store.dispatch(
      chatApi.util.updateQueryData('editChannel', undefined, (draft) => {
        const index = draft.findIndex((ch) => ch.id === updatedChannel.id);
        if (index !== -1) {
          draft[index].name = updatedChannel.name;
        }
      }),
    );
  });

  socket.on('removeChannel', (channelId) => {
    store.dispatch(
      chatApi.util.updateQueryData('getChannels', undefined, (draft) => draft.filter((ch) => ch.id !== channelId)),
    );
  });
};

export default setupSocketHandlers;
