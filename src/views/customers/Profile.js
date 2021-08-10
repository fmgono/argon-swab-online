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
  const [isSuccess, setSuccess] = useState(false)
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)
  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      phoneCountryCode: '+62',
      phoneNumber: '812198712912',
      identityType: '',
      identityNumber: '',
      dateOfBirth: '',
      placeOfBirth: '',
      sex: '',
      address: '',
      email: '',
    },
    validate: field => {
      const errors = {}
      if (!field.name) {
        errors.name = REQUIRED_MESSAGES
      }
      if (!field.phoneCountryCode) {
        errors.phoneCountryCode = REQUIRED_MESSAGES
      }
      if (!field.phoneNumber) {
        errors.phoneNumber = REQUIRED_MESSAGES
      }
      if (!field.identityType) {
        errors.identityType = REQUIRED_MESSAGES
      }
      if (!field.identityNumber) {
        errors.identityNumber = REQUIRED_MESSAGES
      }
      if (!field.dateOfBirth) {
        errors.dateOfBirth = REQUIRED_MESSAGES
      }
      if (!field.placeOfBirth) {
        errors.placeOfBirth = REQUIRED_MESSAGES
      }
      if (!field.sex) {
        errors.sex = REQUIRED_MESSAGES
      }
      if (!field.address) {
        errors.address = REQUIRED_MESSAGES
      }
      if (!field.email) {
        errors.email = REQUIRED_MESSAGES
      }
      return errors
    },
    onSubmit: async value => {
      const payload = {
        id: value.id,
        full_name: value.name,
        mobile_country_code: value.phoneCountryCode,
        mobile: value.phoneNumber,
        id_type: value.identityType,
        id_num: value.identityNumber,
        pob: value.placeOfBirth,
        dob: value.dateOfBirth,
        sex: value.sex,
        address: value.address,
        email: value.email,
      }
      try {
        await axios.put('/users', payload)
        setConfirmModalOpen(false)
        setSuccess(true)
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
                    <h3 className="mb-0">Pebarui Profil Saya</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              <Form role="form" onSubmit={formik.handleSubmit}>
                <FormGroup>
                  <Label className="form-control-label" for="name">Nama</Label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      type="text" 
                      id="name" 
                      placeholder="Nama Lengkap"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      invalid={Boolean(formik.errors.name)}
                    />
                  </InputGroup>
                  {formik.errors.name ? <small className="text-red">{formik.errors.name}</small> : null}
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" for="phone-number">No HP</Label>
                  <Row>
                    <Col md="2">
                      <FormGroup>
                        <Input 
                          type="text"
                          id="phoneCountryCode"
                          name="phoneCountryCode"
                          placeholder="+62"
                          onChange={formik.handleChange}
                          value={formik.values.phoneCountryCode}
                          invalid={Boolean(formik.errors.phoneCountryCode)} />
                        {formik.errors.phoneCountryCode ? <small className="text-red">{formik.errors.phoneCountryCode}</small> : null}
                      </FormGroup>
                    </Col>
                    <Col md="10">
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-mobile-button" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input 
                            type="number"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="81312345678"
                            onChange={formik.handleChange}
                            value={formik.values.phoneNumber}
                            invalid={Boolean(formik.errors.phoneNumber)} />
                        </InputGroup>
                        {formik.errors.phoneNumber ? <small className="text-red">{formik.errors.phoneNumber}</small> : null}
                      </FormGroup>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label">Tipe Identitas</Label>
                  <FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input 
                          type="radio" 
                          id="ktp"
                          value="KTP"
                          name="identityType"
                          checked={formik.values.identityType === 'KTP'}
                          onChange={formik.handleChange}/>{' '}
                          KTP
                      </Label>
                    </FormGroup>
                    <FormGroup check inline className="ml-8">
                      <Label check>
                        <Input 
                          type="radio" 
                          id="passport"
                          value="PASSPORT"
                          name="identityType"
                          checked={formik.values.identityType === 'PASSPORT'}
                          onChange={formik.handleChange}/>{' '}
                          Passport
                      </Label>
                    </FormGroup>
                  </FormGroup>
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" for="identity-number">Nomor Identitas</Label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-badge" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      type="number"
                      id="identityNumber" 
                      name="identityNumber" 
                      placeholder="31780001191289192"
                      onChange={formik.handleChange}
                      value={formik.values.identityNumber}
                      invalid={Boolean(formik.errors.identityNumber)} />
                  </InputGroup>
                  {formik.errors.identityNumber ? <small className="text-red">{formik.errors.identityNumber}</small> : null}
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" for="phone-number">Tempat Lahir</Label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-pin-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text" 
                      id="placeOfBirth"
                      name="placeOfBirth"
                      placeholder="Jakarta"
                      onChange={formik.handleChange}
                      value={formik.values.placeOfBirth}
                      invalid={Boolean(formik.errors.placeOfBirth)} />
                  </InputGroup>
                  {formik.errors.placeOfBirth ? <small className="text-red">{formik.errors.placeOfBirth}</small> : null}
                </FormGroup><FormGroup>
                  <Label className="form-control-label" for="phone-number">Tanggal Lahir</Label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      onChange={formik.handleChange}
                      value={formik.values.dateOfBirth}
                      invalid={Boolean(formik.errors.dateOfBirth)} />
                  </InputGroup>
                  {formik.errors.dateOfBirth ? <small className="text-red">{formik.errors.dateOfBirth}</small> : null}
                </FormGroup>
                <FormGroup>
                  <Label>Jenis Kelamin</Label>
                  <FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input 
                          type="radio" 
                          id="pria"
                          value="Pria"
                          name="sex"
                          checked={formik.values.sex === 'Pria'}
                          onChange={formik.handleChange}/>{' '}
                          Pria
                      </Label>
                    </FormGroup>
                    <FormGroup check inline className="ml-8">
                      <Label check>
                        <Input 
                          type="radio" 
                          id="wanita"
                          value="Wanita"
                          name="sex"
                          checked={formik.values.sex === 'Wanita'}
                          onChange={formik.handleChange}/>{' '}
                          Wanita
                      </Label>
                    </FormGroup>
                  </FormGroup>
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" for="phone-number">Alamat Kartu Identitas</Label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-pin-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="textarea" 
                      id="address"
                      name="address"
                      placeholder="JL. AMD XII"
                      onChange={formik.handleChange}
                      value={formik.values.address}
                      invalid={Boolean(formik.errors.address)} />
                  </InputGroup>
                  {formik.errors.address ? <small className="text-red">{formik.errors.address}</small> : null}
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" for="phone-number">Email</Label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      invalid={Boolean(formik.errors.email)} />
                  </InputGroup>
                  {formik.errors.email ? <small className="text-red">{formik.errors.email}</small> : null}
                </FormGroup>
                <div className="text-center">
                  {/* <Button color="primary" type="button" onClick={() => setConfirmModalOpen(!isConfirmModalOpen)} style={{ width: '100%' }}>
                    Simpan Perubahan
                  </Button> */}
                  { !isSuccess 
                    ?
                    <Button color="primary" type="button" onClick={() => setConfirmModalOpen(!isConfirmModalOpen)} style={{ width: '100%' }}>
                      Simpan
                    </Button>
                    : 
                    <Alert color="success" className="mt-2">
                      <strong>Berhasil!</strong> Data sudah berhasil di perbarui.
                    </Alert> }
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={isConfirmModalOpen}
                    toggle={() => setConfirmModalOpen(!isConfirmModalOpen)}
                  >
                    <div className="modal-header">
                      <h3 className="modal-title" id="exampleModalLabel">
                        Perubahan Profil
                      </h3>
                    </div>
                    <div className="modal-body">
                      Anda yakin untuk melakukan perubahan data profil ?
                    </div>
                    <div className="modal-footer">
                      <Button
                        data-dismiss="modal"
                        type="button"
                        onClick={() => setConfirmModalOpen(!isConfirmModalOpen)}
                      >
                        Tidak, tunggu dulu
                      </Button>
                      <Button color="primary" onClick={formik.handleSubmit}>
                        Ya, Saya yakin
                      </Button>
                    </div>
                  </Modal>
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
