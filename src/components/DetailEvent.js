import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {  Container, Table } from "reactstrap";
import moment from 'moment'
function DetailEvent() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/events/byId/${id}`).then((res) => {
      setData(res.data);
    });
  }, []);

  

  return (
    <Container>
      <div className="my-5">
      <Table bordered striped  >
        <thead>
          <tr>
            
            <th>Title</th>
            <th>Content</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td>Name Event</td>
            <td>{data.event_name}</td>
            
          </tr>
          <tr>
            
            <td>Cover gambar</td>
            <td><img src={data.url} alt="gambar" width={300}  /></td>
            
          </tr>
          <tr>
            
            <td>Tanggal</td>
            <td>{moment(data.date).format('LL')}</td>
            
          </tr>
          <tr>
            
            <td>Mulai</td>
            <td>{moment(data.started_at, "HH:mm:ss").format("hh:mm A")}</td>
            
          </tr>
          <tr>
            
            <td>Berakhir</td>
            <td>{moment(data.finish_at, "HH:mm:ss").format("hh:mm A")}</td>
            
          </tr>
          <tr>
            
            <td>Harga</td>
            <td>Rp.{data.price}</td>
            
          </tr>
          <tr>
            
            <td>Pembicara</td>
            <td>{data.speakers}</td>
            
          </tr>
          <tr>
            
            <td>Role Pembicara</td>
            <td>{data.speakers_job}</td>
            
          </tr>
          <tr>
            
            <td>Perusahaan Pembicara</td>
            <td>{data.speakers_company}</td>
            
          </tr>
          <tr>
            
            <td>Deskripsi</td>
            <td>{data.description}</td>
            
          </tr>
          <tr>
            
            <td>Kuota</td>
            <td>{data.order_limit}</td>
            
          </tr>
        </tbody>
      </Table>

      </div>
     
    </Container>
  );
}

export default DetailEvent;
