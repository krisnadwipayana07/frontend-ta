import { Button, Dialog } from "@mui/material";
import { addDays } from "date-fns";
import React, { useState } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import BarDateRangePicker from "../../datepicker/BarDateRangePicker";

function getDate(date = new Date()) {
  // console.log(date);
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
}

export default function ModalDatePicker() {
  const { filterDashboard, setFilterDashboard } =
    React.useContext(GeneralContext);

  const [open, setOpen] = useState(false);
  const [state, setState] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setFilterDashboard({
      dateStart: parseInt((state[0].startDate.getTime() / 1000).toFixed(0)),
      dateEnd: parseInt((state[0].endDate.getTime() / 1000).toFixed(0)),
    });
  };
  const handleChangeDate = (item) => {
    setState([item.selection]);
  };
  // console.log(filterDashboard);
  return (
    <div>
      <Button color="primary" variant="outlined" onClick={handleOpen}>
        {getDate(new Date(parseInt(filterDashboard.dateStart * 1000))) +
          " - " +
          getDate(new Date(parseInt(filterDashboard.dateEnd * 1000)))}
      </Button>
      <Dialog maxWidth="xl" open={open} onClose={handleClose}>
        <BarDateRangePicker
          handleClose={handleClose}
          handleChange={handleChangeDate}
          state={state}
        />
      </Dialog>
    </div>
  );
}
