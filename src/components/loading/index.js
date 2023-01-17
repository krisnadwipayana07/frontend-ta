import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function Loading({ loading }) {
  return (
    <Box
      display={`${loading ? "flex" : "none"}`}
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top="0"
      bottom="0"
      left="0"
      right="0"
      zIndex={99999}
      bgcolor="rgba(217, 217, 217, 0.53)"
    >
      <CircularProgress />
    </Box>
  );
}
