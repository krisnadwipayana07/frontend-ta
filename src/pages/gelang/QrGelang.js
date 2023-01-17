import React, { useState, useContext } from "react";
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

export default function QrGelang() {
  const [values, setValues] = useState({
    saleAddress: "",
    qrGelang: "",
  });

  const { filterData, setMerchantData } = useContext(GeneralContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [saleAddress, setSaleAddress] = useState("");
  const { reload, setReload } = React.useContext(GeneralContext);
  const saleRef = React.useRef(saleAddress);
  const [open, setOpen] = React.useState(false);
  const [isError, setError] = useState(false);

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const setSaleAdd = (data) => {
    saleRef.current = data;
    setSaleAddress(data);
  };

  const endPointMerchant = "/v1/merchant";

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(baseApi + `/v1/band/qr`, {
        saleAddress: saleRef.current,
        QrBand: values.qrGelang,
      })
      .then((res) => {
        setOpen(true);
        console.log(res.data.data);
      })
      .catch((err) => {
        setOpen(true);
        setErrorMessage(true);
        console.log(err.response.data.data);
      });
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

    setSaleAdd(localStorage.getItem("saleAddress"));
    console.log(saleRef.current);
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
              <strong>Integrasi Qr Gelang</strong>
            </Typography>
            <Grid>
              <Paper elevation={12} style={paperStyle}>
                <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="outlined-saleaddress"
                    autoComplete="saleaddress"
                    label="Sale Address"
                    disabled
                    value={saleRef.current}
                    onChange={handleChange("saleAddress")}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="outlined-qrgelang"
                    label="Qr Gelang"
                    autoComplete="qrgelang"
                    value={values.qrGelang}
                    onChange={handleChange("qrGelang")}
                    autoFocus
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: "#3D734D" }}
                  >
                    Submit
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
            severity="success"
            sx={{ width: "100%" }}
          >
            Success integrasi qr gelang
          </Alert>
        </Snackbar>
      </ResponsiveAppBar>
      <Loading loading={isLoading} />
    </div>
  );
}
