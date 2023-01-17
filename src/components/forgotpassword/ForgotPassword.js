import Box from "@mui/material/Box";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import BPD from "../../assets/logoBPD.png";
import LOGO from "../../assets/logo.png";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { baseApi } from "../../utils/Api";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function ForgotPassword(){
  const [isResetPassword,setIsResetPassword] = useState(false)
    const [values, setValues] = useState({
        username: "",
        email: "",
      });
      
      const [errorMessage, setErrorMessage] = useState(false);

      let navigate = useNavigate();

      const endPoint = "/v1/useradmin/forgotpassword";

      const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post(baseApi + endPoint, {
            username: values.username,
            email: values.email,
          })
          .then((res) => {
            setIsResetPassword(true)
            setErrorMessage(false);
            console.log(res)

            if (res.data.data == null) {
                throw new Error(` Username atau Email tidak terdaftar di database`);
            }

            localStorage.setItem("email",res.data.data.email)
            localStorage.setItem("username",res.data.data.username)

            setTimeout(() => {navigate("/admin")},20000)
           
          })
          .catch((err) => {
            setErrorMessage(true);
            console.log(err);
          });
           
      };

      const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value });
      };
    
    const paperStyle = {
        padding: "30px 30px",
        width: 300,
        margin: "30px auto",
        borderRadius: "10px",
      };
    
    
    const toolbarStyle = {
        display: "flex",
        justifyContent: "space-between",
      };

    return (
        <Box>
              <AppBar sx={{ backgroundColor: "white", position: "static" }}>
                <Toolbar style={toolbarStyle}>
                    <img src={LOGO} alt="LOGO" style={{ width: "10%" }} />
                    <img src={BPD} alt="BPD" style={{ width: "3%" }} />
                </Toolbar>
              </AppBar>
              <Container>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ mt: 4, color: "#3D734D" }}
                    align="center"
                    >
                    <strong></strong>
                </Typography>
                <Grid>
                    <Paper elevation={12} style={paperStyle}>
                        <Typography component="h1" variant="h5" align="center">
                            <strong>Forgot Password</strong>
                        </Typography>
                        <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit} >
                            <TextField
                             margin="normal"
                             required
                             fullWidth
                             id="outlined-username"
                             label="Username"
                             autoComplete="username"
                             value={values.username}
                             onChange={handleChange("username")}
                             autoFocus
                            />
                            <TextField
                             margin="normal"
                             required
                             fullWidth
                             id="outlined-email"
                             label="Email"
                             autoComplete="email"
                             value={values.email}
                             onChange={handleChange("email")}
                             autoFocus
                            />
                             {errorMessage && (
                                <Typography color={"red"}>
                                Username atau Email tidak terdaftar di database
                                </Typography>
                            )}
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
              <Snackbar  sx={{ height: "5%" }}  anchorOrigin={{vertical: "top",horizontal: "center"}} open={isResetPassword} autoHideDuration={15000} onClose={() => setIsResetPassword(false)} >
            <Alert onClose={() => setIsResetPassword(false)} variant="filled" severity="success" sx={{ width: '100%' }}>
             Berhasil merubah password , password baru telah di kirimkan ke email Anda
            </Alert>
          </Snackbar>
        </Box>
    )
}

export default ForgotPassword;