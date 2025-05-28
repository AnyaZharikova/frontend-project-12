/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-try-statement */
/* eslint-disable functional/no-expression-statement */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice.js';
import { loginUserMutation } from '../services/chatApi.js';
import LoginCard from './LoginCard.jsx';
import { loginSchema } from '../validation/validationSchema.js';
import routes from '../routes.js';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loginUser] = loginUserMutation();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema(t('errors.required')),
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const response = await loginUser(values);
        const { username, token } = response.data;
        // save to redux
        dispatch(setCredentials({ username, token }));

        // save token to localStorage
        if (token && typeof token === 'string') {
          localStorage.setItem('username', JSON.stringify(username));
          localStorage.setItem('token', JSON.stringify(token)); // localStorage stores only strings
        } else {
          throw new Error('Token is missing or of the wrong type');
        }

        navigate(routes.chatPage);
      } catch (err) {
        formik.setSubmitting(false);

        if (err?.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
        } else {
          toast.error(t('errors.network'));
        }
      }
    },
  });

  const values = {
    formik,
    title: t('entry'),
    placeholderName: t('placeholders.login'),
    placeholderPassword: t('placeholders.password'),
    noAccount: t('noAccount'),
    registration: t('makeRegistration'),
    error: t('errors.invalidFeedback'),
    path: routes.registerPage,
    authFailed,
    inputRef,
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <LoginCard values={values} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
