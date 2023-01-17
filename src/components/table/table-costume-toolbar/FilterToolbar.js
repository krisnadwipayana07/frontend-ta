import {
  Box,
  Button,
  Grid,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function EnhancedTableToolbar(props) {
  const { pathname } = window.location;
  const { numSelected, pdfDownload } = props;

  return (
    <Toolbar
      sx={{
        py: "2vw",
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Grid container spacing={3}>
        {props.children}
        <Grid item>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              px: "3vw",
              borderRadius: "10px",
              py: "1.5vh",
            }}
            onClick={() => props.download("xlsx")}
          >
            Download .xlsx
          </Button>
        </Grid>
        <Grid
          item
          hidden={
            pathname === "/laporan-rekap-pendapatan" ||
            pathname === "/laporan-rekap-kasir"
          }
        >
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              px: "3vw",
              borderRadius: "10px",
              py: "1.5vh",
            }}
            onClick={() => props.download("pdf")}
          >
            Download .pdf
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
