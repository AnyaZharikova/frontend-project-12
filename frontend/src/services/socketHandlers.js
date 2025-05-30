import { chatApi } from './chatApi.js'

const setupSocketHandlers = (socket, store) => {
  socket.on('newMessage', (message) => {
    store.dispatch(
      chatApi.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(message)
      }),
    )
  })

  socket.on('newChannel', (channel) => {
    store.dispatch(
      chatApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(channel)
      }),
    )
  })

  socket.on('renameChannel', () => {
    store.dispatch(chatApi.util.invalidateTags(['Channels']))
  })

  socket.on('removeChannel', (channelId) => {
    store.dispatch(
      chatApi.util.updateQueryData('getChannels', undefined, draft => draft.filter(ch => ch.id !== channelId)),
    )
  })
}

export default setupSocketHandlers
