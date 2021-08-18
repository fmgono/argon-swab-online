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
import { Link } from "react-router-dom";
import Header from "components/Headers/CRUDHeader";
import classnames from "classnames";
import { useState } from "@hookstate/core";
import { useEffect } from "react";
import axios from '../../axios'
import { useAuthState } from '../../store/auth'

const BookingOrder = () => {
  // const { user } = useAuthState()
  const filter = useState('completed')
  const bookingOrder = useState({
    totalRows: 0,
    data: [
      {
        customer_full_name: '',
        session_date: '',
        session_time: '',
        session_name: '',
        payment_status : '',
      }
    ]
  })

  useEffect(() => {
    const getBookingOrder = async () => {
      const { data } = await axios.get(`order/10`)
      data.data = data.data.map(field => {
        const date = new Date(field.session_date)
        field.session_date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        return field
      })
      bookingOrder.set({
        totalRows: data.total_rows,
        data: data.data
      })
    }

    getBookingOrder()
  }, [])
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
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nama</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Waktu</th>
                    <th scope="col">Bertemu dengan</th>
                    <th scope="col">Status Pembayaran</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {bookingOrder.value.data.map(field => (
                  <tr key={field.customer_full_name}>
                    <th scope="row">
                      {field.customer_full_name}
                    </th>
                    <td>{field.session_date}</td>
                    <td>
                      {field.session_time}
                    </td>
                    <td>
                      {field.session_name}
                    </td>
                    <td>
                      <Badge color="" className="mr-4 badge-dot">
                        <i className={classnames({
                          'bg-primary': field.payment_status === 'Selesai',
                          'bg-info': field.payment_status === 'PENDING',
                          'bg-danger': field.payment_status === 'Dibatalkan',
                        })} />
                        {field.payment_status}
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

export default BookingOrder;
