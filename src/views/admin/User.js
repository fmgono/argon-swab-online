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

const UserList = () => {
  // const { user } = useAuthState()
  const filter = useState('completed')
  const users = useState({
    totalRows: 0,
    data: [
      {
        full_name: '',
        email: '',
        sex: '',
        phone_number: '',
      }
    ]
  })

  useEffect(() => {
    const getUserList = async () => {
      const { data } = await axios.get(`users/10`)
      data.data = data.data.map(field => {
        field.phone_number = `${field.mobile_country_code}${field.mobile}`
        return field
      })
      users.set({
        totalRows: data.total_rows,
        data: data.data
      })
    }

    getUserList()
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
                <h3 className="">Daftar Pengguna</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nama</th>
                    <th scope="col">Email</th>
                    <th scope="col">No HP</th>
                    <th scope="col">Jenis Kelamin</th>
                  </tr>
                </thead>
                <tbody>
                  {users.value.data.map(field => (
                  <tr key={field.id}>
                    <th scope="row">
                      {field.full_name}
                    </th>
                    <td>{field.email}</td>
                    <td>
                      {field.phone_number}
                    </td>
                    <td>
                      {field.sex}
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

export default UserList;
