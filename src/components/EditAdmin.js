import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

function EditAdmin() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newURole, setNewRole] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/auth/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  const handleNewUserName = (e) => {
    setNewUsername(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleNewRole = (e) => {
    setNewRole(e.target.value);
  };

  const handleEdit = () => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/auth/${id}`, {
        username: newUsername,
        password: newPassword,
        role: newURole,
      })
      .then((response) => {
        console.log(response.data);
      });
  };
  return (
    <Container>
      
        <Form inline>
          <FormGroup>
            <Label for="exampleUsername" hidden>
              username
            </Label>
            <Input
              type="text"
              name="username"
              id="exampleusername"
              placeholder={data.username}
              onChange={handleNewUserName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword" hidden>
              Password
            </Label>
            <Input
              type="text"
              name="password"
              id="examplePassword"
              onChange={handleNewPassword}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Role</Label>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              onChange={handleNewRole}
            >
              <option>admin</option>
              <option>moderator</option>
            </Input>
          </FormGroup>
          <Button onClick={handleEdit}>Submit</Button>
        </Form>
      
    </Container>
  );
}

export default EditAdmin;
