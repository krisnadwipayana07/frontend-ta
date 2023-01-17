import React, { useContext } from "react";
import { Box, Grid, InputBase, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterComponent from "./FilterComponent";
import { GeneralContext } from "../../../../context/GeneralContext";

export default function ObjectFilter() {
  const { handleChange } = useContext(GeneralContext);
  return (
    <>
      <Grid item>
        <Box
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "249px",
            border: "1px solid #CDCDCD",
            borderRadius: "10px",
          }}
        >
          <IconButton sx={{ p: "10px", ml: "1.5vw" }} aria-label="menu">
            <SearchIcon style={{ color: "green" }} />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Objek Wisata"
            name="merchantName"
            onChange={(e) => handleChange(e)}
          />
        </Box>
      </Grid>
      <Grid item>
        <FilterComponent />
      </Grid>
    </>
  );
}
