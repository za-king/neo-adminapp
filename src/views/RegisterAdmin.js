import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Swal from "sweetalert2";
function RegisterAdmin() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [lock, setLock] = useState([]);
  const data = {
    username: username,
    password: password,
    role: role,
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/lockregis`).then((res) => {
      setLock(res.data);
    });
  }, []);

  const handleRegister = () => {
    if(username === "" && password === ""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'anda tidak mengisi username dan password!',
      })
    }else{
      Swal.fire({
        icon: 'success',
        title: 'Berhasil Melakukan Registrasi',
        showConfirmButton: false,
        timer: 1500
      })
      axios.post(`${process.env.REACT_APP_BASE_URL}/auth`, data).then((res) => {
      console.log(res);
    });
    }

    
  };

  return (
    <div>
      <div className="container text-center">
        <div className="row">
          <div className="col"></div>

          {lock.map((item) => {
            if (item.disable === true) {
              return <div className="fs-5 my-5">register ditutup</div>;
            } else {
              return (
                <div className="col border border-5 rounded border-dark mt-5  ">
                  <div className="mt-5">REGISTER</div>
                  <Form inline>
                    <FormGroup>
                      <Label for="exampleUsername" hidden>
                        username
                      </Label>
                      <Input
                        type="text"
                        name="username"
                        id="exampleusername"
                        placeholder="username"
                        onChange={(x) => {
                          setUserName(x.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword" hidden>
                        Password
                      </Label>
                      <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="Password"
                        onChange={(x) => {
                          setPassword(x.target.value);
                        }}
                      />
                    </FormGroup>

                    <Button onClick={handleRegister}>REGISTER</Button>
                    <p className="pt-5 ">kembali ke halaman <a href="/login">Login</a> </p>
                  </Form>
                </div>
              ); 
            }
          })}
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default RegisterAdmin;
