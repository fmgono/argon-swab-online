import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useState } from '@hookstate/core';
import { login } from 'store/auth';

const REQUIRED_MESSAGES = 'Harus diisi'

const Login = () => {
  const history = useHistory()
  const error = useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: field => {
      const errors = {}
      if (!field.email) {
        errors.email = REQUIRED_MESSAGES
      }
      if (!field.password) {
        errors.password = REQUIRED_MESSAGES
      }
      return errors
    },
    onSubmit: async value => {
      try {
        await login({
          email: value.email,
          password: value.password,
        })
        history.push('/customer/index')
      } catch (e) {
        error.set(true)
        throw new Error(e)
      }
    },
  });

  const errorComponent = error.get() ? 
  <Alert color="danger">
    <strong>Gagal!</strong> Kesalahan email atau kata sandi!
  </Alert> 
  : null

  return (
    <>
      <Col lg="5" md="7">
        <Card className="border-0 shadow bg-secondary">
          <CardHeader className="bg-transparent">
            <div className="text-center">
              <h1>Masuk</h1>
              <span>Silahkan input email dan kata sandi untuk masuk</span>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-md">
            <Form role="form" onSubmit={formik.handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text" 
                    id="email"
                    name="email"
                    placeholder="Email / No HP"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    invalid={Boolean(formik.errors.email)} />
                </InputGroup>
                {formik.errors.email ? <small className="text-red">{formik.errors.email}</small> : null}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Kata sandi"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    invalid={Boolean(formik.errors.password)} />
                </InputGroup>
                {formik.errors.password ? <small className="text-red">{formik.errors.password}</small> : null}
              </FormGroup>
              { errorComponent }
              <div className="text-center">
                <Button color="primary" type="submit" style={{ width: '100%' }}>
                  Masuk
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              onClick={(e) => e.preventDefault()}
            >
              <small>Lupa Kata Sandi ?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
          <Link to="/auth/register" className="text-light">
            <small>Daftar Akun</small>
          </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
