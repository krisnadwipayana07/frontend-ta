import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { baseApi } from "../../../utils/Api";
import axios from "axios";
import { GeneralContext } from "../../../context/GeneralContext";
import jwt_decode from "jwt-decode";

export default function ProfileDropdown() {
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const endPoint = "/v1/useradmin/logout";

  const { reload, setReload } = React.useContext(GeneralContext);
  const handleLogout = () => {
    console.log("Bearer " + localStorage.getItem("token"));
    axios
      .post(
        baseApi + endPoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
    const decode = jwt_decode(localStorage.getItem("token"));

    console.log(decode);

    axios.post(baseApi + "/v1/band/logout", {
      id: `${decode.ID}`,
      islogin: 0,
    });
    localStorage.removeItem("isLogin");
    localStorage.removeItem("token");
    window.location.replace("/admin");
    setReload(reload + 1);
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        <MenuItem onClick={handleChangePassword}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Change Password
        </MenuItem>
        {/* <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
