/* eslint-disable functional/no-expression-statement */
import React, { useRef, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

const ModalInput = (props) => {
  const inputModalRef = useRef();
  const { values } = props;
  const {
    isShown,
    formik,
    title,
    field,
    handleClose,
    cancelButton,
    submitButton,
  } = values;

  useEffect(() => {
    inputModalRef.current.focus();
  }, []);

  return (
    <Modal show={isShown} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Control
              name={field}
              value={formik.values[field]}
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isInvalid={formik.errors[field]}
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
      </Modal.Body>
    </Modal>
  );
};

export default ModalInput;
