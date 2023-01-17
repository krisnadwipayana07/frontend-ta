import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Stack } from "@mui/material";
import AlertSnackbar from "../snackbar/AlertSnackbar";
import React, { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FilterDialog({
  open,
  handleClose,
  handleDataTerbaru,
  handleDataTerlama,
  handleOpenTanggal,
}) {
  const [openAlert, setOpenAlert] = useState(false);

  const handleOpenAlert = () => {
    handleClose();
    setOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Stack spacing={2}>
              <Button
                sx={{ textTransform: "none" }}
                onClick={handleOpenTanggal}
              >
                Filter Sesuai Tanggal
              </Button>
              {/* <Button sx={{ textTransform: "none" }} onClick={handleOpenAlert}>
                Filter Sesuai Data Terbaru
              </Button>
              <Button sx={{ textTransform: "none" }} onClick={handleOpenAlert}>
                Filter Sesuai Data Terlama
              </Button> */}
            </Stack>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <AlertSnackbar
        open={openAlert}
        handleClose={handleCloseAlert}
        message={"Maaf fitur ini sedang dikembangkan"}
      />
    </div>
  );
}
