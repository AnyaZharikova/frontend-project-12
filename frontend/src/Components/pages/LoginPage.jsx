import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { persistAuth } from '../../slices/authSlice.js'
import { loginUserMutation } from '../../services/api/index.js'
import LoginCard from '../ui/LoginCard.jsx'
import { loginSchema } from '../../validation/validationSchema.js'
import routes from '../../routes.js'

const LoginPage = () => {
  const dispatch = useDispatch()
  const [loginUser] = loginUserMutation()
  const [authFailed, setAuthFailed] = useState(false)
  const inputRef = useRef()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema(t('errors.required')),
    onSubmit: async (values) => {
      setAuthFailed(false)

      try {
        const response = await loginUser(values).unwrap()
        dispatch(persistAuth(response))
        navigate(routes.chatPath())
      }
      catch (err) {
        formik.setSubmitting(false)
        console.log(err)
        if (err?.status === 401) {
          setAuthFailed(true)
          inputRef.current.select()
        }
        else {
          toast.error(t('errors.network'))
        }
      }
    },
  })

  const values = {
    formik,
    title: t('entry'),
    buttonTitle: t('entry'),
    placeholderName: t('placeholders.login'),
    placeholderPassword: t('placeholders.password'),
    noAccount: t('noAccount'),
    registration: t('registration'),
    error: t('errors.invalidFeedback'),
    path: routes.registerPath(),
    authFailed,
    inputRef,
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <LoginCard values={values} />
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
