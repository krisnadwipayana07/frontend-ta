import { Button } from "@mui/material";
import React, { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterDialog from "../../../dialog/FilterDialog";
import DateDialog from "../../../dialog/DateDialog";

export default function FilterComponent() {
  const [open, setOpen] = useState(false);
  const [openTanggal, setOpenTanggal] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };

  const HandleTanggalOpen = () => {
    setOpen(false);
    setOpenTanggal(true);
  };
  const HandleTanggalClose = () => {
    setOpenTanggal(false);
  };
  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          textTransform: "none",
          px: "3vw",
          borderRadius: "10px",
          py: "1.5vh",
        }}
        onClick={onOpen}
      >
        <FilterAltIcon sx={{ color: "green", mr: "0.5vw" }} />
        Filter
      </Button>
      <FilterDialog
        open={open}
        handleClose={onClose}
        handleOpenTanggal={HandleTanggalOpen}
      />
      <DateDialog open={openTanggal} handleClose={HandleTanggalClose} />
    </div>
  );
}
