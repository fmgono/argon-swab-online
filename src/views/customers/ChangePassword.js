// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  Alert,
} from "reactstrap"
// core components

import axios from '../../axios'
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useAuthState } from '../../store/auth'

const REQUIRED_MESSAGES = 'Harus diisi'

const Profile = () => {
  const { user } = useAuthState()
  const initialValues = {
    id: user.id.value,
    oldPassword: '',
    newPassword: '',
    confirmationPassword: '',
  }
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const [isFailed, setFailed] = useState(false)
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)
  const formik = useFormik({
    initialValues,
    validate: field => {
      const errors = {}
      if (!field.oldPassword) {
        errors.oldPassword = REQUIRED_MESSAGES
      }
      if (!field.newPassword) {
        errors.newPassword = REQUIRED_MESSAGES
      }
      if (!field.confirmationPassword) {
        errors.confirmationPassword = REQUIRED_MESSAGES
      }
      if (field.confirmationPassword !== field.newPassword) {
        errors.confirmationPassword = 'Konfirmasi kata sandi tidak sesuai!'
      }
      return errors
    },
    onSubmit: async value => {
      const payload = {
        id: value.id,
        old_password: value.oldPassword,
        new_password: value.newPassword,
      }
      try {
        const { data } = await axios.put('/changepass', payload)
        if (data.msg === 'User not found') {
          setFailed(true)
        }
        setSuccess(true)
        formik.resetForm({
          id: '',
          oldPassword: '',
          confirmationPassword: '',
        })
      } catch (e) {
        alert('Terjadi kesalahan! Silahkan hubungi customer service kami!')
      }
    },
  });
  useEffect(() => {
    const getProfile = async () => {
      const { data } = await axios.get(`profile/${user.id.value}`)
      const date = new Date(data.dob)
      formik.setValues({
        id: data.id,
        name: data.full_name,
        phoneCountryCode: data.mobile_country_code,
        phoneNumber: data.mobile,
        identityType: data.id_type,
        identityNumber: data.id_num,
        dateOfBirth: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        placeOfBirth: data.pob,
        sex: data.sex,
        address: data.address,
        email: data.email
      })
    }

    getProfile()
  }, [])
  return (
    <>
      <div className="pt-5 pb-8 header bg-gradient-info pt-md-8">
      </div>
      <Container className="mt--7" fluid>
        <Row className="justify-content-center">
          <Col className="order-xl-1" md="6">
            <Card className="shadow bg-secondary">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Ubah Password</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              <Form role="form" onSubmit={formik.handleSubmit}>
                <FormGroup>
                  <Label className="form-control-label" for="password">Kata Sandi Lama</Label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      id="password"
                      name="oldPassword"
                      placeholder="Kata Sandi"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      invalid={Boolean(formik.errors.password)} />
                  </InputGroup>
                  {formik.errors.password ? <small className="text-red">{formik.errors.password}</small> : null}
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" for="newPassword">Kata Sandi Baru</Label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      placeholder="Kata Sandi"
                      onChange={formik.handleChange}
                      value={formik.values.newPassword}
                      invalid={Boolean(formik.errors.newPassword)} />
                  </InputGroup>
                  {formik.errors.newPassword ? <small className="text-red">{formik.errors.newPassword}</small> : null}
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" for="confirmationPassword">Konfirmasi Password</Label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      id="confirmationPassword"
                      name="confirmationPassword"
                      placeholder="Konfirmasi Password"
                      onChange={formik.handleChange}
                      value={formik.values.confirmationPassword}
                      invalid={Boolean(formik.errors.confirmationPassword)} />
                  </InputGroup>
                  {formik.errors.confirmationPassword ? <small className="text-red">{formik.errors.confirmationPassword}</small> : null}
                </FormGroup>
                <div className="text-center">
                  { !isSuccess 
                    ?
                    <Button color="primary" type="submit" style={{ width: '100%' }}>
                      {
                        isLoading ? 'Loading' : 'Ubah Password'
                      }
                    </Button>
                    : 
                    <Alert color={isFailed ? 'danger' : 'success'} className="mt-2">
                      <strong>{isFailed ?  'Gagal!' : 'Berhasil!'  }</strong>
                      {isFailed ? 'Kata Sandi Sebelumnya tidak cocok! ' : 'Kata sandi sudah berhasil di perbarui.'}
                    </Alert> }
                </div>
              </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
