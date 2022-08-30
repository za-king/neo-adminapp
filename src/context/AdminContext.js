import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext()


export function AdminProvider({children}) {
    const value = {name:"zaky"}
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  )
}
