import { Form, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import InputField from './InputField.jsx'
import SubmitButton from './SubmitButton.jsx'

const RegisterCard = (props) => {
  const { values } = props
  const {
    formik,
    title,
    placeholderUsername,
    placeholderPassword,
    placeholderPasswordConfirmation,
    userExists,
    haveAccount,
    login,
    path,
    registerFailed,
    inputRef,
  } = values

  const propsUsername = {
    formik,
    field: 'username',
    type: 'text',
    placeholder: placeholderUsername,
    failed: (formik.errors.username && formik.touched.username) || registerFailed,
    inputRef,
    error: formik.errors.username,
  }

  const propsPassword = {
    formik,
    field: 'password',
    type: 'password',
    placeholder: placeholderPassword,
    failed: (formik.errors.password && formik.touched.password) || registerFailed,
    inputRef: null,
    error: formik.errors.password,
  }

  const propsPasswordConfirmationValues = {
    formik,
    field: 'passwordConfirmation',
    type: 'password',
    placeholder: placeholderPasswordConfirmation,
    failed: (
      (formik.errors.passwordConfirmation && formik.touched.passwordConfirmation)
      || registerFailed
    ),
    inputRef: null,
    error: registerFailed ? userExists : formik.errors.passwordConfirmation,
  }

  return (
    <Card className="shadow-sm">
      <Card.Body className="p-lg-5">
        <h1 className="mb-4">{title}</h1>

        <Form onSubmit={formik.handleSubmit}>
          <InputField values={propsUsername} />
          <InputField values={propsPassword} />
          <InputField values={propsPasswordConfirmationValues} />

          <SubmitButton values={{ formik, title }} />
        </Form>
      </Card.Body>

      <Card.Footer className="text-center py-4">
        <div>
          <span className="text-muted d-block">{haveAccount}</span>
          <Link to={path}>{login}</Link>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default RegisterCard
