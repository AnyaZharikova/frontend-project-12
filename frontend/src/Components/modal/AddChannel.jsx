/* eslint-disable functional/no-try-statement */
/* eslint-disable functional/no-expression-statement */
import axios from 'axios';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getChannelsQuery } from '../../services/chatApi.js';
import { newChannelSchema } from '../../validation/validationSchema.js';
import ModalInput from './ModalInput.jsx';
import { closeModal } from '../../slices/modalsSlice';
import routes from '../../routes.js';

const AddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isShown = useSelector((state) => state.modalsReducer.modals.isShown);
  const { data: channels = [] } = getChannelsQuery();

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema: newChannelSchema(channels, t('errors.channelExist'), t('registrationRules.name')),
    onSubmit: async (values) => {
      try {
        const newChannel = { name: values.channelName };

        const token = JSON.parse(localStorage.getItem('token'));
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.post(routes.channelsPath, newChannel, { headers });

        console.log('Channel added:', response.data);

        dispatch(closeModal());
        toast.success(t('success.newChannel'));
      } catch (error) {
        console.error(error);
        toast.error(t('errors.network'));
      }
    },
  });

  const handleClose = () => dispatch(closeModal());

  const values = {
    isShown,
    formik,
    title: t('modals.addChannel'),
    field: 'channelName',
    handleClose,
    cancelButton: t('cancel'),
    submitButton: t('modals.submitButton'),
  };

  return (
    <ModalInput values={values} />
  );
};

export default AddChannel;
