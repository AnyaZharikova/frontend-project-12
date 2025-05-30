import { useRef, useEffect } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const ModalInput = (props) => {
  const { t } = useTranslation()
  const inputModalRef = useRef(null)

  const { values } = props
  const {
    isShown,
    formik,
    title,
    handleClose,
    cancelButton,
    submitButton,
  } = values

  useEffect(() => {
    inputModalRef.current.focus()
  }, [])

  return (
    <Modal show={isShown} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label className="visually-hidden" htmlFor="channelName">{t('modals.channelName')}</Form.Label>
          <Form.Control
            id="channelName"
            name="channelName"
            placeholder={t('modals.channelName')}
            type="text"
            value={formik.values.channelName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isInvalid={formik.errors.channelName && formik.touched.channelName}
            disabled={formik.isSubmitting}
            ref={inputModalRef}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.channelName}
          </Form.Control.Feedback>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {cancelButton}
            </Button>
            <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
              {submitButton}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalInput
