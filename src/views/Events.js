import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faEdit,
  faTrash,
  
} from "@fortawesome/free-solid-svg-icons";
import { CardBody, Button, Container, Input, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'
import Header from "../components/Header";

function Events() {
  const [data, setData] = useState([]);
  const [refresh , setRefresh] = useState(null)

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
    axios.get(`${process.env.REACT_APP_BASE_URL}/events`).then((res) => {
      setData(res.data);
      console.log()
    });
  }, [refresh]);
  const columns = [
    {
      dataField: "id",
      text: " ID",
      headerStyle: () => {
        return { width: "5%" };
      },
    },
    {
      dataField: "event_name",
      text: "Nama Event",
      headerStyle: () => {
        return { width: "20%" };
      },
    },
    {
      dataField: "price",
      text: "Harga",
      headerStyle: () => {
        return { width: "10%" };
      },
      formatter: (rowContent, row) => {
        return (<div>Rp{row.price}</div>)}
    },
    {
      dataField: "date",
      text: "Tanggal",
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      dataField: "disable",
      text: "Status",
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            {row.disable ? (
              <Badge color="danger">disable</Badge>
            ) : (
              <Badge color="success">active</Badge>
            )}
          </div>
        );
      },
    },
    {
      dataField: "disable",
      text: "disabled",
      headerStyle: () => {
        return { width: "10%" };
      },
      formatter: (rowContent, row) => {
        return (<Input
          type="checkbox"
          color="red"
          className="me-4"
          checked={row.disable}
          onChange={(v) => {
            handleUpdateDisable(row.id, v);
          }}
        />)}
    },
    {
      dataField: "link",
      text: "Action",
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={`detailevent/${row.id}`}>
              <Button color="dark" className="me-2">
                <FontAwesomeIcon icon={faInfo} /> Detail
              </Button>
            </Link>

            <Link to={`/editevent/${row.id}`}>
              <Button color="dark" className="me-2">
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
            </Link>

            <Button
              color="dark"
              className="me-2"
              onClick={() => {
                alert(row.id)
              }}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/events/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      setRefresh(id)
      
  };

  const handleUpdateDisable = (id, v) => {
    console.log(v.target.checked);
    console.log(id);
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/events/${id}`, {
        disable: v.target.checked,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setRefresh(v);
  };

  return (

    <>
    <Header/>
     <div>
      <Container>
        <CardBody className="">
          <Link to="/addevents">
            <Button>Tambah Event</Button>
          </Link>
        </CardBody>
        <BootstrapTable keyField="id" data={data} columns={columns} pagination={ paginationFactory() }/>
      </Container>
    </div>
    </>
   
  );
}

export default Events;
