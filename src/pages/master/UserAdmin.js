import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ResponsiveAppBar from "../../components/appbar/ResponsiveAppBar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserAdmin() {
  return (
    <div>
      <ResponsiveAppBar>
        <Typography
          fontSize="24px"
          fontWeight={700}
          letterSpacing="-1px"
          py="1em"
        >
          User Admin
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Krisna
                </TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>
                  <IconButton color="warning">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="warning">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              {/* {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </ResponsiveAppBar>
    </div>
  );
}
