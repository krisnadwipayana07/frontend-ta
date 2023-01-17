import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import BPD from "../../assets/logoBPD.png";
import LOGO from "../../assets/logo.png";
import ReCAPTCHA from "react-google-recaptcha";
import { baseApi } from "../../utils/Api";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Login() {
  let navigate = useNavigate();
  useEffect(() => {
    const isLogin = localStorage.getItem("token");
    if (isLogin !== null) {
      navigate("/");
    }
  }, []);
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [isLogin, setIsLogin] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleCaptha = (value) => {
    setDisabled(false);
    console.log("Captha value:", value);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(baseApi + endPoint, {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        axios
          .post(baseApi + "/v1/band/login", {
            username: values.username,
            password: values.password,
            islogin: 1,
          })
          .catch((err) => {
            console.log(err);
          });
        if (res.data.data.accessToken) {
          localStorage.setItem("token", res.data.data.accessToken);
          navigate("/");
        }
        var decode = jwt_decode(res.data.data.accessToken);
        console.log(decode);
      })
      .catch((err) => {
        setErrorMessage(true);
        console.log(err);
      });
  };

  const endPoint = "/v1/useradmin/login";

  const handleLoginOtherTerminal = (e) => {
    e.preventDefault();

    axios
      .post(baseApi + "/v1/band/useradmin", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        setErrorMessage(false);
        if (res.data.data.islogin === 1) {
          console.log(res.data.data.islogin);
          setIsLogin(true);
          throw new Error("Anda sudah login di terminal yang lain");
        }

        handleLogin(e);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(baseApi + "/v1/useradmin/blockuseradmin", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        if (res.data.data === 1) {
          console.log(res.data.data);
          throw new Error("Password Atau Username Anda Salah");
        }
        if (res.data.data === 3) {
          console.log(res.data.data);
          setIsBlock(true);
          throw new Error("Akun Anda Telah Di Block");
        }
        handleLoginOtherTerminal(e);
      })
      .catch((err) => {
        setErrorMessage(true);
        console.log(err);
      });
    setLoading(false);
  };

  const handleClickForgotPassword = () => {
    navigate("/forgot-password");
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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Paper elevation={12} style={paperStyle}>
          <Typography component="h1" variant="h4" align="center">
            <strong>Login</strong>
          </Typography>
          <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
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
            <FormControl
              fullWidth
              variant="outlined"
              required
              margin="normal"
              sx={{ mb: 3 }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="password"
              />
            </FormControl>
            <ReCAPTCHA
              sitekey="6Lch0SMhAAAAAP2ugB97XNgIRbHT1VWBDPHQLozU"
              // sitekey="6Lfw5zkgAAAAAAjfVjwC_7g9joWu8H3D7XoSkqn8"
              onChange={handleCaptha}
            />
            {errorMessage && (
              <Typography color={"red"}>
                Username atau Password salah
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disabled || loading}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
      <Snackbar
        sx={{ height: "5%" }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isLogin}
        autoHideDuration={6000}
        onClose={() => setIsLogin(false)}
      >
        <Alert
          onClose={() => setIsLogin(false)}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          Anda sudah login di terminal yang lain
        </Alert>
      </Snackbar>
      <Snackbar
        sx={{ height: "5%" }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isBlock}
        autoHideDuration={6000}
        onClose={() => setIsBlock(false)}
      >
        <Alert
          onClose={() => setIsBlock(false)}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          Akun Anda Telah Di Block
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Login;
