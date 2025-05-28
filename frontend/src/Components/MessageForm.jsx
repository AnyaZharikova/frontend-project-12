/* eslint-disable functional/no-try-statement */
/* eslint-disable functional/no-expression-statement */
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { addMessageMutation } from '../services/chatApi';
import { messageSchema } from '../validation/validationSchema.js';

const MessageForm = () => {
  const { t } = useTranslation();
  const [addMessage] = addMessageMutation();
  const username = useSelector((state) => state.authReducer.username);
  const activeChannelId = useSelector((state) => state.channelsReducer.activeChannelId);

  const formik = useFormik({
    initialValues: { message: '' },
    validationSchema: messageSchema(t('errors.required')),
    onSubmit: async (values) => {
      try {
        const newMessage = {
          body: values.message,
          channelId: activeChannelId,
          username,
        };

        await addMessage(newMessage).unwrap();
        formik.resetForm();
      } catch (err) {
        toast.error(t('errors.messageSendError'));
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="mt-auto px-5 py-3">
      <InputGroup>
        <Form.Control
          name="message"
          aria-label={t('messageAriaLabel')}
          placeholder={t('placeholders.newMessage')}
          className="border-0 p-0 ps-2"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.message && !!formik.errors.message}
        />
        <Button
          type="submit"
          variant="outline-primary"
          aria-label={t('sendMessageLabel')}
          disabled={!formik.values.message.trim()}
        >
          <i className="bi bi-arrow-return-left" />
        </Button>
      </InputGroup>
      <Form.Control.Feedback type="invalid">
        {formik.errors.message}
      </Form.Control.Feedback>
    </Form>
  );
};

export default MessageForm;
