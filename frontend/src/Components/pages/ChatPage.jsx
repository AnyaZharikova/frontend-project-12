import { Container, Row } from 'react-bootstrap'

import Channels from '../Channels.jsx'
import Messages from '../Messages.jsx'
import Modal from '../modal/Modal.jsx'

const ChatPage = () => (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 bg-white flex-md-row">
      <Channels />
      <Messages />
    </Row>
    <Modal />
  </Container>
)

export default ChatPage
