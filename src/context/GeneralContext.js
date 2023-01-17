import React, { useEffect, useState, createContext } from "react";

import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { autoLogOffTime } from "../utils/AutoLogOffTime";
import axios from "axios";
import { baseApi } from "../utils/Api";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  let dateNowStart = new Date().setHours(0, 0, 0, 0);
  // const username = localStorage.getItem("username");
  // const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [reload, setReload] = useState(1);
  const [merchantData, setMerchantData] = useState([]);
  const [filterData, setFilterData] = React.useState({
    cashierName: "",
    merchantName: "",
    merchantID: "",
    dateStart: (new Date(dateNowStart).getTime() / 1000).toFixed(0),
    dateEnd: (new Date().getTime() / 1000).toFixed(0),
    // dateStart: (new Date().getTime() / 1000 + 86400 - 57600).toFixed(0),
    // dateEnd: (new Date().getTime() / 1000 + 86400 + 28799).toFixed(0),
  });

  const dateStart = new Date().setDate(-7);
  const [filterDashboard, setFilterDashboard] = React.useState({
    dateStart: (new Date(dateNowStart).getTime() / 1000).toFixed(0),
    dateEnd: (new Date().getTime() / 1000).toFixed(0),
  });

  const [filterTransaction, setFilterTransaction] = useState({
    dateStart: (new Date(dateNowStart).getTime() / 1000).toFixed(0),
    dateEnd: (new Date().getTime() / 1000).toFixed(0),
  });
  const [filterVisitor, setFilterVisitor] = useState({
    dateStart: (new Date(dateNowStart).getTime() / 1000).toFixed(0),
    dateEnd: (new Date().getTime() / 1000).toFixed(0),
  });
  const [filterPayment, setFilterPayment] = useState({
    dateStart: (new Date(dateNowStart).getTime() / 1000).toFixed(0),
    dateEnd: (new Date().getTime() / 1000).toFixed(0),
  });

  useEffect(() => {
    // if (token === null) {
    //   navigate("/admin");
    // }
  }, [reload, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData({ ...filterData, [name]: value });
  };

  const value = {
    token,
    // setUsername,
    // setRole,
    setReload,
    reload,
    handleChange,
    filterData,
    setFilterData,
    setFilterDashboard,
    filterDashboard,
    merchantData,
    setMerchantData,
  };

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
