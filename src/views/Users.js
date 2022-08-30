import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faEdit,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { CardBody, Button, Container } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../components/Header";

function Users() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(null);

  // const alert = (id) =>
  //   Swal.fire({
  //     title: "Apakah anda yakin?",

  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Ya, delete !",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       handleDelete(id);
  //     }
  //   });

  useEffect(() => {
    axios.get("http://localhost:3004/users/auth").then((res) => {
      setData(res.data);
    });
  }, [refresh]);
  const { SearchBar } = Search;
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      headerStyle: () => {
        return { width: "5%" };
      },
    },
    {
      dataField: "username",
      text: "Name",
      sort: true,
    },
    {
      dataField: "link",
      text: "Action",
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={`/detailuser/${row.id}`}>
              <Button color="dark" className="me-4">
                <FontAwesomeIcon icon={faInfo} /> Detail
              </Button>
            </Link>


            
              {/* <Button
                color="dark"
                className="me-4"
                onClick={() => {
                  alert(row.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </Button> */}
            
          </div>
        );
      },
    },
  ];

  // const handleDelete = (id) => {
  //   axios
  //     .delete(`http://localhost:3004/users/auth/${id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setRefresh(id);
  // };

  return (
    <>
    <Header/>
    <Container>
      <div>
        <CardBody>
          
        </CardBody>
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

export default Users;
