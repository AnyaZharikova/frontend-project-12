import { io } from 'socket.io-client';

const initSocket = (token) => io({ auth: { token } });

export default initSocket;
