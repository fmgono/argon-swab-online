import axios from '../../axios'
import { useHistory } from "react-router-dom";
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
// import { useState } from "react";
import { useState } from '@hookstate/core';
import store from 'store';

const REQUIRED_MESSAGES = 'Harus diisi'

const Login = () => {
  const history = useHistory()
  const error = useState(false)
  const { user } = useState(store)
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
      const payload = {
        userId: value.email,
        password: value.password,
      }

      try {
        const { data } = await axios.post('/login', payload)
        const dataUser = {
          id: data.id,
          email: data.email,
          fullName: data.full_name,
          mobile: data.mobile,
          mobileCountryCode: data.mobile_country_code,
        }
        user.set(dataUser)
        history.push('/admin/index')
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
                    placeholder="test@gmail.com"
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
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Lupa Kata Sandi ?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Daftar Akun</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
