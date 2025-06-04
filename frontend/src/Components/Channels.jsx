import { useDispatch } from 'react-redux'
import {
  Col,
  Button,
  Alert,
  Spinner,
} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import Channel from './Channel.jsx'
import { getChannelsQuery } from '../services/api/index.js'
import { openModal } from '../slices/modalsSlice.js'

const Channels = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const {
    data: channels,
    isLoading,
    isError,
  } = getChannelsQuery()

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

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 pt-4 pb-4 ps-4 pe-2">
        <strong>{t('channels')}</strong>
        <Button
          variant=""
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          aria-label={t('modals.addChannel')}
          onClick={() => dispatch(openModal({ type: 'add', targetId: null }))}
        >
          <span className="visually-hidden">+</span>
          <i className="bi bi-plus-square" />
        </Button>
      </div>
      <ul id="channels-id" className="nav flex-column nav-pills nav-fill px-2">
        {channels.map(channel => (
          <Channel key={channel.id} channel={channel} />
        ))}
      </ul>
    </Col>
  )
}

export default Channels
