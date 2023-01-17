import { IconButton, Snackbar } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
export default function AlertSnackbar({ open, handleClose, message }) {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      message={message}
      action={action}
      sx={{ color: "green" }}
    />
  );
}
