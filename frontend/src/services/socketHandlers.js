import { channelsApi, messagesApi } from './api/index.js'

const setupSocketHandlers = (socket, store) => {
  socket.on('newMessage', (message) => {
    store.dispatch(
      messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(message)
      }),
    )
  })

  socket.on('newChannel', (channel) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(channel)
      }),
    )
  })

  socket.on('renameChannel', () => {
    store.dispatch(channelsApi.util.invalidateTags(['Channels']))
  })

  socket.on('removeChannel', () => {
    store.dispatch(channelsApi.util.invalidateTags(['Channels']))
  })
}

export default setupSocketHandlers
