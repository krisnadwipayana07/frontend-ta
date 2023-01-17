import React, { useState, useContext, useRef } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ResponsiveAppBar from "../../components/appbar/ResponsiveAppBar";

import { GeneralContext } from "../../context/GeneralContext";
import axios from "axios";
import { baseApi } from "../../utils/Api";
import Loading from "../../components/loading";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { autoLogOffTime } from "../../utils/AutoLogOffTime";
import sweetAlert from "sweetalert";

export default function Ticket() {
  const [values, setValues] = useState({
    id_sales: 0,
    id_user: 0,
    visi_datetime: "",
    id_merchant: 0,
    sale_address: "",
    ticket_taken: 0,
    sale_status: 0,
    jumlah: 0,
  });

  const { filterData, setMerchantData } = useContext(GeneralContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const { reload, setReload } = React.useContext(GeneralContext);
  const [open, setOpen] = React.useState(false);

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const endPointMerchant = "/v1/merchant";

  const endPoint = "/v1/useradmin/login";
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios
    //   .post(baseApi +"/v1/band/ticket",{
    //     saleAddress:values.saleAddress,
    //     qr:values.qr
    //   })
    //   .then((res) => {
    //     localStorage.setItem("ticket",JSON.stringify(res.data.data))
    //     navigate("/qr-gelang")
    //     console.log(res.data.data)
    //   })
    //   .catch((err) => {
    //     setOpen(true)
    //     setErrorMessage(true);
    //     console.log(err.response.data.data)
    //     console.log(values.saleAddress)
    //   });
    navigate("/scan-gelang");
  };

  React.useEffect(() => {
    setTimeout(() => {
      const decode = jwt_decode(localStorage.getItem("token"));

      console.log(decode);

      axios.post(baseApi + "/v1/band/logout", {
        id: `${decode.ID}`,
        islogin: 0,
      });

      localStorage.removeItem("isLogin");
      localStorage.removeItem("token");
      setReload(reload + 1);
      sweetAlert({
        title: "Session Timeout",
        text: "Your session has timeout, please login again",
        icon: "warning",
      });
    }, autoLogOffTime);
    axios
      .get(baseApi + endPointMerchant, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setMerchantData(res.data.data);
        console.log("merchant", res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("merchant", err);
        setIsLoading(false);
      });

    const ticket = JSON.parse(localStorage.getItem("ticket"));
    values.id_sales = ticket.id_sales;
    values.id_user = ticket.id_user;
    values.visi_datetime = ticket.visi_datetime;
    values.id_merchant = ticket.id_merchant;
    values.sale_address = ticket.sale_address;
    values.ticket_taken = ticket.ticket_taken;
    values.sale_status = ticket.sale_status;
    values.jumlah = ticket.jumlah;

    console.log(JSON.parse(localStorage.getItem("ticket")));
    console.log(values);
  }, []);

  const paperStyle = {
    padding: "30px 30px",
    width: 300,
    margin: "30px auto",
    borderRadius: "10px",
  };

  return (
    <div>
      <ResponsiveAppBar>
        <Box>
          <Container>
            <Typography
              component="h1"
              variant="h4"
              sx={{ mt: 4, color: "#3D734D" }}
              align="center"
            >
              <strong>Scan Gelang</strong>
            </Typography>
            <Grid>
              <Paper elevation={12} style={paperStyle}>
                <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
                  <Typography component="h1" variant="h4" align="center">
                    <strong>Ticket</strong>
                  </Typography>
                  <TextField
                    disabled
                    label="Id Sales"
                    margin="normal"
                    fullWidth
                    id="outlined-sales"
                    value={values.id_sales}
                    onChange={handleChange("id_sales")}
                    autoFocus
                  />
                  <TextField
                    disabled
                    label="Id User"
                    margin="normal"
                    fullWidth
                    id="outlined-user"
                    value={values.id_user}
                    onChange={handleChange("id_user")}
                    autoFocus
                  />
                  <TextField
                    disabled
                    label="Id Merchant"
                    margin="normal"
                    fullWidth
                    id="outlined-merchant"
                    value={values.id_merchant}
                    onChange={handleChange("id_merchant")}
                    autoFocus
                  />
                  <TextField
                    disabled
                    label="Sale Address"
                    margin="normal"
                    fullWidth
                    id="outlined-sale-address"
                    value={values.sale_address}
                    onChange={handleChange("sale_address")}
                    autoFocus
                  />
                  <TextField
                    disabled
                    label="Ticket Status"
                    margin="normal"
                    fullWidth
                    id="outlined-ticket-status"
                    value={
                      values.ticket_taken === 0
                        ? "Belum Digunakan"
                        : values.ticket_taken === 1
                        ? "Sudah Digunakan"
                        : "Sudah Dipindai"
                    }
                    onChange={handleChange("ticket_taken")}
                    autoFocus
                  />
                  <TextField
                    disabled
                    label="Transaksi Status"
                    margin="normal"
                    fullWidth
                    id="outlined-sale-status"
                    value={
                      values.sale_status === 0
                        ? "Belum Di Bayar"
                        : values.sale_status === 1
                        ? "Sudah Di Bayar"
                        : values.sale_status === 2
                        ? "Transaksi Dibatalkan"
                        : "Transaksi Dibatalkan"
                    }
                    onChange={handleChange("sale_status")}
                    autoFocus
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: "#3D734D" }}
                  >
                    Kembali
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Container>
        </Box>
        <Snackbar
          sx={{ height: "5%" }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            variant="filled"
            severity="error"
            sx={{ width: "100%" }}
          >
            Tiket Tidak Ditemukan
          </Alert>
        </Snackbar>
      </ResponsiveAppBar>
      <Loading loading={isLoading} />
    </div>
  );
}
