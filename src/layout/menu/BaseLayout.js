import { Box, Text } from "@chakra-ui/react";
import { Paper } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

export default function BaseLayout() {
  return (
    <Box>
      <Paper sx={{ boxShadow: 5 }}>
        <Text pb="10" textAlign="center" fontWeight={900}>
          WR. SATE LEBIH - MENU
        </Text>
      </Paper>

      <Outlet />
    </Box>
  );
}
