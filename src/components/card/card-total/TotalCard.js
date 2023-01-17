import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function TotalCard({ judul, total, persen }) {
  return (
    <Paper sx={{ p: "1vw", minWidth: "10vw", boxShadow: 3 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography fontWeight={600} letterSpacing="-0.5px">
            {judul}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            fontWeight={900}
            fontSize="18px"
            letterSpacing="-1px"
            color="#1976d2"
          >
            {total}
          </Typography>
        </Grid>
        {/* <Grid item>
          <Box display="flex" alignContent="center">
            <Box mx="1vw" fontSize="10px">
              {persen >= 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Box>
            <Typography>
              <span style={{ color: persen >= 0 ? "green" : "red" }}>
                {persen}%
              </span>{" "}
              dari hari kemarin
            </Typography>
          </Box>
        </Grid> */}
      </Grid>
    </Paper>
  );
}
