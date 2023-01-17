import React, { useState, useContext } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ResponsiveAppBar from "../components/appbar/ResponsiveAppBar";

import { GeneralContext } from "../context/GeneralContext";
import axios from "axios";
import { baseApi } from "../utils/Api";
import Loading from "../components/loading";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { autoLogOffTime } from "../utils/AutoLogOffTime";
import sweetAlert from "sweetalert";

export default function ChangePassword() {
  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { filterData, setMerchantData } = useContext(GeneralContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const { reload, setReload } = React.useContext(GeneralContext);
  const [open, setOpen] = React.useState(false);
  const [isPasswordError, setIsPasswordError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const endPointMerchant = "/v1/merchant";

  const endPoint = "/v1/useradmin/login";
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    if (values.newPassword !== values.confirmPassword) {
      setOpen(true);
      return;
    }
    const decode = jwt_decode(localStorage.getItem("token"));
    console.log(decode.id);
    e.preventDefault();
    axios
      .post(baseApi + "/v1/useradmin/updatepasswordbyid", {
        id: decode.ID,
        password: values.newPassword,
      })
      .then((res) => {
        setSuccess(true);

        if (res.data.data === undefined) {
          throw new Error(`tidak bisa update password`);
        }

        setTimeout(() => {
          navigate("/");
        }, 6000);
        console.log(res.data.data);
      })
      .catch((err) => {
        setIsPasswordError(true);
        setErrorMessage(true);
        console.log(err.response.data.data);
        console.log(values.saleAddress);
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
              <strong>Change Password</strong>
            </Typography>
            <Grid>
              <Paper elevation={12} style={paperStyle}>
                <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="outlined-new-password"
                    label="new password*"
                    autoComplete="new password*"
                    value={values.newPassword}
                    onChange={handleChange("newPassword")}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="outlined-confirm-new-password"
                    label="confirm new password*"
                    autoComplete="new password"
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
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
          open={success}
          autoHideDuration={4000}
          onClose={() => setSuccess(false)}
        >
          <Alert
            onClose={() => setSuccess(false)}
            variant="filled"
            severity="success"
            sx={{ width: "100%" }}
          >
            Password Berhasil Di Ganti
          </Alert>
        </Snackbar>
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
            Password Tidak Sama
          </Alert>
        </Snackbar>
        <Snackbar
          sx={{ height: "5%" }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={isPasswordError}
          autoHideDuration={6000}
          onClose={() => setIsPasswordError(false)}
        >
          <Alert
            onClose={() => setIsPasswordError(false)}
            variant="filled"
            severity="error"
            sx={{ width: "100%" }}
          >
            password must be at least 8 characters consists of uppercase,
            lowercase, and a digit
          </Alert>
        </Snackbar>
      </ResponsiveAppBar>
      <Loading loading={isLoading} />
    </div>
  );
}
