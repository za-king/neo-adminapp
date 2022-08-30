import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { CardBody, Button, Container } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from "../components/Header";

function Admin() {
  const [data, setData] = useState([]);
  const [lock, setLock] = useState([]);
  const [refresh, setRefresh] = useState(null);
  const cookies = new Cookies();


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/auth`, {
        headers: {
          accessToken: cookies.get("token"),
        },
      })
      .then((res) => {
        setData(res.data);
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/lockregis`).then((res) => {
      setLock(res.data);
    });
  }, [refresh]);

  console.log([...lock]);

  const columns = [
    {
      dataField: "id",
      text: "ID",
      headerStyle: () => {
        return { width: "5%" };
      },
    },
    {
      dataField: "username",
      text: "Name",
    },
    {
      dataField: "link",
      text: "Action",
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={`/detailadmin/${row.id}`}>
              <Button color="dark" className="me-2">
                <FontAwesomeIcon icon={faInfo} /> Detail
              </Button>
            </Link>

            {/* 
            <Button color="dark" className="me-2" onClick={() => {
                alert(row.id)
              }}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button> */}
          </div>
        );
      },
    },
  ];

  // const handleDelete = (id) =>{
  //     axios.delete(`http://localhost:3004/auth/${id}`).then(() =>{
  //       console.log("delete")
  //     })
  //     setRefresh(id)

  // }

  const handleUpdateDisable = (v) => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/lockregis/1`, {
        disable: v,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setRefresh(v)
  };
  return (
    <>
      <Header />
      <Container>
        <div>
          <CardBody>
            {lock.map((item) =>{
              if(item.disable === true){
                return(<Button className="btn btn-success" onClick={() =>{handleUpdateDisable(false)}}>Buka Register</Button>)
              }else{

                return(<Button className="btn btn-danger" onClick={() =>{handleUpdateDisable(true)}}>Tutup Register</Button>)
                
              }
            })}
          </CardBody>
        </div>

        <BootstrapTable keyField="id" data={data} columns={columns} />
      </Container>
    </>
  );
}

export default Admin;
