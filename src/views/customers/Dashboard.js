import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
// core components
import Header from "components/Headers/CustomerHeader.js";
import classnames from "classnames";
import { useState } from "@hookstate/core";

const CustomerDashboard = () => {
  const filter = useState('completed')
  const datas = [
    {
      fullName: 'Andika Pratama',
      sex: 'Pria',
      address: 'Jl. Ciliwung, Condet, DKI Jakarta',
      paymentStatus: 'Pending',
    },
    {
      fullName: 'Sri Wulandari',
      sex: 'Wanita',
      address: 'Jl. Kemang Raya, DKI Jakarta',
      paymentStatus: 'Selesai',
    },
    {
      fullName: 'Widya Ayu',
      sex: 'Wanita',
      address: 'Jl. Kebon Pala II, DKI Jakarta',
      paymentStatus: 'Dibatalkan',
    },
    {
      fullName: 'Yuda Wibowo',
      sex: 'Pria',
      address: 'Jl. Mandala 5, DKI Jakarta',
      paymentStatus: 'Dibatalkan',
    },
  ]
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--9" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="">Daftar Antrian</h3>
                <Row>
                  <Col md="6">
                    <Nav
                      className="nav-fill flex-column flex-sm-row"
                      id="tabs-text"
                      pills
                      role="tablist"
                    >
                      <NavItem>
                        <NavLink
                          aria-selected={filter.value === 'completed'}
                          className={classnames("mb-sm-3 mb-md-0", {
                            active: filter.value === 'completed'
                          })}
                          onClick={e => filter.set('completed')}
                          href="#"
                          role="tab"
                        >
                          Selesai
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          aria-selected={filter.value === 'pending'}
                          className={classnames("mb-sm-3 mb-md-0", {
                            active: filter.value === 'pending'
                          })}
                          onClick={e => filter.set('pending')}
                          href="#"
                          role="tab"
                        >
                          Tertunda
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          aria-selected={filter.value === 'cancelled'}
                          className={classnames("mb-sm-3 mb-md-0", {
                            active: filter.value === 'cancelled'
                          })}
                          onClick={e => filter.set('cancelled')}
                          href="#"
                          role="tab"
                        >
                          Dibatalkan
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                  <Col md="6" className="text-right">
                    <Button
                      color="info"
                      className="bg-gradient-info btn-icon"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="btn-inner--icon">
                        <i className="ni ni-fat-add" />
                      </span>
                      Tambah Antrian
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nama</th>
                    <th scope="col">Jenis Kelamin</th>
                    <th scope="col">Alamat</th>
                    <th scope="col">Status Pembayaran</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {datas.map(field => (
                  <tr key={field.fullName}>
                    <th scope="row">
                      {field.fullName}
                    </th>
                    <td>Pria</td>
                    <td>
                      {field.address}
                    </td>
                    <td>
                      <Badge color="" className="mr-4 badge-dot">
                        <i className={classnames({
                          'bg-primary': field.paymentStatus === 'Selesai',
                          'bg-info': field.paymentStatus === 'Pending',
                          'bg-danger': field.paymentStatus === 'Dibatalkan',
                        })} />
                        {field.paymentStatus}
                      </Badge>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="mb-0 pagination justify-content-end"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CustomerDashboard;
