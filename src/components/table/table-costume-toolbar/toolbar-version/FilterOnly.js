import React, { useContext } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterDialog from "../../../dialog/FilterDialog";
import DateDialog from "../../../dialog/DateDialog";
import FilterComponent from "./FilterComponent";
import { Flex } from "@chakra-ui/react";
import { GeneralContext } from "../../../../context/GeneralContext";

export default function FilterOnly(props) {
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const { filterData, setFilterData, merchantData } =
    useContext(GeneralContext);

  return (
    <>
      <Grid item>
        <FilterComponent />
      </Grid>
      <Grid item>
        <Autocomplete
          disablePortal
          options={merchantData}
          getOptionLabel={(option) => option.merchantName}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Merchant" />}
          onChange={(event, newValue) => {
            setFilterData({ ...filterData, merchantID: newValue.merchantID });
            console.log(newValue.merchantID);
          }}
        />
      </Grid>
      {/* <Grid item> */}
      {/* <Button
          className="xxx"
          variant="contained"
          sx={{
            textTransform: "none",
            px: "3vw",
            borderRadius: "10px",
            py: "1.5vh",
          }}
          onClick={props.download}
        >
          Download
        </Button> */}
      {/* </Grid> */}
    </>
  );
}
