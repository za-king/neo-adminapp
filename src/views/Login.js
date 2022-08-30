import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const navigate = useNavigate();
  const data = {
    username: username,
    password: password,
  };
  const handleLogin = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, data).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        cookies.set("token", response.data.accesToken, { path: "/" });
        console.log(response.data);
        return navigate("/");
      }
    });
  };

  return (
    <div className="border border-4 border-dark container m-auto mt-5" style={{width : "500px"}}>
      <Form inline>
        <p class="text-center fs-4">Login Admin</p>

        <div className="">
          <FormGroup>
            <Label for="exampleUsername">Username</Label>
            <Input
              id="exampleUsername"
              name="username"
              placeholder="jesica"
              type="text"
              autoComplete="none"
              onChange={(x) => {
                setUserName(x.target.value);
              }}
            />
          </FormGroup>
        </div>

        <div className="">
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
              onChange={(x) => {
                setPassword(x.target.value);
              }}
            />
          </FormGroup>
        </div>

        <Button onClick={handleLogin}>Login</Button>
      </Form>
    </div>
  );
}

export default Login;
