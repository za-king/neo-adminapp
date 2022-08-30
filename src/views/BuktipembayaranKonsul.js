import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { CardBody, Button, Container } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie';
import Header from "../components/Header";

function BuktiPembayaranKonsul() {
  const [data, setData] = useState([]);
  const [refresh , setRefresh] = useState(null)
  const cookies = new Cookies()
  const alert = (id) => Swal.fire({
    title: 'Apakah anda yakin?',
    
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, delete !'
  }).then((result) => {
    if (result.isConfirmed) {
      handleDelete(id)
    }
  })
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/buktikonsul`,{headers: {
      "accessToken":cookies.get('token')
    }}).then((res) => {
      setData(res.data);
    });
  }, [refresh]);
  const { SearchBar } = Search;
  const columns = [
    {
      dataField: "id",
      text: "ID",
      headerStyle: () => {
        return { width: "5%" };
      },
    },
    {
      dataField: "kode_order",
      text: "kode order",
    },
    {
      dataField: "nama_rekening_penerima",
      text: "nama rekening penerima",
    },
    {
      dataField: "no_rekening_penerima",
      text: "nomor rekening penerima",
    },
    {
      dataField: "link",
      text: "Action",
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={`/detailbuktikonsul/${row.id}`}>
              <Button color="dark" className="me-2">
                <FontAwesomeIcon icon={faInfo} /> Detail
              </Button>
            </Link>


            <Button color="dark" className="me-2" onClick={() => {
                alert(row.id)
              }}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          </div>
        );
      },
    },
  ];
  
  const handleDelete = (id) =>{
      axios.delete(`${process.env.REACT_APP_BASE_URL}/buktikonsul/${id}`).then(() =>{
        console.log("delete")
      })    
      setRefresh(id)
      
  }
  return (

    <>
    <Header/>
     <Container>
     <div>
          <CardBody></CardBody>
        </div>

        <ToolkitProvider
            keyField="id"
            data={data}
            columns={columns}
            
            search
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} />
                <hr />
                <BootstrapTable {...props.baseProps} pagination={paginationFactory()} />
              </div>
            )}
          </ToolkitProvider>
    </Container>
    
    </>
   
  );
}

export default BuktiPembayaranKonsul;
