import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Users from "./views/Users";
import Admin from "./views/Admin";
import Events from "./views/Events";
import Konsul from "./views/Konsul";
import Login from "./views/Login";
import Order from "./views/Order";
import AddEvent from "./components/AddEvent";
import EditAdmin from "./components/EditAdmin";
import DetailAdmin from "./components/DetailAdmin";
import DetailUser from "./components/DetailUser";
import EditEvent from "./components/EditEvent";
import DetailEvent from "./components/DetailEvent";
import DetailKonsul from "./components/DetailKonsul";
import DetailOrder from "./components/DetailOrder";
import BuktiPembayaranEvent from "./views/BuktiPembayaranEvent";
import DetailBuktiEvent from "./components/DetailBuktiEvent"
import BuktiPembayaranKonsul from "./views/BuktipembayaranKonsul";
import DetailBuktiKonsul from "./components/DetailBuktiKonsul"
import ProtectedRoute from "./protectroute/ProtectedRoute";
import RegisterAdmin from "./views/RegisterAdmin";

function App() {



  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="registeradmin" element={<RegisterAdmin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="addevents" element={<AddEvent />} />
          <Route path="events/detailevent/:id" element={<DetailEvent />} />
          <Route path="editevent/:id" element={<EditEvent />} />

          <Route path="konsul" element={<Konsul />} />

          <Route path="orders" element={<Order />} />
          <Route path="orders/detailorder/:id" element={<DetailOrder />} />
          <Route path="konsul/detailkonsul/:id" element={<DetailKonsul />} />

          <Route path="users" element={<Users />} />

          <Route path="detailuser/:id" element={<DetailUser />} />

          <Route path="admin" element={<Admin />} />
         
          <Route path="editadmin/:id" element={<EditAdmin />} />
          <Route path="detailadmin/:id" element={<DetailAdmin/>} />

          <Route path="buktipembayaranevent" element={<BuktiPembayaranEvent />} />
          <Route path="detailbuktievent/:id" element={<DetailBuktiEvent/>} />

          <Route path="buktipembayarankonsul" element={<BuktiPembayaranKonsul />} />
          <Route path="detailbuktikonsul/:id" element={<DetailBuktiKonsul/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
