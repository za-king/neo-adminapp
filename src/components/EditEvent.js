import React,{useEffect,useState} from 'react'
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
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function EditEvent() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  moment(String);


  const [namaEvent, setNamaEvent] = useState("");
  const [image, setImage] = useState(null);
  const [tanggal, setTanggal] = useState(null);
  const [mulai, setMulai] = useState(null);
  const [berakhir, setBerakhir] = useState(null);
  const [harga, setHarga] = useState("");
  const [pembicara, setPembicara] = useState("");
  const [rolePembicara, setRolePembicara] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const navigate = useNavigate()
  
  const alert = () =>Swal.fire({
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })


  useEffect(() => {

    async function fetchData() {
      const res = await  axios.get(`${process.env.REACT_APP_BASE_URL}/events/byId/${id}`)
      setNamaEvent(res.data.event_name);
      setImage(res.data.url);
      setTanggal(res.data.date);
      setMulai(res.data.started_at)
      setBerakhir(res.data.finish_at)
      setHarga(res.data.price)
      setPembicara(res.data.speakers)
      setRolePembicara(res.data.speakers_job)
      setPerusahaan(res.data.speakers_company)
      setDeskripsi(res.data.description);

      console.log(res.data)
    }
   fetchData()
},[]);

 
  

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
    formdata.append('image',image)
    formdata.append('disable',false)

    axios
      .put(`${process.env.REACT_APP_BASE_URL}/events/${id}`, formdata)
      .then((res) => {
        console.log(res.data);
        alert();
        navigate('/events')
      }).catch((err) =>{
        console.log(err)
      })
  };

  console.log(mulai)
  return (
    <div>
       <div>
      <div>
        <CardBody>
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
                name="event_name"
                value={namaEvent}
                type="text"
                onChange={handleNamaEvent}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="exampleImage">Cover Image</Label>
              {/* <div><img src={image} alt="edit" width={100} /></div> */}

              <Input
                id="exampleNamaImage"
                name="image"
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
              name="date"
              type="date"
              value={moment(tanggal).format("YYYY-MM-DD")}
              onChange={handleTanggal}
            />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleMulai">Mulai</Label>
            <Input
              id="exampleMulai"
              name="started_at"
              type="time"
              value={mulai}
              onChange={handleMulai}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleBerakhir">Berakhir</Label>
            <Input
              id="exampleBerakhir"
              name="finish_at"
              type="time"
              value={berakhir}
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
                name='price'
                value={harga}
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
                name='speakers'
                value={pembicara}
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
                name='speakers_job'
                value={rolePembicara}
                onChange={handleRolePembicara}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="exampleCompany">perusahaan pembicara</Label>
              <Input
                id="examplecompany"
                type="text"
                name='speakers_company'
                value={perusahaan}
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
                name="description"
                id="exampleText"
                value={deskripsi}
                onChange={handleDeskripsi}
              />
            </FormGroup>
          </Col>
          <FormGroup></FormGroup>
        </Row>

        <Button onClick={handleCreate} >Edit</Button>
      </Form>
    </div>
    </div>
  )
}

export default EditEvent