export const apiPath = '/api/v1'

export default {
  loginPath: () => '/login',
  registerPath: () => '/signup',
  chatPath: () => '/chat',
  channelsPath: () => '/channels',
  channelPath: id => `/channels/${id}`,
  messagesPath: () => '/messages',
}
