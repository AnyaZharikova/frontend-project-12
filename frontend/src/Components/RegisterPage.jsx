import {
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { registrationSchema } from '../validation/validationSchema.js'
import { signupUserMutation } from '../services/chatApi.js'
import { setCredentials } from '../slices/authSlice.js'
import RegisterCard from './RegisterCard.jsx'
import routes from '../routes.js'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [signupUser] = signupUserMutation()
  const [registerFailed, setRegisterFailed] = useState(false)
  const inputRef = useRef()
  const { t } = useTranslation()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: registrationSchema(t('registrationRules.name'), t('registrationRules.password'), t('errors.required'), t('registrationRules.passwordConfirmation')),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const response = await signupUser({
          username: values.username,
          password: values.password,
        }).unwrap()

        const { username, token } = response
        dispatch(setCredentials({ username, token }))

        localStorage.setItem('token', response.token)
        localStorage.setItem('username', response.username)

        toast.success(t('success.registration'))
        setRegisterFailed(false)
        navigate(routes.chatPath())
      }
      catch (err) {
        if (err.status === 409) {
          toast.error(t('errors.userExists'))
          setRegisterFailed(true)
        }
        else if (err.status) {
          toast.error(t('errors.serverError'))
        }
        else {
          toast(t('errors.network'))
        }
      }
    },
  })

  const values = {
    formik,
    title: t('registration'),
    buttonTitle: t('makeRegistration'),
    placeholderUsername: t('placeholders.username'),
    placeholderPassword: t('placeholders.password'),
    placeholderPasswordConfirmation: t('placeholders.passwordConfirmation'),
    userExists: t('errors.userExists'),
    haveAccount: t('haveAccount'),
    login: t('entry'),
    path: routes.loginPath(),
    registerFailed,
    inputRef,
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <RegisterCard values={values} />
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterPage
