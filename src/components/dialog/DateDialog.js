import Box from "@mui/material/Box";
import { Button, Dialog, DialogContent, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Calendar, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { GeneralContext } from "../../context/GeneralContext";

export default function DateDialog({ open, handleClose }) {
  const [maxDate, setMaxDate] = useState(new Date());
  const [date, setDate] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [dateDefault, setDateDefault] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  // const [date, setDate] = useState([
  //   {
  //     startDate: null,
  //     endDate: null,
  //     key: "selection",
  //   },
  // ]);
  const { setFilterData, filterData } = useContext(GeneralContext);
  const handleSelect = (date) => {
    console.log(date); // native Date object
  };

  useEffect(() => {
    if (date[0].startDate !== null && date[0].endDate !== null) {
      // console.log(date[0].startDate, "----", date[0].endDate);
      let s = new Date(date[0].startDate).setHours(0, 0, 0, 0);
      let e = new Date(date[0].endDate).setHours(23, 59, 59, 59);
      setFilterData({
        ...filterData,
        dateStart: parseInt((new Date(s).getTime() / 1000).toFixed(0)),
        dateEnd: parseInt((new Date(e).getTime() / 1000).toFixed(0)),
      });
    } else {
      setFilterData({
        ...filterData,
        dateStart: date.startDate,
        dateEnd: date.endDate,
      });
    }
    console.log(filterData);
  }, [date]);
  return (
    <Dialog maxWidth="xl" open={open} keepMounted onClose={handleClose}>
      <DialogContent>
        {window.location.pathname === "/laporan-rekap-kasir" ? (
          <Calendar
            date={date[0].startDate}
            onChange={(e) =>
              setDate([
                {
                  startDate: e,
                  endDate: e,
                  key: "selection",
                },
              ])
            }
            maxDate={new Date()}
          />
        ) : (
          <DateRangePicker
            onChange={(item) => {
              setDate([item.selection]);
              // console.log("hia", [item.selection.startDate]);
              let future = new Date(item.selection.startDate);
              window.location.pathname === "/laporan-rekap-pendapatan"
                ? setMaxDate(new Date(future.setDate(future.getDate() + 30)))
                : setMaxDate(new Date(future.setDate(future.getDate() + 30)));
            }}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={date[0].startDate === null ? dateDefault : date}
            direction="horizontal"
            maxDate={
              maxDate.getDate() < new Date().getDate() &&
              maxDate.getMonth() < new Date().getMonth() &&
              maxDate.getFullYear() < new Date().getFullYear()
                ? new Date()
                : maxDate
            }
          />
        )}
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>OK</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
