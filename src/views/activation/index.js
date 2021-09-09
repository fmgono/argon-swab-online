import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  Spinner,
  Modal,
} from "reactstrap";
import axios from '../../axios'
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const Register = () => {
  const { id } = useParams()
  const [ isError, setError ] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const getActivation = async () => {
      const { data } = await axios.get(`activation/${id}`)
      if (data) {
        setModalOpen(true)
      } else {
        setError(true)
        setModalOpen(false)
      }
    }

    getActivation()
  }, [])
  return (
    <>
      <Col lg="6" md="8">
        <Card className="border-0 shadow bg-secondary">
          <CardHeader className="bg-transparent">
            <div className="text-center">
              {
                isError ? 
                (
                  <>
                    <h1>Validasi Gagal!</h1>
                    <span>Pastikan link yang diberikan dari pesan Whatsapp sudah sesuai</span>
                  </>
                ) :
                (
                  <>
                    <h1>Memvalidasi akun...</h1>
                    <span>Mohon menunggu</span>
                    <br/>
                    {<Spinner style={{ marginTop: '12px' }} color="primary" />}
                  </>
                )
              }
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-md">
          </CardBody>
          <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-primary"
              isOpen={isModalOpen}
              toggle={() => setModalOpen(!isModalOpen)}
              backdrop="static"
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
                    Validasi Berhasil!
                  </h4>
                  <p>
                    Silahkan login untuk akses ke aplikasi
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Link to="/auth/login" style={{ width: '100%' }}>
                  <Button 
                    type="button" 
                    className="btn-white" 
                    color="default"
                    style={{ width: '100%' }}
                    >
                    Masuk
                  </Button>
                </Link>
              </div>
            </Modal>
        </Card>
      </Col>
    </>
  );
};

export default Register;
