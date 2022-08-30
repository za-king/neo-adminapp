import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate,Link } from 'react-router-dom';

import { Logout } from '../views/Logout';

function Header() {

  const navigate = useNavigate()

  const handleLogout =() =>{
    Logout()

    return navigate('/login')

  }
  return <>
  <Navbar bg="warning" variant="dark">
    <Container>
      <Navbar.Brand href="/">Neo People</Navbar.Brand>
      <Nav className=" justify-content-end">
        <Link to='/'  className='text-decoration-none text-white mx-2'>Home</Link>
        <Link to='/events'  className='text-decoration-none text-white mx-2'>Event</Link>
        <Link to='/konsul'  className='text-decoration-none text-white mx-2'>Orders Konsultasi</Link>
        <Link to='/orders'  className='text-decoration-none text-white mx-2'>Orders Event</Link>
        <Link to='/buktipembayaranevent'  className='text-decoration-none text-white mx-2'>Bukti Pembayaran Event</Link>
        <Link to='/buktipembayarankonsul'  className='text-decoration-none text-white mx-2'>Bukti Pembayaran Konsul</Link>
        <Link to='/users'  className='text-decoration-none text-white mx-2'>Users</Link>
        <Link to='/admin' className='text-decoration-none text-white mx-2 '>Admin</Link>
        <div onClick={handleLogout }  className='text-decoration-none text-dark mx-2 pointer' >Logout</div>
        
        
      </Nav>
    </Container>
  </Navbar>
</>;
}

export default Header;
