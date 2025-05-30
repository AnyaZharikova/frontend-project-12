import { Form, InputGroup, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import leoProfanity from 'leo-profanity'
import { addMessageMutation } from '../services/chatApi'
import { messageSchema } from '../validation/validationSchema.js'

const MessageForm = () => {
  const { t } = useTranslation()
  const inputRef = useRef()
  const username = useSelector(state => state.authReducer.username)
  const activeChannelId = useSelector(state => state.channelsReducer.activeChannelId)
  const [addMessage] = addMessageMutation()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: messageSchema(t('errors.required')),
    onSubmit: async (values) => {
      const { body } = values
      const censorBody = leoProfanity.clean(body)
      const newMessage = {
        body: censorBody,
        channelId: activeChannelId,
        username,
      }

      try {
        await addMessage(newMessage).unwrap()
        formik.resetForm()
      }
      catch {
        toast.error(t('errors.messageSendError'))
      }

      inputRef.current.focus()
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit} noValidate className="mt-auto px-5 py-3">
      <InputGroup>
        <Form.Control
          name="body"
          aria-label={t('messageAriaLabel')}
          placeholder={t('placeholders.newMessage')}
          className="border-0 p-0 ps-2"
          value={formik.values.body}
          onChange={formik.handleChange}
          ref={inputRef}
        />
        <Button
          type="submit"
          variant="outline-primary"
          aria-label={t('sendMessageLabel')}
          disabled={!formik.values.body}
        >
          <i className="bi bi-arrow-return-left" />
        </Button>
      </InputGroup>
    </Form>
  )
}

export default MessageForm
