/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-try-statement */
/* eslint-disable functional/no-expression-statement */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import routes from '../routes.js';
import { setCredentials } from '../slices/authSlice.js';

const LoginPage = () => {
  const dispatch = useDispatch();

  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const response = await axios.post(routes.loginPath, values);
        console.log('response.data:', response.data); // If the token is not there, the problem is in the API or in the request.
        const { username, token } = response.data;
        // save to redux
        dispatch(setCredentials({ username, token }));
        // save token to localStorage
        if (token && typeof token === 'string') {
          localStorage.setItem('token', JSON.stringify(token)); // localStorage stores only strings
        } else {
          throw new Error('Token is missing or of the wrong type');
        }

        const from = location.state?.from?.pathname || '/';
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-lg-5">
              <h1 className="mb-4">Вход</h1>

              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="username">Логин</Form.Label>
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    ref={inputRef}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={authFailed}
                    disabled={formik.isSubmitting}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">
                    Неверные данные для входа
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    Войти
                  </Button>
                </div>
              </Form>
            </Card.Body>

            <Card.Footer className="text-center py-4">
              <div>
                <span className="text-muted">Ещё нет аккаунта? </span>
                <Link to="/register">Зарегистрироваться</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
