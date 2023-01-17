import * as React from "react";
import { Button, Stack, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { GeneralContext } from "../../context/GeneralContext";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { Box } from "@mui/system";

export default function BarDateRangePicker({
  handleChange,
  handleClose,
  state,
}) {
  const { setFilterData, filterData, setFilterDashboard, filterDashboard } =
    React.useContext(GeneralContext);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack bgcolor="white" p="10px">
        <DateRangePicker
          onChange={handleChange}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
        />
        <Box display="flex" justifyContent="end">
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Filter
          </Button>
        </Box>
      </Stack>
    </LocalizationProvider>
  );
}
