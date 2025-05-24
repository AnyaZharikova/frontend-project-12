/* eslint-disable functional/no-expression-statement */
import { addMessage } from '../slices/messagesSlice.js';

const setupSocketHandlers = (socket, store) => {
  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
};

export default setupSocketHandlers;
