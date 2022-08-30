import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CardBody, Button, Container, Input, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../components/Header";

function Order() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(null);
  console.log(data);

  const alert = (id) =>
    Swal.fire({
      title: "Apakah anda yakin?",

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
    axios.get("http://localhost:3004/orders").then((res) => {
      setData(res.data);
    });
  }, [refresh]);

  const { SearchBar } = Search;
  const columns = [
    {
      dataField: "id",
      text: "no",
      sort: true,
      headerStyle: () => {
        return { width: "5%" };
      },
    },
    {
      dataField: "User.username",
      text: "Name",
      sort: true,
      headerStyle: () => {
        return { width: "15%" };
      },
    },

    {
      dataField: "Event.event_name",
      text: "Event Name",
      sort: true,
      headerStyle: () => {
        return { width: "20%" };
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

            <Link to={`detailorder/${row.id}`}>
              <Button color="dark" className="me-4">
                <FontAwesomeIcon icon={faInfo} /> Detail
              </Button>
            </Link>

            <Button
              color="dark"
              className="me-4"
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
      .delete(`${process.env.REACT_APP_BASE_URL}/orders/${id}`)
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
      .put(`${process.env.REACT_APP_BASE_URL}/orders/${id}`, {
        isComplete: v.target.checked,
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
      <Header />
      <Container>
        <div>
          <CardBody></CardBody>
        </div>
        <div>
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
        </div>
      </Container>
    </>
  );
}

export default Order;
