import React, { useState } from "react";
import {
  Grid,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import TableCostum from "../../../components/table/table-costume-toolbar/TableCostum";
import FilterOnly from "../../../components/table/table-costume-toolbar/toolbar-version/FilterOnly";

export default function TableMaster({ rows, title, headCells, download }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box my="3vh">
      <Typography
        fontSize="24px"
        fontWeight={700}
        letterSpacing="-1px"
        color="#000000AB"
      >
        {title}
      </Typography>
      <Box pt="3vh">
        <TableCostum
          headCells={headCells}
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          costumeToolbar={<FilterOnly download={download} />}
        >
          {/* {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              return (
                <TableRow hover key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.date} </TableCell>
                  <TableCell>{row.children} </TableCell>
                  <TableCell>{row.adult}</TableCell>
                </TableRow>
              );
            })} */}
        </TableCostum>
      </Box>
    </Box>
  );
}
