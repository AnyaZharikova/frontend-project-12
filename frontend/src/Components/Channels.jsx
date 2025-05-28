/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-expression-statement */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Button,
  ButtonGroup,
  Dropdown,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getChannelsQuery } from '../services/chatApi';
import { setActiveChannel } from '../slices/channelsSlice.js';
import { openModal } from '../slices/modalsSlice.js';
import getModalComponent from './modal/index.js';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    data: channels,
    isLoading,
    isError,
  } = getChannelsQuery();
  const activeChannelId = useSelector((state) => state.channelsReducer.activeChannelId);
  const modalType = useSelector((state) => state.modalsReducer.modals.modalType);

  const handleClick = (channelId) => {
    dispatch(setActiveChannel(channelId));
  };

  const renderModal = () => {
    if (modalType === '') {
      return null;
    }
    const ModalComponent = getModalComponent(modalType);
    return <ModalComponent />;
  };

  if (isLoading) {
    return (
      <Col className="col p-0 h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Col>
    );
  }

  if (isError) {
    return (
      <Col className="col p-0 h-100 d-flex justify-content-center align-items-center text-danger">
        <Alert variant="danger">{t('errors.loadingError')}</Alert>
      </Col>
    );
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
          <i className="bi bi-plus-square" />
        </Button>
      </div>
      <ul id="channels-id" className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            <ButtonGroup className="d-flex show dropdown">
              <Button
                id={channel.id}
                variant={Number(channel.id) === Number(activeChannelId) ? 'secondary' : 'light'}
                className="w-100 rounded-0 text-start text-truncate btn"
                onClick={() => handleClick(channel.id)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>

              {channel.removable && (
                <Dropdown>
                  <Dropdown.Toggle split variant={Number(channel.id) === Number(activeChannelId) ? 'secondary' : 'light'} className="flex-grow-0 rounded-0">
                    <span className="visually-hidden">{t('modals.toggle')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => dispatch(openModal({ type: 'rename', targetId: channel.id }))}>{t('modals.rename')}</Dropdown.Item>
                    <Dropdown.Item onClick={() => dispatch(openModal({ type: 'remove', targetId: channel.id }))}>{t('modals.remove')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </ButtonGroup>
          </li>
        ))}
      </ul>
      { renderModal() }
    </Col>
  );
};

export default Channels;
