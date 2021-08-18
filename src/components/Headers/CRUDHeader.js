/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import { useAuthState } from 'store/auth';

const CustomerHeader = () => {
  const { user } = useAuthState()
  return (
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
      {/* Mask */}
      {/* <span className="mask bg-gradient-default opacity-8" /> */}
      {/* Header container */}
      {/* <Container className="d-flex align-items-center" fluid>
        <Row>
          <Col lg="7" md="10">
            <h1 className="text-white display-2">Selamat datang, {user.value.fullName}</h1>
            <p className="mt-0 text-white">
              Halaman ini adalah halaman dashboard anda. Anda bisa melihat rangkuman data yang telah anda lakukan melalui aplikasi ini
            </p>
            <Button
              color="info"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              Perbarui Profil Saya
            </Button>
          </Col>
        </Row>
      </Container> */}
    </div>
  );
};

export default CustomerHeader;
