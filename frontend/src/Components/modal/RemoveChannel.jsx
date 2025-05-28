/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-try-statement */
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getChannelsQuery, removeChannelMutation } from '../../services/chatApi.js';
import { closeModal } from '../../slices/modalsSlice';

const RenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isShown = useSelector((state) => state.modalsReducer.modals.isShown);
  const targetId = useSelector((state) => state.modalsReducer.modals.targetId);
  const { data: channels = [] } = getChannelsQuery();
  const [removeChannel] = removeChannelMutation();
  const currentChannel = channels.find((channel) => channel.id === targetId);

  const handleClose = () => dispatch(closeModal());

  const handleRemove = async () => {
    try {
      await removeChannel(currentChannel.id).unwrap();
      dispatch(closeModal());
      toast.success(t('success.removeChannel'));
    } catch (err) {
      toast.error(t('errors.channelRemove'));
    }
  };

  return (
    <Modal show={isShown} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal.Title>{t('modals.confirm')}</Modal.Title>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button type="submit" variant="danger" onClick={(handleRemove)}>
            {t('modals.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
