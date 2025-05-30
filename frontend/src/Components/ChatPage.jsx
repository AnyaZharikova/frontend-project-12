import { Container, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Channels from './Channels.jsx'
import Messages from './Messages.jsx'
import { setActiveChannel } from '../slices/channelsSlice.js'
import { getChannelsQuery } from '../services/chatApi'

const ChatPage = () => {
  const dispatch = useDispatch()
  const { data: channels = [] } = getChannelsQuery()
  const activeChannelId = useSelector(state => state.channelsReducer.activeChannelId)

  useEffect(() => {
    const activeChannel = channels.find(c => c.id === activeChannelId)
    if (!activeChannel && channels.length > 0) {
      dispatch(setActiveChannel(channels[0].id))
    }
  }, [channels, activeChannelId, dispatch])

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  )
}

export default ChatPage
