import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardBody, Button, Container, Input, Badge } from "reactstrap";
import { faInfo, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../components/Header";

function Konsul() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(null);

  const alert = (id) =>
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, delete !",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/konsuls`).then((res) => {
      setData(res.data);
    });
  }, [refresh]);

  const { SearchBar } = Search;
  const columns = [
    
    {
      dataField: "nama",
      text: "nama",
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      dataField: "email",
      text: "email",
      headerStyle: () => {
        return { width: "25%" };
      },
    },
    {
      dataField: "nomor_wa",
      text: "nomor Hp",
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      dataField: "uuid",
      text: "Kode Order",
      sort: true,
      headerStyle: () => {
        return { width: "20%" };
      },
    },
    {
      dataField: "isComplete",
      text: "Status",
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            {row.isComplete ? (
              <Badge color="success">Sudah Bayar</Badge>
            ) : (
              <Badge color="danger">Belum Bayar</Badge>
            )}
          </div>
        );
      },
    },
    {
      dataField: "link",
      text: "Action",
      formatter: (rowContent, row) => {
        return (
          <div>
            <Input
              type="checkbox"
              color="red"
              className="me-4"
              checked={row.isComplete}
              onChange={(v) => {
                handleUpdateStatus(row.id, v);
              }}
            />
            <Link to={`detailkonsul/${row.id}`}>
              <Button color="dark" className="me-2">
                <FontAwesomeIcon icon={faInfo} /> Detail
              </Button>
            </Link>

            <Button
              color="dark"
              className="me-2"
              onClick={() => {
                alert(row.id);
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
      .delete(`${process.env.REACT_APP_BASE_URL}/konsuls/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setRefresh(id);
  };
  const handleUpdateStatus = (id, v) => {
    console.log(v.target.checked);
    console.log(id);
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/Konsuls/byId/${id}`, {
        isComplete: v.target.checked,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setRefresh(id);
  };

  return (
    <>
      <Header />
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

export default Konsul;
