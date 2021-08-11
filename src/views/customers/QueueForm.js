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
import { Link } from "react-router-dom"

const REQUIRED_MESSAGES = 'Harus diisi'

const Profile = () => {
  const { user } = useAuthState()
  // const [isSuccess, setSuccess] = useState(false)
  // const [defaultData, setDefaultData] = useState({
  //   userId: '',
  //   name: '',
  //   phoneCountryCode: '',
  //   phoneNumber: '',
  //   identityType: '',
  //   identityNumber: '',
  //   dateOfBirth: '',
  //   placeOfBirth: '',
  //   sex: '',
  //   address: '',
  //   email: '',
  // })
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)

  const reOrderAgain = () => {
    formik.setValues({
      sessionName: '',
      sessionDate: '',
      sessionTime: '',
      sessionPrice: 0,
      meetingLocation: '',
      additionalInfo: '',
    })
    setModalOpen(false)
  }

  const formik = useFormik({
    initialValues: {
      userId: user.value.id,
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
      sessionName: '',
      sessionDate: '',
      sessionTime: '',
      sessionCurrency: 'IDR',
      sessionPrice: 0,
      meetingLocation: '',
      additionalInfo: '',
      payment_status: 'PENDING',
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
      if (!field.sessionName) {
        errors.sessionName = REQUIRED_MESSAGES
      }
      if (!field.sessionDate) {
        errors.sessionDate = REQUIRED_MESSAGES
      }
      if (!field.sessionTime) {
        errors.sessionTime = REQUIRED_MESSAGES
      }
      if (!field.sessionPrice) {
        errors.sessionPrice = REQUIRED_MESSAGES
      }
      if (!field.meetingLocation) {
        errors.meetingLocation = REQUIRED_MESSAGES
      }
      return errors
    },
    onSubmit: async value => {
      const payload = {
        user_id: value.userId,
        customer_full_name: value.name,
        customer_mobile_country_code: value.phoneCountryCode,
        customer_mobile: value.phoneNumber,
        customer_id_type: value.identityType,
        customer_id_num: value.identityNumber,
        customer_pob: value.placeOfBirth,
        customer_dob: value.dateOfBirth,
        customer_sex: value.sex,
        customer_address: value.address,
        customer_email: value.email,
        session_name: value.sessionName,
        session_date: value.sessionDate,
        session_time: value.sessionTime,
        session_currency: 'IDR',
        currency: 'IDR',
        session_price: value.sessionPrice,
        total: value.sessionPrice,
        meeting_location: value.meetingLocation,
        additional_info: value.additionalInfo,
        payment_status: 'PENDING',
      }
      try {
        await axios.post('/queue', payload)
        setConfirmModalOpen(false)
        // setSuccess(true)
        setModalOpen(true)
      } catch (e) {
        alert('Terjadi kesalahan! Silahkan hubungi customer service kami!')
      }
    },
  });

  // const setDataByUser = () => {
  //   setDefaultData({
  //     userId: defaultData.userId,
  //     name: defaultData.name,
  //     phoneCountryCode: defaultData.phoneCountryCode,
  //     phoneNumber: defaultData.phoneNumber,
  //     identityType: defaultData.identityType,
  //     identityNumber: defaultData.identityNumber,
  //     dateOfBirth: defaultData.dateOfBirth,
  //     placeOfBirth: defaultData.placeOfBirth,
  //     sex: defaultData.sex,
  //     address: defaultData.address,
  //     email: defaultData.email
  //   }) 
  // }
  
  useEffect(() => {
    const getProfile = async () => {
      const { data } = await axios.get(`profile/${user.id.value}`)
      const date = new Date(data.dob)
      formik.setValues({
        userId: data.id,
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
                    <h3 className="mb-0">Buat Antrian</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              <Form role="form" onSubmit={formik.handleSubmit}>
                <h4 className="text-muted mb-2">
                  INFORMASI DATA DIRI
                </h4>
                {/* <FormGroup>
                  <Label className="form-control-label">Tipe Identitas</Label>
                  <FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input 
                          type="radio" 
                          id="ktp"
                          value="KTP"
                          name="identityType"
                          checked={formik.values.identityType === 'KTP'}
                          onChange={formik.handleChange}/>{' '}
                          Antrian untuk saya
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input 
                          type="radio" 
                          id="passport"
                          value="PASSPORT"
                          name="identityType"
                          checked={formik.values.identityType === 'PASSPORT'}
                          onChange={formik.handleChange}/>{' '}
                          Antrian untuk orang lain
                      </Label>
                    </FormGroup>
                  </FormGroup>
                </FormGroup> */}
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
                            placeholder="812010129121"
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
                  <Row>
                    <Col sm="12" md="5">
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
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="7">
                      <FormGroup>
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
                    </Col>
                  </Row>
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
                <h4 className="text-muted my-2">
                  SESI ANTRIAN
                </h4>
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
                      name="sessionName"
                      placeholder="Nama"
                      onChange={formik.handleChange}
                      value={formik.values.sessionName}
                      invalid={Boolean(formik.errors.sessionName)}
                    />
                  </InputGroup>
                  {formik.errors.sessionName ? <small className="text-red">{formik.errors.sessionName}</small> : null}
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col sm="12" md="7">
                      <FormGroup>
                        <Label className="form-control-label" for="phone-number">Tanggal</Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-calendar-grid-58" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="date"
                            id="sessionDate"
                            name="sessionDate"
                            onChange={formik.handleChange}
                            value={formik.values.sessionDate}
                            invalid={Boolean(formik.errors.sessionDate)} />
                        </InputGroup>
                        {formik.errors.sessionDate ? <small className="text-red">{formik.errors.sessionDate}</small> : null}
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="5">
                      <FormGroup>
                        <Label className="form-control-label" for="phone-number">Jam</Label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-time-alarm" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text" 
                            id="sessionTime"
                            name="sessionTime"
                            placeholder="09:00"
                            onChange={formik.handleChange}
                            value={formik.values.sessionTime}
                            invalid={Boolean(formik.errors.sessionTime)} />
                        </InputGroup>
                        {formik.errors.sessionTime ? <small className="text-red">{formik.errors.sessionTime}</small> : null}
                      </FormGroup>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" for="phone-number">Lokasi Pertemuan</Label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-pin-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="textarea" 
                      id="meetingLocation"
                      name="meetingLocation"
                      placeholder="Jakarta, Indonesia"
                      onChange={formik.handleChange}
                      value={formik.values.meetingLocation}
                      invalid={Boolean(formik.errors.meetingLocation)} />
                  </InputGroup>
                  {formik.errors.meetingLocation ? <small className="text-red">{formik.errors.meetingLocation}</small> : null}
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" for="phone-number">Biaya</Label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        Rp. 
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="mumber" 
                      id="sessionPrice"
                      name="sessionPrice"
                      placeholder="150000"
                      onChange={formik.handleChange}
                      value={formik.values.sessionPrice}
                      invalid={Boolean(formik.errors.sessionPrice)} />
                  </InputGroup>
                  {formik.errors.sessionPrice ? <small className="text-red">{formik.errors.sessionPrice}</small> : null}
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" for="phone-number">Informasi Tambahan</Label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-copy-04" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text" 
                      id="additionalInfo"
                      name="additionalInfo"
                      placeholder="Saya memiliki gejala sedang, jadi mohon untuk perketat prokes"
                      onChange={formik.handleChange}
                      value={formik.values.additionalInfo}
                      invalid={Boolean(formik.errors.additionalInfo)} />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button color="primary" type="button" onClick={() => setConfirmModalOpen(!isConfirmModalOpen)} style={{ width: '100%' }}>
                    Pesan Antrian
                  </Button>
                  {/* { !isSuccess 
                    ?
                    <Button color="primary" type="button" onClick={() => setConfirmModalOpen(!isConfirmModalOpen)} style={{ width: '100%' }}>
                      Simpan
                    </Button>
                    : 
                    <Alert color="success" className="mt-2">
                      <strong>Berhasil!</strong> Data sudah berhasil di perbarui.
                    </Alert> } */}
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={isConfirmModalOpen}
                    toggle={() => setConfirmModalOpen(!isConfirmModalOpen)}
                  >
                    <div className="modal-header">
                      <h3 className="modal-title" id="exampleModalLabel">
                        Konfirmasi
                      </h3>
                    </div>
                    <div className="modal-body">
                      <p>Apakah benar ingin melakukan pesanan antrian atas :</p>
                      <li>Nama : { formik.values.name }</li>
                      <li>Email : { formik.values.email }</li>
                      <li>Alamat : { formik.values.address }</li>
                      <p class="mt-2">Dan bertemu dengan :</p>
                      <li>Nama : { formik.values.sessionName }</li>
                      <li>Lokasi : { formik.values.meetingLocation }</li>
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
                        Ya, Benar
                      </Button>
                    </div>
                  </Modal>
                  <Modal
                    className="modal-dialog-centered modal-danger"
                    contentClassName="bg-gradient-info"
                    isOpen={isModalOpen}
                    toggle={() => setModalOpen(!isModalOpen)}
                    backdrop="static" 
                    keyboard={false}
                  >
                    <div className="modal-header">
                      <h3 className="modal-title" id="modal-title-notification">
                        Berhasil!
                      </h3>
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => setModalOpen(!isModalOpen)}
                      >
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="py-3 text-center">
                        <i className="ni ni-check-bold ni-3x" />
                        <h4 className="mt-4 heading">
                          Pemesanan Antrian Berhasil!
                        </h4>
                        <p>
                          Pastikan anda datang paling tidak 10 menit sebelum jadwal yang telah ditentukan!
                        </p>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <Button
                        type="button"
                        color="primary" 
                        style={{ width: '100%' }}
                        onClick={reOrderAgain}>
                        Pesan Lagi
                      </Button>
                      <Link 
                        to="/customer/index"
                        style={{ width: '100%' }}
                      >
                        <Button
                          type="button"
                          color="secondary"
                          style={{ width: '100%' }}>
                          Kembali ke Dashboard
                        </Button>
                      </Link>
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
