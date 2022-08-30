import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Table, Button,
  CardBody, } from "reactstrap";
import {Link} from 'react-router-dom'
import moment from "moment";

function DetailOrder() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders/byId/${id}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div>
        <div>
        <CardBody>
          <Link to="/orders">
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
                <td>Nama</td>
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
                <td>Name Event</td>
                <td>{data.Event && data.Event.event_name}</td>
              </tr>
              <tr>
                <td>Cover gambar</td>
                <td>
                  <img
                    src={data.Event && data.Event.url}
                    alt="gambar"
                    width={300}
                  />
                </td>
              </tr>
              <tr>
                <td>Tanggal</td>
                <td>{moment(data.Event && data.Event.date).format("LL")}</td>
              </tr>
              <tr>
                <td>Mulai</td>
                <td>
                  {moment(data.Event && data.Event.started_at).format("LT")}
                </td>
              </tr>
              <tr>
                <td>Berakhir</td>
                <td>
                  {moment(data.Event && data.Event.finish_at).format("LT")}
                </td>
              </tr>
              <tr>
                <td>Harga</td>
                <td>Rp.{data.Event && data.Event.price}</td>
              </tr>
              <tr>
                <td>Pembicara</td>
                <td>{data.Event && data.Event.speakers}</td>
              </tr>
              <tr>
                <td>Role Pembicara</td>
                <td>{data.Event && data.Event.speakers_job}</td>
              </tr>
              <tr>
                <td>Perusahaan Pembicara</td>
                <td>{data.Event && data.Event.speakers_company}</td>
              </tr>
              <tr>
                <td>Deskripsi</td>
                <td>{data.Event && data.Event.description}</td>
              </tr>
              
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default DetailOrder;
