import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CardBody, Button, Container, Table } from "reactstrap";
import {Link} from 'react-router-dom'
function DetailUser() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/users/auth/${id}`).then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div>
       <div>
        <CardBody>
          <Link to="/users">
            <Button>Kembali</Button>
          </Link>
        </CardBody>
      </div>
      <Container>
        <div className="my-5">
          <Table bordered striped>
            <thead>
              <tr>
                <th>Nama</th>
                <th>password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.username}</td>
                <td>{data.password}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default DetailUser;
