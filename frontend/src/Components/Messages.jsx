import {
  Col,
  Card,
  Spinner,
  Alert,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { getMessagesQuery, getChannelsQuery } from '../services/chatApi'
import MessageForm from './MessageForm.jsx'

const Messages = () => {
  const { t } = useTranslation()

  const { data: channels = [] } = getChannelsQuery()
  const {
    data: messages = [],
    isLoading,
    isError,
  } = getMessagesQuery()

  const activeChannelId = useSelector(state => state.channelsReducer.activeChannelId)
  const activeChannel = channels
    .find(channel => Number(channel.id) === Number(activeChannelId))
  const filteredMessages = messages
    .filter(message => Number(message.channelId) === Number(activeChannelId))

  if (isLoading) {
    return (
      <Col className="col p-0 h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Col>
    )
  }

  if (isError) {
    return (
      <Col className="col p-0 h-100 d-flex justify-content-center align-items-center text-danger">
        <Alert variant="danger">{t('errors.loadingError')}</Alert>
      </Col>
    )
  }

  if (!activeChannel) {
    return (
      <Col className="col p-0 h-100 d-flex justify-content-center align-items-center text-muted">
        <Alert variant="secondary">{t('channelWarning')}</Alert>
      </Col>
    )
  }

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Card className="bg-light mb-3 shadow-sm border-0 rounded-0">
          <Card.Body className="py-2 px-3">
            <Card.Title as="h6" className="mb-0">
              {`# ${activeChannel.name}`}
            </Card.Title>
            <Card.Text className="text-muted mb-0 small">
              {`${filteredMessages.length} сообщений`}
            </Card.Text>
          </Card.Body>
        </Card>

        <div id="messages-box" className="chat-messages overflow-auto px-4 mb-2">
          {filteredMessages.map(msg => (
            <div key={msg.id} className="text-break mb-2">
              <strong>{msg.username}</strong>
              {`: ${msg.body}`}
            </div>
          ))}
        </div>

        <MessageForm />
      </div>
    </Col>
  )
}

export default Messages
