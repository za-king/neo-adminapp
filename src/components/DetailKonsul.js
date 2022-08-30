import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Table, Button, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

function DetailKonsul() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/konsuls/byId/${id}`).then((res) => {
      setData(res.data);
    });
  }, []);
  console.log(data);
  return (
    <div>
      
      <div>
        <CardBody>
          <Link to="/konsul">
            <Button>Kembali</Button>
          </Link>
        </CardBody>
      </div>
      <Container>
        <div className="my-5">
          <Table bordered striped>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nama User</td>
                <td>{data.User && data.User.username}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
      <Container>
        <div className="my-5">
          <Table bordered striped>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nama</td>
                <td>{data.nama}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{data.email}</td>
              </tr>
              <tr>
                <td>No Wa</td>
                <td>{data.nomor_wa}</td>
              </tr>
              <tr>
                <td>Jenis Kelamin</td>
                <td>{data.jenis_kelamin}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default DetailKonsul;
