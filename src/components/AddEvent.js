import React, { useState } from "react";

import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  CardBody,
} from "reactstrap";
import "../styles/addEventStyle.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom';



function AddEvent() {
  const [namaEvent, setNamaEvent] = useState("");
  const [image, setImage] = useState();
  const [tanggal, setTanggal] = useState("");
  const [mulai, setMulai] = useState("");
  const [berakhir, setBerakhir] = useState("");
  const [harga, setHarga] = useState("");
  const [pembicara, setPembicara] = useState("");
  const [rolePembicara, setRolePembicara] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kuota, setKuota] = useState("");

  const navigate = useNavigate()
  
  const alert = () =>Swal.fire({
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })

  const getFileInfo = (e) => {
    //NOTE THE ADDITION OF 'e' PARAMETER
    console.log("File info working!");

    const file = e.target.files[0]
    console.log(file)
    setImage(file)
  };

  
  const handleNamaEvent = (e) =>{
    const result = e.target.value
    setNamaEvent(result)
    console.log(result)
  }

  const handleTanggal = (e) =>{
    const result = e.target.value
    setTanggal(result)
    console.log(result)
  }

  const handleMulai = (e) =>{
    const result = e.target.value
    setMulai(result)
    console.log(result)
  }

  const handleBerakhir = (e) =>{
    const result = e.target.value
    setBerakhir(result)
    console.log(result)
  }

  const handlePembicara = (e) =>{
    const result = e.target.value
    setPembicara(result)
    console.log(result)
  }

  const handlePerusahaan = (e) =>{
    const result = e.target.value
    setPerusahaan(result)
    console.log(result)
  }
  const handleHarga = (e) =>{
    const result = e.target.value
    setHarga(result)
    console.log(result)
  }
  const handleRolePembicara = (e) =>{
    const result = e.target.value
    setRolePembicara(result)
    console.log(result)
  }
  const handleDeskripsi = (e) =>{
    const result = e.target.value
    setDeskripsi(result)
    console.log(result)
  }

  const handleKuota = (e) =>{
    const result = e.target.value
    setKuota(result)
    console.log(result)
  }



  const handleCreate = (e) => {
    const formdata = new FormData()

    formdata.append('event_name',namaEvent)
    formdata.append('date',tanggal)
    formdata.append('started_at',mulai)
    formdata.append('finish_at',berakhir)
    formdata.append('price',harga)
    formdata.append('speakers',pembicara)
    formdata.append('speakers_job',rolePembicara)
    formdata.append('speakers_company',perusahaan)
    formdata.append('description',deskripsi)
    formdata.append('order_limit',kuota)
    formdata.append('image',image)
    formdata.append('disable',false)

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/events`, formdata)
      .then((res) => {
        alert()
      }).catch((err) =>{
        console.log(err)
      })

      navigate('/events')
  };

  return (
    <div>
      <div >
        <CardBody >
          <Link to="/events">
            <Button>Kembali</Button>
          </Link>
        </CardBody>
      </div>
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleNamaEvent">Nama Event</Label>
              <Input
                id="exampleNamaEvent"
                name="NamaEvent"
                placeholder="Nama Event"
                type="text"
                onChange={handleNamaEvent}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="exampleImage">Cover Image</Label>

              <Input
                id="exampleNamaImage"
                name="Image"
                type="file"
                onChange={getFileInfo}
              />
            </FormGroup>
          </Col>
        </Row>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleImage">Tanggal</Label>
            <Input
              id="exampleTanggal"
              name="tanggal"
              type="date"
              onChange={handleTanggal}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleMulai">Mulai</Label>
            <Input
              id="exampleMulai"
              name="mulai"
              type="time"
              onChange={handleMulai}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleBerakhir">Berakhir</Label>
            <Input
              id="exampleBerakhir"
              name="berakhir"
              type="time"
              onChange={handleBerakhir}
            />
          </FormGroup>
        </Col>
        <Row form>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleHarga">Harga</Label>
              <Input
                id="exampleHarga"
                type="text"
                onChange={handleHarga}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="examplePembicara">Pembicara</Label>
              <Input
                id="examplePembicara"
                type="text"
                onChange={handlePembicara}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleRolePembicara">Role Pembicara</Label>
              <Input
                id="exampleRolePembicara"
                type="text"
                onChange={handleRolePembicara}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleCompany">perusahaan pembicara</Label>
              <Input
                id="examplecompany"
                type="text"
                onChange={handlePerusahaan}
              />
            </FormGroup>
          </Col>
          <Col sm={8}>
            <FormGroup>
              <Label for="exampleText" sm={2}>
                Descripsi
              </Label>

              <Input
                type="textarea"
                name="text"
                id="exampleText"
                onChange={handleDeskripsi}
              />
            </FormGroup>
          </Col>
          <FormGroup>
          <Col sm={8}>
            <FormGroup>
              <Label for="exampleText" sm={2}>
                Kuota
              </Label>

              <Input
                type="tex"
                name="text"
                id="exampleText"
                onChange={handleKuota}
              />
            </FormGroup>
          </Col>
          </FormGroup>
        </Row>

        <Button onClick={handleCreate}>Tambah</Button>
      </Form>
    </div>
  );
}

export default AddEvent;
