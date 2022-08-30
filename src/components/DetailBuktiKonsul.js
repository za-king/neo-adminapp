import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CardBody, Button, Container, Table } from "reactstrap";
import {Link} from 'react-router-dom'


function DetailBuktiKonsul() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/buktikonsul/byId/${id}`).then((res) => {
      setData(res.data);
    });
  }, []);



  return (
    <div>
       <div>
        <CardBody>
          <Link to="/buktipembayarankonsul">
            <Button>Kembali</Button>
          </Link>
        </CardBody>
      </div>
      <Container>
        <div className="my-5">
          <Table bordered striped>
            <thead>
              <tr>
                <th>gambar</th>
                <th>kode order</th>
                <th>nama rekening pengirim</th>
                <th>no rekening pengirim</th>
                <th>nama rekening penerima</th>
                <th>no rekening penerima</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src={data.url} alt="detail" width={200}/></td>
                <td>{data.kode_order}</td>
                <td>{data.nama_rekening_pengirim}</td>
                <td>{data.no_rekening_pengirim}</td>
                <td>{data.nama_rekening_penerima}</td>
                <td>{data.no_rekening_penerima}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default DetailBuktiKonsul;
