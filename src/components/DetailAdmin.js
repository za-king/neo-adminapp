import React ,{useState,useEffect}from 'react'
import { useParams, } from "react-router-dom";
import axios from 'axios';
import { CardBody, Button, Container, Table } from "reactstrap";
import {Link} from 'react-router-dom'
import moment from 'moment'

function DetailAdmin({Admin}) {
  const { id } = useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/auth/${id}`).then((res) => {
      setData(res.data);
    });
  }, []);

  return (

    <>
     <div>
        <CardBody>
          <Link to="/admin">
            <Button>Kembali</Button>
          </Link>
        </CardBody>
      </div>

     <Container>
      <div className="my-5">
      <Table bordered striped  >
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
    </>
    
  )
}

export default DetailAdmin